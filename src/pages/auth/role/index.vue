<template>
    <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj"  @onSave="saveHandle" @onSubmit="submitHandle"
        @onDelete="deleteHandle" @onSearch="searchHandle" @onReset="resetHandle">

        <!-- 其他的操作插槽 -->
        <template #otherOperationsContainer="scope">
            <a-button type="primary" @click="assignPermission(scope.data.id)">分配权限</a-button>

        </template>

        <!-- 分配角色权限模态框 -->
        <Modal modalTitle="分配角色权限" :modalVisible="assignPermissionVisible" :submitLoading="submitAssignPermissionLoading"
            @onCloseModal="assignPermissionVisible = false" @onReset="resetAssignPermissionHandle"
            @onSubmit="assignPermissionHandle">
            <a-form-model :model="assignPermissionModel" :roles="assignPermissionRules" :label-col="labelCol"
                :wrapper-col="wrapperCol">
                <a-form-model-item label="角色权限">
                    <div class="role-permission-container">
                        <div>
                            <a-checkbox v-model="isCollapseCheckbox" @change="toggleMenuList">
                                展开/收起
                            </a-checkbox>

                            <a-checkbox v-model="isSelectAllCheckbox" @change="toggleSelectMenuList">
                                全选/全不选
                            </a-checkbox>
                        </div>
                        <a-divider style="margin: 12px 0;" />
                        <a-tree v-model="assignPermissionModel.rolePermissions" checkable :expanded-keys="expandedKeys"
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

import { mapGetters } from "vuex";
import manage from "@/mixins/manage";
import { columns, moduleConfig } from "./pageConfig";
const { assignMenu } = moduleConfig.module;
export default {
    components: {
        ManagePage,
        Modal
    },
    mixins: [manage()],

    data() {
        return {
            columns,
            ...moduleConfig,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            assignPermissionVisible: false,
            // checkedKeys: [], //自定选中的树节点
            expandedKeys: [], //展开指定的树节点
            autoExpandParent: true, //是否自定展开父节点
            selectedKeys: [], //设置选中的树节点
            treeData: [],
            isDefaultExpandAll: false,
            defaultExpandedKeys: [],
            isCollapseCheckbox: false,
            isSelectAllCheckbox: false,
            roleId: null, //分配角色点击的id
            submitAssignPermissionLoading: false, //提交分配权限按钮是否加载
            treeKeyData: [],
            assignPermissionModel: {
                rolePermissions: [],
            },
            assignPermissionRules: {
                rolePermissions: [
                    { required: true, message: '请至少选择一个菜单权限', trigger: 'change', }
                ],
            }
        };
    },
    computed: {
        ...mapGetters('account', ['menuTreeList'])
    },

    methods: {
        // 分配权限点击
        async assignPermission(id) {
            this.assignPermissionVisible = true;
            this.roleId = id;
            const menuList = this.menuTreeList;
            const { treeData, treeKeyData } = this.getTreeData(menuList);
            this.treeData = treeData;
            this.treeKeyData = treeKeyData;
        },
        // 根据获取的菜单拿到所有的数级数据
        getTreeData(menuList, treeKeyData = []) {
            const treeData = [];
            for (let i = 0; i < menuList.length; i++) {
                const { name, children, id } = menuList[i];

                const treeDataObj = {
                    title: name,
                    key: id,
                }
                treeKeyData.push(id);
                if (children && children.length) {
                    const newChildren = this.getTreeData(children, treeKeyData);
                    treeDataObj.children = newChildren.treeData;
                }

                treeData.push(treeDataObj);
            }
            return { treeData, treeKeyData };
        },
        // 展开事件
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        // 选择事件
        onSelect(selectedKeys) {
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
        // 选中菜单列表
        toggleSelectMenuList() {
            if (this.isSelectAllCheckbox) {
                this.assignPermissionModel.rolePermissions = this.treeKeyData;
            } else {
                this.assignPermissionModel.rolePermissions = [];
            }
        },
        // 重置分配角色的处理
        resetAssignPermissionHandle() {
            this.assignPermissionModel.rolePermissions = [];
            this.expandedKeys = [];
            this.isCollapseCheckbox = false;
            this.isSelectAllCheckbox = false;
            this.$message.success("重置成功!!");
        },
        // 分配权限
        async assignPermissionHandle() {
            this.submitAssignPermissionLoading = true;
            if (!this.assignPermissionModel.rolePermissions.length) {
                this.$message.error("请至少选择一个菜单");
                return;
            }
            // 进行分配角色
            await assignMenu(this.roleId, this.assignPermissionModel.rolePermissions);
            this.$message.success("分配角色权限成功!!");
            this.submitAssignPermissionLoading = false;
        }
    },
}
</script>

<style lang="less" scoped>
.role-permission-container {
    padding: 10px 20px;
    border: 1px solid #e5e7eb;
}
</style>