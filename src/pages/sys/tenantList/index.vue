<template>
    <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj" @onSave="saveHandle"
        @onSubmit="submitHandle" @onDelete="deleteHandle" @onSearch="searchHandle" @onReset="resetHandle">

    </ManagePage>
</template>

<script>
import moment from "moment";
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
        };
    },

    methods: {
        // 处理提交数据
        handleSubmitData(model) {
            const startTime = model.startTime.format('YYYY-MM-DD HH:mm:ss');
            const endTime = model.endTime.format('YYYY-MM-DD HH:mm:ss');

            const tenantInfo = {
                ...model,
                startTime,
                endTime
            }   

            return tenantInfo;
        },

        // 租户表单信息回填
        async getFormModel(id) {
            const tenantDetailInfo = await this.getDetail(id);
            const {
                code,
                name,
                startTime,
                endTime,
                status
            } = tenantDetailInfo;

            const newForm = {
                code,
                name,
                startTime: moment(startTime),
                endTime: moment(endTime),
                status: status.value
            };
            return newForm;
        },
    },
}
</script>

<style lang="less" scoped></style>