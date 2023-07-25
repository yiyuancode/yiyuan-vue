import * as role from "@/api/auth/role";

// 表格的table配置项
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        key: 'code',
        isSearch: true,
    },
    {
        title: "角色描述",
        dataIndex: "roleDesc",
        key: "roleDesc"
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
];

// 添加，编辑的一个表单
const form = {
    name: '', //角色名称
    code: '', //角色代码
    roleDesc: "" //角色描述
}



// 表单规则配置
const formRules = {
    code: [
        { required: true, message: '请输入角色代码', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入角色名称', trigger: 'blur' },
    ],
};



// 模块配置
const moduleConfig = {
    module: role,
    moduleAdd: "addRole",
    moduleEdit: "editRole",
    moduleDelete: "deleteRole",
    moduleGetList : "getRolePageList",
    moduleGetDetail : "getRoleDetail",
    moduleName : "角色",
}


export  {
    columns,
    form,
    formRules,
    moduleConfig,
};