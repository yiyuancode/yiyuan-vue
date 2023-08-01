<template>
    <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj" :rules="rules"
        :model="model" :submitFormList="submitFormList" @onSave="saveHandle" @onSubmit="submitHandle"
        @onDelete="deleteHandle" @onSearch="searchHandle" @onReset="resetHandle">

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
        <!-- <template #submitModal="scope">
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
      </template> -->

        <!-- 分配角色模态框 -->
        <Modal modalTitle="分配角色" :modalVisible="assignRoleVisible" :submitLoading="assignRoleLoading"
            @onCloseModal="assignRoleVisible = false" @onSubmit="assignRoleHandle">
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
import { getRoleList } from "@/api/auth/role";
import manage from "@/mixins/manage";
const { assignRole } = moduleConfig.module;
import { columns, moduleConfig, getSubmitFormList } from "./pageConfig";


export default {
    components: {
        ManagePage,
        Modal
    },
    mixins: [manage({ getSubmitFormList })],
    data() {
        return {
            columns,
            ...moduleConfig,
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            assignRoleVisible: false,
            assignRoleLoading: false,
            roleList: [],
            selectRoleList: [],// 选择的角色列表
            currentUserId: null,
        };
    },
    methods: {
        // 对返回的一个记录数据进行处理
        handleRecords(records) {
            for (let i = 0; i < records.length; i++) {
                const {
                    roleList,
                    platform
                } = records[i];

                let userRoles = "";
                if (roleList) {
                    userRoles = roleList.map(role => {
                        return role.name
                    }).join(",");
                }

                records[i].platform = platform.desc;
                records[i].userRoles = userRoles;
            }
        },

        // 用户表单信息回填
        async formBackFill(id) {
            const adminDetailInfo = await this.getDetail(id);
            const {
                username,
            } = adminDetailInfo;

            const newForm = { username };

            this.model = newForm;
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

<style lang="less" scoped>
/deep/ .ant-tag {
    white-space: normal;
}
</style>