<template>
    <ManagePage :theadDataArr="columns" :data="data" :total="total" :pageSize="pageSize" :pageNum="pageNum"
        :renderObj="renderObj" @submitAddHandle="submitAddHandle" @confirmDeleteHandle="confirmDeleteHandle"
        @editHandle="editHandle">
        <div slot="addModal">
            <a-form-model ref="addRoleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item ref="code" label="角色编码" prop="code">
                    <a-input v-model="form.code" />
                </a-form-model-item>
                <a-form-model-item ref="name" label="角色名称" prop="name">
                    <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item ref="roleDesc" label="角色描述" prop="roleDesc">
                    <a-input v-model="form.roleDesc" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
            </a-form-model>
        </div>
    </ManagePage>
</template>

<script>
import ManagePage from "@/components/manage/ManagePage.vue";
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: "角色描述",
        dataIndex: "roleDesc",
        key: "roleDesc"
    },
    {
        title: '创建时间',
        key: 'createdTime',
        dataIndex: 'createdTime',
    },
    {
        title: '更新时间',
        key: 'updatedTime',
        dataIndex: 'updatedTime',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

import { getRolePageList, getRoleDetail, deleteRole, addRole, editRole } from "@/api/auth/role";
export default {
    components: {
        ManagePage
    },
    data() {
        return {
            data: [],
            columns,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            renderObj: {
                isLoading: false
            },
            isLoading: false,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            other: '',
            form: {
                name: '',
                code: '',
                roleDesc: ""
            },
            rules: {
                code: [
                    { required: true, message: '请输入角色代码', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
            },
        };
    },
    // 组件生命周期
    async created() {
        this.getData();
    },
    methods: {
        async submitAddHandle(opType, id) {
            try {
                const validateRes = await this.$refs.addRoleForm.validate();
                // 校验成功
                if (validateRes) {
                    if (opType === "add" || opType === "edit") {
                        if (opType === "add") {
                            // 进行添加角色
                            await addRole(this.form);
                        } else {
                            // 进行编辑角色
                            await editRole(this.form, id);
                        }
                        // 重新获取数据
                        await this.getData();
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
        async getData() {
            this.renderObj.isLoading = true;
            const rolePageResult = await getRolePageList(this.pageSize, this.pageNum);
            if (rolePageResult) {
                const { total, records } = rolePageResult;
                this.total = total;
                this.data = records;
                this.renderObj.isLoading = false;
            }
        },
        // 确认删除的回调函数
        async confirmDeleteHandle(id) {
            // 执行删除角色
            await deleteRole(id);
            // 重新获取数据
            await this.getData();
            this.$message.success("删除角色信息成功!!");
        },
        editHandle(id) {
            this.roleFormBackFill(id);
        },
        // 角色表单信息回填
        async roleFormBackFill(id) {
            const roleDetailInfo = await getRoleDetail(id);
            const {
                code,
                name,
                roleDesc
            } = roleDetailInfo;

            const newForm = { code, name, roleDesc };

            this.form = newForm;
        }
    },

}
</script>

<style lang="less" scoped>
.search-container,
.content-container {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
}

.list-container {
    margin-top: 10px
}

.page-container {
    display: flex;
    justify-content: flex-end;
}

// 操作按钮容器
.operate-btn-container {
    .ant-btn {
        margin-right: 10px;
    }
}
</style>