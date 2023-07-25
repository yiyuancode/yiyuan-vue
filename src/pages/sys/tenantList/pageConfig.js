import * as tenant from "@/api/sys/tenant";

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
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: '结束时间',
        key: 'endTime',
        dataIndex: 'endTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: "创建时间",
        key: "createTime",
        dataIndex: 'createTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: "修改时间",
        key: "updateTime",
        dataIndex: 'updateTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    }
];

// 添加，编辑的一个表单
const form = {
    code: '', //租户代码
    name: '', //租户名称
    startTime: null, //开始时间 
    endTime: null, //结束时间
    status: 0, //启用
}


// 模块配置
const moduleConfig = {
    module: tenant,
    moduleAdd: "addTenant",
    moduleEdit: "editTenant",
    moduleDelete: "deleteTenant",
    moduleGetList : "getTenantPageList",
    moduleGetDetail : "getTenantDetail",
    moduleName : "租户",
}

// 其他数据配置
const otherDataConfig = {
    statusList: [{
        name: "正常",
        val: 0
    }, {
        name: "冻结",
        val: 1
    }],
}

export  {
    columns,
    form,
    moduleConfig,
    otherDataConfig
};