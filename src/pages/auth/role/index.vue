<template>
  <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj" @onSave="saveHandle"
    @onSubmit="submitHandle" @onDelete="deleteHandle" @onSearch="searchHandle" @onReset="resetHandle"
    @onOtherEventChange="otherEventChangeHandle">

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
            <a-divider style="margin: 12px 0" />
            <a-tree v-model="assignPermissionModel.rolePermissions" checkable :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent" :selected-keys="selectedKeys" :tree-data="treeData"
              :defaultExpandAll="true" :defaultCheckedKeys="selectedKeys" @expand="onExpand" @select="onSelect" />
          </div>
        </a-form-model-item>
      </a-form-model>
    </Modal>
  </ManagePage>
</template>

<script>
import Modal from '@/components/modal/Modal';
import ManagePage from '@/components/manage/ManagePage.vue';
import _ from 'lodash';
import { mapGetters, mapState } from 'vuex';
import manage from '@/mixins/manage';
import { columns, moduleConfig, permissionObj, renderObj } from './pageConfig';
const { assignMenu } = moduleConfig.module;
export default {
  components: {
    ManagePage,
    Modal
  },
  mixins: [manage({ permissionObj, renderObj })],
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
        rolePermissions: []
      },
      assignPermissionRules: {
        rolePermissions: [
          {
            required: true,
            message: '请至少选择一个菜单权限',
            trigger: 'change'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters('account', ['menuTreeList']),
    ...mapState('account', ['permissionIds'])
  },

  methods: {
    // 分配权限点击
    async assignPermission(record) {
      const id = record.id;
      const roleInfo = await this.getDetail(id);
      roleInfo.sysMenuList.sort((m1, m2) => {
        return m2.type.value - m1.type.value;
      });
      const permissionIdList = roleInfo.sysMenuList
        .filter((menu) => menu)
        .map((menu) => {
          return menu.id;
        });

      const rolePermissionIds = this.filterRenderIds(permissionIdList);

      this.assignPermissionModel.rolePermissions = rolePermissionIds;
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
          key: id
        };
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
      this.$message.success('重置成功!!');
    },
    // 分配权限
    async assignPermissionHandle() {
      this.submitAssignPermissionLoading = true;
      if (!this.assignPermissionModel.rolePermissions.length) {
        this.$message.error('请至少选择一个菜单');
        return;
      }
      // 进行分配角色
      // 处理角色权限
      const rolePermissions = this.getRolePermissionList();
      await assignMenu(this.roleId, rolePermissions);
      this.$message.success('分配角色权限成功!!');
      this.submitAssignPermissionLoading = false;
    },
    // 处理角色权限
    getRolePermissionList() {
      const menuTreeList = this.menuTreeList;
      const rolePermissions = this.assignPermissionModel.rolePermissions;
      let newRolePermissionList = [...rolePermissions];

      for (let i = 0; i < rolePermissions.length; i++) {
        const id = rolePermissions[i];

        const parentIdArr = this.getAllParentIds(menuTreeList, id);
        newRolePermissionList.push(...parentIdArr);
      }

      // 调用函数获取 id 为 6 的节点的所有父节点的 ID

      newRolePermissionList = [...new Set(newRolePermissionList)];
      return newRolePermissionList;
    },
    // 获取所有的父id
    getAllParentIds(tree, id) {
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];

        // 如果找到匹配的节点
        if (node.id === id && node.id) {
          const parentIds = [];

          // 递归获取所有父节点的 ID
          const getParentIds = (currentNode) => {
            if (currentNode.parentId !== null) {
              parentIds.unshift(currentNode.parentId);
              const parent = tree.find(
                (item) => item.id === currentNode.parentId
              );
              if (parent) {
                getParentIds(parent);
              }
            }
          };

          getParentIds(node);
          return parentIds;
        }

        // 如果当前节点有子节点，则递归搜索子节点
        if (node.children && node.children.length > 0) {
          const found = this.getAllParentIds(node.children, id);

          // 如果在子节点中找到了目标 ID，则将当前节点的 ID 添加到结果中并返回
          if (found.length > 0) {
            return [node.id, ...found];
          }
        }
      }

      // 如果在树中未找到匹配的节点，则返回空数组
      return [];
    },
    // 筛选渲染的ids
    filterRenderIds(ids) {
      // 这里需要去循环数组
      const menuTreeList = _.cloneDeep(this.menuTreeList);
      const newIds = [];
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];
        // 判断这个id是否需要被移除
        const menuTreeItem = this.getMenuTreeItemById(menuTreeList, id);
        if (
          !menuTreeItem.children ||
          (menuTreeItem.children && menuTreeItem.children.length === 0)
        ) {
          newIds.push(id);
          // 不会被移除
          continue;
        } else {
          // 检测后辈们是否都被选中
          const isSelected = this.checkedChildrenIsSelected(menuTreeItem, ids);
          if (isSelected) {
            newIds.push(id);
          } else {
            const parentId = menuTreeItem.parentId;
            if (parentId !== 0) {
              const index = ids.findIndex((id) => parentId === id);
              if (index > -1) {
                ids.splice(index, 1);
                i--;
              }
            }
          }
        }
      }
      return newIds;
    },
    // 获取菜单树项通过id
    getMenuTreeItemById(menuTreeList, id) {
      // console.log(`menuTreeList`,menuTreeList);
      for (let i = 0; i < menuTreeList.length; i++) {
        const menuTreeItem = menuTreeList[i];
        // 如果找到了直接返回
        if (menuTreeItem.id === id) {
          return menuTreeItem;
        }
        // 如果没有找到继续找孩子节点
        else {
          const { children } = menuTreeItem;

          // console.log(i,children,menuTreeItem.name);
          if (children && children.length) {
            const childMenuTreeItem = this.getMenuTreeItemById(children, id);
            if (childMenuTreeItem) return childMenuTreeItem;
          }
        }
      }
    },
    // 检测后辈们是否都被选中
    checkedChildrenIsSelected(menuTreeItem, ids) {
      if (menuTreeItem.children && menuTreeItem.children.length > 0) {
        for (let i = 0; i < menuTreeItem.children.length; i++) {
          // 只要有一个不包含就是不包含
          if (!ids.includes(menuTreeItem.children[i].id)) {
            return false;
          } else {
            // return this.checkedChildrenIsSelected(menuTreeItem.children[i]);
          }
        }
      }
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
.role-permission-container {
  padding: 10px 20px;
  border: 1px solid #e5e7eb;
}
</style>
