import * as admin from "@/api/auth/admin";

// 表格的table配置项
const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        isSearch: true
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
        isSearch: true,
        searchObj: {
            type: "select",
            options: [{
                label: "平台端",
                value: 0
            }, {
                label: "租户端",
                value: 1
            }, {
                label: "移动端",
                value: 2
            }]
        }
    },
    {
        title: "创建时间",
        dataIndex: "createTime",
        key: "createTime",
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
]

// 模块配置
const moduleConfig = {
    module: admin,
    moduleAdd: "addAdmin",
    moduleEdit: "editAdmin",
    moduleDelete: "deleteAdmin",
    moduleGetList: "getAdminPageList",
    moduleGetDetail: "getAdminDetail",
    moduleName: "用户",
}


function getSubmitFormList(vm, opType) {
    const submitFormList = [{
        prop: "username",
        ref: "username",
        label: "用户名",
        value: "",
        type: "input",
        rules: [
            { required: true, message: '请输入用户名', trigger: 'blur', }
        ],
        isShow : true,
    }, {
        prop: "password",
        ref: "password",
        label: "密码",
        value: "",
        type: "input",
        rules: [
            { required: true, message: '请输入密码', trigger: 'blur', }
        ],
        isShow: opType === "edit" ? false : true,
    }, {
        prop: "rePassword",
        ref: "rePassword",
        label: "确认密码",
        value: "",
        type: "input",
        rules: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePassWord.bind(vm), trigger: 'blur' }
        ],
        isShow: opType === "edit" ? false : true,
    }]

    return submitFormList.filter(sf=>{
        return sf.isShow;
    });
}

// 校验密码
function validatePassWord(rule, value, callback) {
    if (value !== this.model.password) {
        callback(new Error("两次密码输入不一致"));
    } else {
        callback();
    }
}


export {
    columns,
    moduleConfig,
    getSubmitFormList,
};