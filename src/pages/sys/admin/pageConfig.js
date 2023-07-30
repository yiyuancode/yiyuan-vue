import * as admin from "@/api/auth/admin";

// 表格的table配置项
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        isSearch : true
    },
    {
        title: "角色",
        dataIndex: "userRoles",
        key: "userRoles",
        scopedSlots: { customRender: 'userRoles' },
    },
    {
        title: '所属平台',
        dataIndex: 'platform',
        key: 'platform',
        isSearch : true,
        searchObj:{
            type : "select",
            options : [{
                name : "平台端",
                value : 0
            },{
                name : "租户端",
                value : 1
            },{
                name : "移动端",
                value : 2
            }]
        }
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
        isSearch : true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: '更新时间',
        key: 'updateTime',
        dataIndex: 'updateTime',
        isSearch : true,
        searchObj: {
            type: "rangePicker"
        }
    },
]

// 添加，编辑的一个表单
const form = {
    username: '', //用户名
    password: '', //密码
    rePassword: "" //确认密码
}


// 模块配置
const moduleConfig = {
    module: admin,
    moduleAdd: "addAdmin",
    moduleEdit: "editAdmin",
    moduleDelete: "deleteAdmin",
    moduleGetList : "getAdminPageList",
    moduleGetDetail : "getAdminDetail",
    moduleName : "用户",
}


export  {
    columns,
    form,
    moduleConfig,
};