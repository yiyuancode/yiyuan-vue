<template>
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onSave="saveHandle"
    @onSubmit="submitHandle"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
  >
    <span slot="table-userRoles" slot-scope="{ text, record }">
      <a-tag v-if="record.userRoles">{{ text }}</a-tag>
    </span>

    <!-- 其他的操作插槽 -->
    <template #otherOperationsContainer="scope">
      <a-button type="primary" @click="assignRole(scope.data.id)"
        >分配角色</a-button
      >
    </template>

    <!-- 分配角色模态框 -->
    <Modal
      modalTitle="分配角色"
      :modalVisible="assignRoleVisible"
      :submitLoading="assignRoleLoading"
      @onCloseModal="assignRoleVisible = false"
      @onSubmit="assignRoleHandle"
      @onReset="resetAssignRoleHandle"
    >
      <a-form-model
        ref="assignRoleModelRef"
        :model="assignRoleModel"
        :rules="assignRoleRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户所属角色" prop="userRoles">
          <a-select
            v-model="assignRoleModel.userRoles"
            mode="tags"
            style="width: 100%"
            placeholder="请至少选择一个角色"
          >
            <a-select-option
              v-for="role in roleList"
              :key="role.id"
              :value="role.id"
            >
              {{ role.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </Modal>
  </ManagePage>
</template>

<script>
import Modal from '@/components/modal/Modal';
import ManagePage from '@/components/manage/ManagePage.vue';
import { getRoleList } from '@/api/auth/role';
import manage from '@/mixins/manage';
const { assignRole } = moduleConfig.module;
import { columns, moduleConfig } from './pageConfig';

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
      assignRoleVisible: false,
      assignRoleLoading: false,
      roleList: [],
      currentUserId: null,
      assignRoleModel: {
        userRoles: []
      },
      assignRoleRules: {
        userRoles: [
          { required: true, message: '请至少选择一个角色', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    // 对返回的一个记录数据进行处理
    handleRecord(record) {
      const { roleList } = record;

      const userRoles = roleList
        .map((role) => {
          return role.name;
        })
        .join(',');

      record.userRoles = userRoles;
    },

    // 分配角色
    async assignRole(id) {
      this.assignRoleVisible = true;
      this.resetAssignRoleHandle();
      this.currentUserId = id; //当前点击分配角色的用户id
      // 获取角色列表
      const roleList = await getRoleList();
      this.roleList = roleList;
    },
    // 分配角色
    async assignRoleHandle() {
      this.assignRoleLoading = true;
      try {
        await this.$refs.assignRoleModelRef.validate();
        await assignRole(this.currentUserId, this.assignRoleModel.userRoles);
        this.$message.success('分配角色成功!!');
        await this.getData();
      } catch (e) {
        Promise.reject(e);
      }
      this.assignRoleLoading = false;
    },
    // 重置
    resetAssignRoleHandle() {
      this.$refs.assignRoleModelRef &&
        this.$refs.assignRoleModelRef.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .ant-tag {
  white-space: normal;
}
</style>
