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

        handleDetailModel(model){
            model.startTime = moment(model.startTime);
            model.endTime = moment(model.endTime);
        },
    },
}
</script>

<style lang="less" scoped></style>