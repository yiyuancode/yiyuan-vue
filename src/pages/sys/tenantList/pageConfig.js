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
        isSearch: true,
    },
    {
        title: '租户代码',
        dataIndex: 'code',
        key: 'code',
        isSearch: true,
    },
    {
        title: "租户状态",
        dataIndex: 'status',
        key: 'status',
        isSearch: true,
        // 显示值得对象
        // showValObj:{
        //     prop : ""
        // },
        valType : "object",
        searchObj: {
            formType: "select",
            options: otherDataConfig.statusList
        }
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        isSearch: true,
        searchObj: {
            formType: "rangePicker"
        }
    },
    {
        title: '结束时间',
        key: 'endTime',
        dataIndex: 'endTime',
        isSearch: true,
        searchObj: {
            formType: "rangePicker"
        }
    },
    {
        title: "创建时间",
        key: "createTime",
        dataIndex: 'createTime',
        isSearch: true,
        searchObj: {
            formType: "rangePicker"
        }
    },
    {
        title: "修改时间",
        key: "updateTime",
        dataIndex: 'updateTime',
        isSearch: true,
        searchObj: {
            formType: "rangePicker"
        }
    }
];


function getSubmitFormList(vm) {
    const submitFormList = [{
        prop: "code",
        ref: "code",
        label: "租户代码",
        value: "",
        formType: "input",
        rules: [
            { required: true, message: '请输入租户编码', trigger: 'blur' },
        ],
    }, {
        prop: "name",
        ref: "name",
        label: "租户名称",
        value: "",
        formType: "input",
        rules: [
            { required: true, message: '请输入租户名称', trigger: 'blur' },
        ],
    }, {
        prop: "startTime",
        ref: "startTime",
        label: "开始时间",
        value: null,
        formType: "datePicker",
        showTime : true,
        rules: [
            { required: true, message: '请选择日期时间', trigger: 'change' },
            { validator: validateStartTime.bind(vm), trigger: 'change' }
        ],
    }, {
        prop: "endTime",
        ref: "endTime",
        label: "结束时间",
        value: null,
        formType: "datePicker",
        showTime : true,
        rules: [
            { required: true, message: '请选择日期时间', trigger: 'change' },
            { validator: validateEndTime.bind(vm), trigger: 'change' }
        ],
    }, {
        prop: "status",
        ref: "status",
        label: "状态",
        value: "",
        formType: "radioGroup",
        options: _.cloneDeep(otherDataConfig.statusList),
        rules: [
            { required: true, message: '请选择一个状态', trigger: 'change' },
        ],
    }]
    return submitFormList;
}

function validateStartTime (rule, value, callback) {
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

function validateEndTime (rule, value, callback) {
    if (!this.model.startTime) {
        callback();
    } else {
        const startTime = this.model.startTime.format('YYYY-MM-DD HH:mm:ss');
        const endTime = value.format('YYYY-MM-DD mm:ss');
        console.log(startTime,endTime);
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
    getSubmitFormList,
    otherDataConfig
};