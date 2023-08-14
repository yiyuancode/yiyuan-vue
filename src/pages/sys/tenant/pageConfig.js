import * as tenant from "@/api/sys/tenant";
import _ from "lodash";

// 其他数据配置
const otherDataConfig = {
    statusList: [{
        label: "正常",
        value: 0
    }, {
        label: "冻结",
        value: 1
    }],
}

// 表格的table配置项
const columns = [
    {
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
        rules: [
            { required: true, message: '请输入租户名称', trigger: 'blur' },
        ],
    },
    {
        title: '租户代码',
        dataIndex: 'code',
        key: 'code',
        rules: [
            { required: true, message: '请输入租户编码', trigger: 'blur' },
        ],
    },
    {
        title: "租户状态",
        dataIndex: 'status',
        key: 'status',
        //值类型
        valType: "object",
        searchObj: {
            formType: "select",
            options: otherDataConfig.statusList
        },
        formType: "radioGroup",
        props: {
            options: _.cloneDeep(otherDataConfig.statusList),
            style: { width: '100%' }
        },
        rules: [
            { required: true, message: '请选择一个状态', trigger: 'change' },
        ],
        formSort : 1,
        defaultValue : 0,
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        searchObj: {
            formType: "rangePicker"
        },
        props: {
            showTime: true,
            style: { width: '100%' }
        },
        formType: "datePicker",
        rules: function () {
            return [
                { required: true, message: '请选择日期时间', trigger: 'change' },
                { validator: validateStartTime.bind(this), trigger: 'change' }
            ]
        },
    },
    {
        title: '结束时间',
        key: 'endTime',
        dataIndex: 'endTime',
        searchObj: {
            formType: "rangePicker"
        },
        formType: "datePicker",
        props: {
            showTime: true,
            style: { width: '100%' }
        },
        rules: function(){
            return [
                { required: true, message: '请选择日期时间', trigger: 'change' },
                { validator: validateEndTime.bind(this), trigger: 'change' }
            ]
        } ,
    },
    {
        title: "创建时间",
        key: "createTime",
        dataIndex: 'createTime',
        searchObj: {
            formType: "rangePicker"
        },
        noEdit: true,
        noAdd: true,
    },
    {
        title: "修改时间",
        key: "updateTime",
        dataIndex: 'updateTime',
        searchObj: {
            formType: "rangePicker"
        },
        noEdit: true,
        noAdd: true,
    }
];


function validateStartTime(rule, value, callback) {
    if (!this.model.endTime) {
        callback();
    } else {
        const endTime = this.model.endTime.format('YYYY-MM-DD HH:mm:ss');
        const startTime = value.format('YYYY-MM-DD mm:ss');

        if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
            callback('开始日期不能超过结束日期');
        } else {
            callback();
        }
    }
}

function validateEndTime(rule, value, callback) {
    if (!this.model.startTime) {
        callback();
    } else {
        const startTime = this.model.startTime.format('YYYY-MM-DD HH:mm:ss');
        const endTime = value.format('YYYY-MM-DD mm:ss');
        console.log(startTime, endTime);
        if (new Date(endTime).getTime() < new Date(startTime).getTime()) {
            callback('结束时间不能低于开始日期');
        } else {
            callback();
        }
    }
}

// 模块配置
const moduleConfig = {
    module: tenant,
    moduleAdd: "addTenant",
    moduleEdit: "editTenant",
    moduleDelete: "deleteTenant",
    moduleGetList: "getTenantPageList",
    moduleGetDetail: "getTenantDetail",
    moduleName: "租户",
}


export {
    columns,
    moduleConfig,
    otherDataConfig
};