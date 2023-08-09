<template>
    <ManagePage :submitModalObj="submitModalObj" :columns="columns" :data="data" :pagination="pagination"
        :renderObj="renderObj" :rules="rules" :model="model" :submitFormList="submitFormList" @onSave="saveHandle"
        @onSubmit="submitHandle" @onDelete="deleteHandle" @onSearch="searchHandle" @onReset="resetHandle">


        <!-- 其他的操作插槽 -->
        <template #otherOperationsContainer>
            <!-- #otherOperationsContainer="scope" -->
            <a-button type="primary" >监控</a-button>
        </template>
    </ManagePage>
</template>

<script>
import ManagePage from "@/components/manage/ManagePage.vue";
import manage from "@/mixins/manage";
import { columns, moduleConfig } from "./pageConfig";

export default {
    components: {
        ManagePage,
    },
    mixins: [manage()],
    data() {
        return {
            columns,
            ...moduleConfig,
            submitModalObj: {
                labelCol: { span: 8 },
                wrapperCol: { span: 16 },
            }
        }
    },
    methods: {
        async getFormModel(id) {
            const hostDetailInfo = await this.getDetail(id);
            const {
                hostName,
                host,
                sshPort,
                sshUsername,
                sshPassword,
                isMonitorEnabled
            } = hostDetailInfo;

            const newForm = {
                hostName,
                host,
                sshPort,
                sshUsername,
                sshPassword,
                isMonitorEnabled: isMonitorEnabled.value
            };
            return newForm;
        },
    }
}
</script>

<style lang="scss" scoped></style>