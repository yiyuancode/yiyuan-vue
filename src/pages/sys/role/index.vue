<template>
    <ManagePage :theadData="columns" :data="data" :pageInfo="pageInfo" :renderObj="renderObj" :formRules="rules"
        :formModel="form" @onSave="saveHandle" @onSubmit="submitHandle" @onDelete="deleteHandle">

        <!-- 其他的操作插槽 -->
        <template #otherOperationsContainer="scope">
            <a-button type="primary" @click="assignPermission(scope.data.id)">分配权限</a-button>

        </template>

        <!-- 默认模态框插槽 -->
        <div slot="submitModal">
            <a-form-model-item ref="code" has-feedback label="角色编码" prop="code">
                <a-input v-model="form.code" />
            </a-form-model-item>
            <a-form-model-item ref="name" has-feedback label="角色名称" prop="name">
                <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="roleDesc" has-feedback label="角色描述" prop="roleDesc">
                <a-input v-model="form.roleDesc" type="textarea" :auto-size="{ minRows: 3, maxRows: 5 }" />
            </a-form-model-item>
        </div>

        <!-- 分配角色权限模态框 -->
        <Modal modalTitle="分配角色权限" :modalVisible="assignPermissionVisible" :submitLoading="submitAssignPermissionLoading"
            @onCloseModal="assignPermissionVisible = false" @onReset="resetAssignPermissionHandle"
            @onSubmit="assignPermissionHandle">
            <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
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

// import { getMenuTree } from "@/api/auth/admin"
import { mapState } from "vuex";
import manage from "@/mixins/manage";
import { columns, form, moduleConfig, formRules } from "./pageConfig";
const { assignMenu } = moduleConfig.module;
export default {
    components: {
        ManagePage,
        Modal
    },
    mixins: [manage({form})],

    data() {
        return {
            columns,
            form,
            rules: formRules,
            ...moduleConfig,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
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
            submitAssignPermissionLoading: false, //提交分配权限按钮是否加载
            treeKeyData: [],
        };
    },
    computed:{
        ...mapState('account',['menuTreeList'])
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
        // 租户表单信息回填
        async formBackFill(id) {
            const roleDetailInfo = await this.getDetail(id);
            const {
                code,
                name,
                roleDesc
            } = roleDetailInfo;

            const newForm = { code, name, roleDesc };

            this.form = newForm;
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
        // 选中菜单列表
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
            this.$message.success("重置成功!!");
        },
        // 分配权限
        async assignPermissionHandle() {
            this.submitAssignPermissionLoading = true;
            if (!this.checkedKeys.length) {
                this.$message.error("请至少选择一个菜单");
                return;
            }
            // 进行分配角色
            await assignMenu(this.roleId, this.checkedKeys);
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