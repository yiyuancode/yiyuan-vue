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
            formType: "rangePicker"
        }
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        isSearch: true,
        searchObj: {
            formType: "rangePicker"
        }
    },
];

const submitFormList = [{
    prop: "code",
    ref: "code",
    label: "角色代码",
    value: "",
    formType: "input",
    rules: [
        { required: true, message: '请输入角色代码', trigger: 'blur', }
    ],
}, {
    prop: "name",
    ref: "name",
    label: "角色名称",
    value: "",
    formType: "input",
    rules: [
        { required: true, message: '请输入密码', trigger: 'blur', }
    ],
    
}, {
    prop: "roleDesc",
    ref: "roleDesc",
    label: "角色描述",
    value: "",
    formType: "textarea",
}]

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
    moduleConfig,
    submitFormList
};