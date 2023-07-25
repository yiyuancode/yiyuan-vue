<template>
    <ManagePage :theadData="columns" :data="data" :pageInfo="pageInfo" :renderObj="renderObj" :formRules="rules"
        :formModel="form" @onSave="saveHandle" @onSubmit="submitHandle" @onDelete="deleteHandle">


        <!-- 默认模态框插槽 -->
        <template #submitModal>
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
                    <a-radio-button v-for="(item, index) in statusList" :key="index" :value="item.val">
                        {{ item.name }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
        </template>
    </ManagePage>
</template>

<script>
import moment from "moment";
import ManagePage from "@/components/manage/ManagePage.vue";
import manage from "@/mixins/manage";
import { columns, form, moduleConfig, otherDataConfig } from "./pageConfig";

export default {
    components: {
        ManagePage,
    },
    mixins: [manage({})],
    data() {
        const validateStartTime = (rule, value, callback) => {
            if (!this.form.endTime) {
                callback();
            } else {
                const endTime = this.form.endTime.format('YYYY-MM-DD hh:mm:ss');
                const startTime = value.format('YYYY-MM-DD mm:ss');
                if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
                    callback('开始日期不能超过结束日期');
                } else {
                    callback();
                }
            }
        };

        const validateEndTime = (rule, value, callback) => {
            if (!this.form.startTime) {
                callback();
            } else {
                const startTime = this.form.startTime.format('YYYY-MM-DD hh:mm:ss');
                const endTime = value.format('YYYY-MM-DD mm:ss');
                if (new Date(endTime).getTime() < new Date(startTime).getTime()) {
                    callback('结束时间不能低于开始日期');
                } else {
                    callback();
                }
            }
        };

        // 表单规则配置
        const formRules = {
            code: [
                { required: true, message: '请输入租户编码', trigger: 'blur' },
            ],
            name: [
                { required: true, message: '请输入租户名称', trigger: 'blur' },
            ],
            startTime: [
                { required: true, message: '请选择日期时间', trigger: 'change' },
                { validator: validateStartTime, trigger: 'change' }
            ],
            endTime: [
                { required: true, message: '请选择日期时间', trigger: 'change' },
                { validator: validateEndTime, trigger: 'change' }
            ]
        };

        return {
            columns,
            form,
            rules: formRules,
            ...moduleConfig,
            ...otherDataConfig,
        };
    },

    methods: {
        // 处理提交数据
        handleSubmitData() {
            const startTime = this.form.startTime.format('YYYY-MM-DD hh:mm:ss');
            const endTime = this.form.endTime.format('YYYY-MM-DD hh:mm:ss');

            const tenantInfo = {
                ...this.form,
                startTime,
                endTime
            }
            this.submitData = tenantInfo;
        },

        // 租户表单信息回填
        async formBackFill(id) {
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

            this.form = newForm;
        },
    },
}
</script>

<style lang="less" scoped></style>