<template>
    <ManagePage :theadData="columns" :data="data" :total="total" :pageSize="pageSize" :pageNum="pageNum"
        :renderObj="renderObj" @submitHandle="submitHandle"  @addHandle="addHandle" @editHandle="editHandle"
        @confirmDeleteHandle="confirmDeleteHandle" @batchDeleteHandle="batchDeleteHandle" @resetHandle="resetHandle">

        <span slot="table-userRoles" slot-scope="{text,record}">
            <a-tag v-if="record.userRoles">{{ text }}</a-tag>
        </span>


        <!-- 其他的操作插槽 -->
        <template #otherOperationsContainer="scope">
            <a-button type="primary" @click="assignRole(scope.data.id)">分配角色</a-button>

        </template>

        <!-- <template #tableTdColumnsContainer> -->
        <!-- <span slot="userRoles" slot-scope="userRoles">
            {{ userRoles }}
        </span> -->
        <!-- </template> -->

        <!-- 默认模态框插槽 -->
        <template #submitModal="scope">
            <a-form-model ref="adminForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item ref="username" has-feedback label="用户名" prop="username">
                    <a-input v-model="form.username" />
                </a-form-model-item>
                <a-form-model-item v-if="scope.opType === 'add'" ref="password" has-feedback label="密码" prop="password">
                    <a-input v-model="form.password" type="password" />
                </a-form-model-item>
                <a-form-model-item v-if="scope.opType === 'add'" ref="rePassword" has-feedback label="确认密码"
                    prop="rePassword">
                    <a-input v-model="form.rePassword" type="password" />
                </a-form-model-item>
            </a-form-model>
        </template>

        <!-- 分配角色模态框 -->
        <Modal modalTitle="分配角色" :modalVisible="assignRoleVisible" :submitLoading="assignRoleLoading"
            @closeModalHandle="assignRoleVisible = false" @resetHandle="resetAssignRoleHandle"
            @submitHandle="assignRoleHandle">
            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="用户所属角色">
                    <a-select mode="tags" style="width: 100%" placeholder="请至少选择一个角色" @change="selectRoleChange">
                        <a-select-option v-for="role in roleList" :key="role.id">
                            {{ role.name }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>
        </Modal>
    </ManagePage>
</template>

<script>
import Modal from "@/components/modal/Modal";
import ManagePage from "@/components/manage/ManagePage.vue";
import { getAdminPageList, getAdminDetail, addAdmin, editAdmin, deleteAdmin, assignRole } from "@/api/auth/admin";
import { getRoleList } from "@/api/auth/role";

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: "角色",
        dataIndex: "userRoles",
        keys: "userRoles",
        scopedSlots: { customRender: 'userRoles' },
    },
    {
        title: '所属平台',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime"
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
    },
];

// 默认表单数据
const defaultForm = {
    username: '',
    password: '',
    rePassword: ""
}
export default {
    components: {
        ManagePage,
        Modal
    },
    data() {
        // 校验密码
        const validatePassWord = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error("两次密码输入不一致"));
            } else {
                callback();
            }
        };

        return {
            data: [],
            columns,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            renderObj: {
                isLoading: false
            },
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            other: '',
            form: defaultForm,
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                rePassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePassWord, trigger: 'blur' }
                ]
            },
            assignRoleVisible: false,
            assignRoleLoading: false,
            roleList: [],
            selectRoleList: [],// 选择的角色列表
            currentUserId: null
        };
    },
    // 组件生命周期
    async created() {
        this.getData();
    },

    methods: {
        // 进行提交
        async submitHandle(opType, id, callback) {
            let operationFlag = false;
            try {
                const validateRes = await this.$refs.adminForm.validate();
                // 校验成功
                if (validateRes) {
                    if (opType === "add" || opType === "edit") {
                        if (opType === "add") {
                            // 进行添加用户
                            await addAdmin(this.form);
                        } else {
                            // 进行编辑用户
                            await editAdmin(this.form, id);
                        }
                        // 重新获取数据
                        await this.getData();
                        operationFlag = true;

                    }
                }
            } catch (e) {
                console.log(e);
                operationFlag = false;
            }
            callback(operationFlag, this.$refs.adminForm);
        },
        // 获取数据
        async getData() {
            this.renderObj.isLoading = true;
            try {
                const adminPageResult = await getAdminPageList(this.pageSize, this.pageNum);
                if (adminPageResult) {
                    const { total, records } = adminPageResult;
                    for (let i = 0; i < records.length; i++) {
                        const {
                            roleList
                        } = records[i];

                        let userRoles = "";
                        if (roleList) {
                            userRoles = roleList.map(role => {
                                return role.name
                            }).join(",");
                        }

                        records[i].userRoles = userRoles;
                    }
                    this.total = total;
                    this.data = records;
                }
            } catch (e) {
                Promise.reject(e);
            }
            this.renderObj.isLoading = false;
        },
        // 确认删除的回调函数
        async confirmDeleteHandle(id) {
            // 执行删除用户
            await deleteAdmin(id);
            // 重新获取数据
            await this.getData();
            this.$message.success("删除用户信息成功!!");
        },
        // 添加回调
        addHandle(callback) {
            this.form = defaultForm;
            this.$nextTick(() => {
                callback(this.form, this.$refs.adminForm);
            });
        },
        // 编辑回调
        editHandle(id, callback) {
            this.adminFormBackFill(id);
            this.$nextTick(() => {
                callback(this.$refs.adminForm);
            });
        },
        // 重置回调
        resetHandle(callback) {
            callback(this.$refs.adminForm);
        },
        // 进行批量删除
        async batchDeleteHandle(ids, callback) {
            await deleteAdmin(ids);
            await this.getData();
            this.$message.success("批量删除成功");
            callback();
        },
        // 用户表单信息回填
        async adminFormBackFill(id) {
            const adminDetailInfo = await getAdminDetail(id);
            const {
                username,
            } = adminDetailInfo;

            const newForm = { username };

            this.form = newForm;
        },
        // 选择角色
        selectRoleChange(value) {
            this.selectRoleList = value;
        },
        // 分配角色
        async assignRole(id) {
            this.assignRoleVisible = true;
            this.currentUserId = id; //当前点击分配角色的用户id
            // 获取角色列表
            const roleList = await getRoleList();
            this.roleList = roleList;
        },
        // 重置分配角色
        resetAssignRoleHandle() {

        },
        // 分配角色
        async assignRoleHandle() {
            if (!this.selectRoleList.length) {
                this.$message.error("请至少选择一项角色");
                return;
            }
            // 进行分配角色
            await assignRole(this.currentUserId, this.selectRoleList);
            this.$message.success("分配角色成功!!");
            await this.getData();
        }
    },
}
</script>

<style lang="less" scoped></style>