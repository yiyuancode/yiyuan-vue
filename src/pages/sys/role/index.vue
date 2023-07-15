<template>
    <ManagePage :theadDataArr="columns" :data="data" :total="total" :pageSize="pageSize" :pageNum="pageNum"
        :renderObj="renderObj" @submitAddHandle="submitAddHandle" @confirmDeleteHandle="confirmDeleteHandle"
        @addHandle="addHandle" @editHandle="editHandle" @resetHandle="resetHandle">


        <div slot="otherOpContainer" slot-scope="slotProps">
            <a-button type="primary" @click="assignPermission(slotProps.data.id)">分配权限</a-button>
        </div>

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

        <Modal modalTitle="分配角色权限" :modalVisible="assignPermissionVisible"
            @closeModalHandle="assignPermissionVisible = false" @resetHandle="resetAssignPermissionHandle"
            @submitHandle="assignPermissionHandle">
            <a-form-model ref="assignPermissionForm" :model="assignPermissionForm" :rules="assignPermissionRules"
                :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item ref="code" label="角色权限" prop="code">
                    <div class="role-permission-container">
                        <div class="">
                            <a-checkbox v-model="isCollapseCheckbox" @change="toggleMenuList">
                                展开/收起
                            </a-checkbox>

                            <a-checkbox v-model="isSelectAllCheckbox" @change="toggleSelectMenuList">
                                全选/全不选
                            </a-checkbox>
                        </div>
                        <a-divider style="margin: 12px 0;" />
                        <a-tree v-model="checkedKeys" checkable :expanded-keys="expandedKeys"
                            :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :tree-data="treeData"
                            :defaultExpandAll="true" :defaultCheckedKeys="selectedKeys" @expand="onExpand"
                            @select="onSelect" />
                    </div>
                </a-form-model-item>
            </a-form-model>
        </Modal>
    </ManagePage>
</template>

<script>
import Modal from "@/components/modal/Modal";
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

import { getMenuTree } from "@/api/auth/admin"
import { getRolePageList, getRoleDetail, deleteRole, addRole, editRole, assignMenu } from "@/api/auth/role";
export default {

    components: {
        ManagePage,
        Modal
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
            assignPermissionForm: {

            },
            assignPermissionRules: {},
            rules: {
                code: [
                    { required: true, message: '请输入角色代码', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ],
            },
            assignPermissionVisible: false,
            checkedKeys: [], //自定选中的树节点
            expandedKeys: [], //展开指定的树节点
            autoExpandParent: true, //是否自定展开父节点
            selectedKeys: [], //设置选中的树节点
            treeData: [],
            isDefaultExpandAll: false,
            defaultExpandedKeys: [],
            isCollapseCheckbox: false,
            isSelectAllCheckbox: false,
            roleId: null, //分配角色点击的id
        };
    },
    computed: {
        treeKeyData: function () {
            return this.treeData.reduce((keys, node) => {
                keys.push(node.key);
                if (node.children) {
                    keys.push(...node.children.map(child => child.key));
                }
                return keys;
            }, []);
        }
    },
    // 组件生命周期
    async created() {
        this.getData();
    },

    methods: {
        // 进行提交
        async submitAddHandle(opType, id, callback) {
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
            callback();
        },
        // 获取数据
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
        // 添加回调
        addHandle(callback) {
            this.form = {
                name: '',
                code: '',
                roleDesc: ''
            };
            this.$nextTick(() => {
                callback(this.form, this.$refs.addRoleForm);
            });
        },
        // 编辑回调
        editHandle(id, callback) {
            this.roleFormBackFill(id);
            this.$nextTick(() => {
                callback(this.$refs.addRoleForm);
            });
        },
        // 重置回调
        resetHandle(callback) {
            callback(this.$refs.addRoleForm);
        },
        // 分配权限点击
        async assignPermission(id) {
            this.assignPermissionVisible = true;
            this.roleId = id;
            const menuList = await getMenuTree();
            const treeData = this.getTreeData(menuList);
            this.treeData = treeData;
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
        },
        getTreeData(menuList) {
            const treeData = [];
            for (let i = 0; i < menuList.length; i++) {
                const { name, children, id } = menuList[i];

                const treeDataObj = {
                    title: name,
                    key: id,
                }
                if (children && children.length) {
                    const newChildren = this.getTreeData(children);
                    treeDataObj.children = newChildren;
                }

                treeData.push(treeDataObj);
            }
            return treeData;
        },
        getAllNodeKeys() {

        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
        // 展开菜单列表
        toggleMenuList() {
            // 展开
            if (this.isCollapseCheckbox) {
                this.expandedKeys = this.treeKeyData;
            } else {
                this.expandedKeys = [];
            }
        },
        // 展开选中菜单列表
        toggleSelectMenuList() {
            if (this.isSelectAllCheckbox) {
                this.checkedKeys = this.treeKeyData;
            } else {
                this.checkedKeys = [];
            }
        },
        // 重置分配角色的处理
        resetAssignPermissionHandle() {
            this.checkedKeys = [];
            this.expandedKeys = [];
            this.isCollapseCheckbox = false;
            this.isSelectAllCheckbox = false;
        },
        // 分配权限
        async assignPermissionHandle() {
            if (!this.checkedKeys.length) {
                this.$message.error("请至少选择一个菜单");
                return;
            }
            // 进行分配角色
            await assignMenu(this.roleId, this.checkedKeys);
            this.$message.success("分配角色权限成功!!");
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

.role-permission-container {
    padding: 10px 20px;
    border: 1px solid #e5e7eb;
}
</style>