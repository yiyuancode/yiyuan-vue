<template>
    <ManagePage :theadData="columns" :data="data" :total="total" :pageSize="pageSize" :pageNum="pageNum"
        :renderObj="renderObj" @submitHandle="submitHandle" @addHandle="addHandle" @editHandle="editHandle"
        @confirmDeleteHandle="confirmDeleteHandle" @batchDeleteHandle="batchDeleteHandle" @resetHandle="resetHandle">

        <!-- 默认模态框插槽 -->
        <template #submitModal>
            <a-form-model ref="tenantForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
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
            </a-form-model>
        </template>
    </ManagePage>
</template>

<script>
import moment from "moment";
import ManagePage from "@/components/manage/ManagePage.vue";
import { getTenantPageList, getTenantDetail, addTenant, editTenant, deleteTenant } from "@/api/sys/tenant";

const columns = [
    {
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '租户代码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime"
    },
    {
        title: '结束时间',
        key: 'endTime',
        dataIndex: 'endTime',
    },
];

// 默认表单数据
const defaultForm = {
    code: '',
    name: '',
    startTime: null,
    endTime: null,
    status: 0 //启用
}
export default {
    components: {
        ManagePage,
    },
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
        return {
            data: [],
            columns,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            renderObj: {
                isLoading: false
            },
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            other: '',
            form: defaultForm,
            statusList: [{
                name: "正常",
                val: 0
            }, {
                name: "冻结",
                val: 1
            }],
            rules: {
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
            },
        };
    },
    // 组件生命周期
    async created() {
        this.getData();
    },

    methods: {
        // 进行提交
        async submitHandle(opType, id, callback) {
            let operationFlag = false;
            try {
                const validateRes = await this.$refs.tenantForm.validate();
                this.form.startTime = this.form.startTime.format('YYYY-MM-DD hh:mm:ss');
                this.form.endTime = this.form.endTime.format('YYYY-MM-DD hh:mm:ss');
                // 校验成功
                if (validateRes) {
                    if (opType === "add" || opType === "edit") {
                        if (opType === "add") {
                            // 进行添加租户
                            await addTenant(this.form);
                        } else {
                            // 进行编辑租户
                            await editTenant(this.form, id);
                        }
                        // 重新获取数据
                        await this.getData();
                        operationFlag = true;

                    }
                }
            } catch (e) {
                console.log(e);
                operationFlag = false;
            }
            callback(operationFlag, this.$refs.tenantForm);
        },
        // 获取数据
        async getData() {
            this.renderObj.isLoading = true;
            try {
                const tenantPageResult = await getTenantPageList(this.pageSize, this.pageNum);
                if (tenantPageResult) {
                    const { total, records } = tenantPageResult;
                    this.total = total;
                    this.data = records;
                }
            }catch(e){
                Promise.reject(e);
            }
            this.renderObj.isLoading = false;
        },
        // 确认删除的回调函数
        async confirmDeleteHandle(id) {
            // 执行删除租户
            await deleteTenant(id);
            // 重新获取数据
            await this.getData();
            this.$message.success("删除租户信息成功!!");
        },
        // 添加回调
        addHandle(callback) {
            this.form = defaultForm;
            this.$nextTick(() => {
                callback(this.form, this.$refs.tenantForm);
            });
        },
        // 编辑回调
        editHandle(id, callback) {
            this.tenantFormBackFill(id);
            this.$nextTick(() => {
                callback(this.$refs.tenantForm);
            });
        },
        // 重置回调
        resetHandle(callback) {
            callback(this.$refs.tenantForm);
        },
        // 进行批量删除
        async batchDeleteHandle(ids, callback) {
            await deleteTenant(ids);
            await this.getData();
            this.$message.success("批量删除成功");
            callback();
        },
        // 租户表单信息回填
        async tenantFormBackFill(id) {
            const tenantDetailInfo = await getTenantDetail(id);
            const {
                code,
                name,
                startTime,
                endTime,
                status
            } = tenantDetailInfo;

            const newStatus = this.statusList.find(stat => {
                return stat.name === status;
            });

            const newForm = {
                code,
                name,
                startTime: moment(startTime),
                endTime: moment(endTime),
                status: newStatus.val
            };

            this.form = newForm;
        },
    },
}
</script>

<style lang="less" scoped></style>