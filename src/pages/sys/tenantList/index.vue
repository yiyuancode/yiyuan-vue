<template>
    <ManagePage :columns="columns" :data="data" :pagination="pagination" :renderObj="renderObj" :rules="rules"
        :model="model" :submitFormList="submitFormList" @onSave="saveHandle" @onSubmit="submitHandle" @onDelete="deleteHandle" @onSearch="searchHandle"
        @onReset="resetHandle">

        <!-- 默认模态框插槽 -->
        <!-- <template #submitModal>
            <a-form-model-item ref="code" has-feedback label="租户编码" prop="code">
                <a-input v-model="form.code" />
            </a-form-model-item>
            <a-form-model-item ref="name" has-feedback label="租户名称" prop="name">
                <a-input v-model="form.name" />
            </a-form-model-item>
            <a-form-model-item ref="startTime" has-feedback label="开始时间" prop="startTime">
                <a-date-picker v-model="form.startTime" show-time style="width:100%" />
            </a-form-model-item>
            <a-form-model-item ref="endTime" has-feedback label="结束时间" prop="endTime">
                <a-date-picker v-model="form.endTime" show-time style="width:100%" />
            </a-form-model-item>
            <a-form-model-item ref="status" label="状态" prop="status">
                <a-radio-group v-model="form.status">
                    <a-radio-button v-for="(item, index) in statusList" :key="index" :value="item.value">
                        {{ item.name }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </template> -->
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
        handleSubmitData() {
            const startTime = this.model.startTime.format('YYYY-MM-DD HH:mm:ss');
            const endTime = this.model.endTime.format('YYYY-MM-DD HH:mm:ss');

            const tenantInfo = {
                ...this.model,
                startTime,
                endTime
            }
            this.submitData = tenantInfo;
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