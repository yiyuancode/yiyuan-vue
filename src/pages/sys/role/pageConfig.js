import * as role from "@/api/auth/role";

// 表格的table配置项
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        rules: [
            { required: true, message: '请输入角色名称', trigger: 'blur', }
        ],
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        key: 'code',
        rules: [
            { required: true, message: '请输入角色代码', trigger: 'blur', }
        ],
    },
    {
        title: "角色描述",
        dataIndex: "roleDesc",
        key: "roleDesc",
        formType: "textarea",
        noSearch : true,
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
        searchObj: {
            formType: "rangePicker"
        },
        noAdd: true,
        noEdit: true,
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        searchObj: {
            formType: "rangePicker"
        },
        noAdd: true,
        noEdit: true,
    },
];


// 模块配置
const moduleConfig = {
    module: role,
    moduleAdd: "addRole",
    moduleEdit: "editRole",
    moduleDelete: "deleteRole",
    moduleGetList: "getRolePageList",
    moduleGetDetail: "getRoleDetail",
    moduleName: "角色",
}


export {
    columns,
    moduleConfig,
};