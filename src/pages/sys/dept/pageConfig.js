/**
 * 部门页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as dept from "@/api/sys/dept";

const columns = [
            {
                            title: '主键id',
                        dataIndex: 'id',
            key: 'id',
            
                                                    rules: [{required: true, message: '请输入主键id', trigger: 'blur'},],
                                                                                noEdit: true,
                noAdd: true,
                            
        },

            {
                            title: '部门名称',
                        dataIndex: 'name',
            key: 'name',
            
                                                                                
        },

            {
                            title: '父菜单ID(0顶层部门)',
                        dataIndex: 'parentId',
            key: 'parentId',
            
                                                    rules: [{required: true, message: '请输入父菜单ID(0顶层部门)', trigger: 'blur'},],
                                                                
        },

            {
                            title: '所属租户',
                        dataIndex: 'tenantId',
            key: 'tenantId',
            
                                                    rules: [{required: true, message: '请输入所属租户', trigger: 'blur'},],
                                                                
        },

            {
                            title: '修改时间',
                        dataIndex: 'updateTime',
            key: 'updateTime',
                                                        searchObj: {
                    formType: "rangePicker"
                },
                props: {
                    showTime: true,
                    style: {width: '100%'}
                },
                formType: "datePicker",
                rules: function () {
                    return [
                        {required: true, message: '请选择修改时间', trigger: 'change'},
                                            ]
                },
                                                    noEdit: true,
                noAdd: true,
                                    noSearch: true,
                            
        },

            {
                            title: '创建时间',
                        dataIndex: 'createTime',
            key: 'createTime',
                                                        searchObj: {
                    formType: "rangePicker"
                },
                props: {
                    showTime: true,
                    style: {width: '100%'}
                },
                formType: "datePicker",
                rules: function () {
                    return [
                        {required: true, message: '请选择创建时间', trigger: 'change'},
                                            ]
                },
                                                    noEdit: true,
                noAdd: true,
                            
        },

            {
                            title: '创建人',
                        dataIndex: 'createUser',
            key: 'createUser',
            
                                                                                                noEdit: true,
                noAdd: true,
                                    noSearch: true,
                            
        },

            {
                            title: '修改人',
                        dataIndex: 'updateUser',
            key: 'updateUser',
            
                                                                                                noEdit: true,
                noAdd: true,
                                    noSearch: true,
                            
        },

    
]


// 模块配置
const moduleConfig = {
    module: dept,
    moduleAdd: "addDept",
    moduleEdit: "editDept",
    moduleDelete: "deleteDept",
    moduleGetList: "getDeptPageList",
    moduleGetDetail: "getDeptDetail",
    moduleName: "部门",
}

export {
    columns,
    moduleConfig,
};