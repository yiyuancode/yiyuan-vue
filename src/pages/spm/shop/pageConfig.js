/**
 * 店铺页面组件配置配置
 *
 * @author  spring
 * @date 2023-10-16
 */
import * as shop from "@/api/spm/shop";

const columns = [
            {
                            title: '店铺id',
                        dataIndex: 'id',
            key: 'id',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺id', trigger: 'blur'},],
                                                                                            noEdit: true,
                noAdd: true,
                            
        },

            {
                            title: '店铺类型id',
                        dataIndex: 'spmShopTypeId',
            key: 'spmShopTypeId',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺类型id', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '地址id',
                        dataIndex: 'sysAreaId',
            key: 'sysAreaId',
            width: 160,
                                                                rules: [{required: true, message: '请输入地址id', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户名称',
                        dataIndex: 'merchantName',
            key: 'merchantName',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户名称', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户邮箱',
                        dataIndex: 'merchantEmail',
            key: 'merchantEmail',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户邮箱', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户手机号',
                        dataIndex: 'merchantPhone',
            key: 'merchantPhone',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户手机号', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户法人',
                        dataIndex: 'merchantLegalRepresentative',
            key: 'merchantLegalRepresentative',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户法人', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户分类',
                        dataIndex: 'merchantCategory',
            key: 'merchantCategory',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户分类', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户类别',
                        dataIndex: 'merchantType',
            key: 'merchantType',
            width: 160,
                                                                rules: [{required: true, message: '请输入商户类别', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '商户手续费',
                        dataIndex: 'merchantFee',
            key: 'merchantFee',
            width: 160,
                                                            
        },

            {
                            title: '商户星级',
                        dataIndex: 'merchantRating',
            key: 'merchantRating',
            width: 160,
                                                            
        },

            {
                            title: '资质图片',
                        dataIndex: 'qualificationImages',
            key: 'qualificationImages',
            width: 160,
                                                                rules: [{required: true, message: '请输入资质图片', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺名称',
                        dataIndex: 'shopName',
            key: 'shopName',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺名称', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺主头像',
                        dataIndex: 'shopOwnerAvatar',
            key: 'shopOwnerAvatar',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺主头像', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺背景图',
                        dataIndex: 'shopBackgroundImage',
            key: 'shopBackgroundImage',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺背景图', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '推荐店铺背景图',
                        dataIndex: 'recommendedShopBackgroundImage',
            key: 'recommendedShopBackgroundImage',
            width: 160,
                                                                rules: [{required: true, message: '请输入推荐店铺背景图', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺封面图',
                        dataIndex: 'shopCover',
            key: 'shopCover',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺封面图', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺logo',
                        dataIndex: 'shopLogo',
            key: 'shopLogo',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺logo', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺简介',
                        dataIndex: 'shopDescription',
            key: 'shopDescription',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺简介', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '店铺类型',
                        dataIndex: 'shopType',
            key: 'shopType',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺类型', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '库存告警阈值',
                        dataIndex: 'inventoryAlert',
            key: 'inventoryAlert',
            width: 160,
                                                            
        },

            {
                            title: '是否支持自提0=否|1=是',
                        dataIndex: 'isSupportsSelfPickup',
            key: 'isSupportsSelfPickup',
            width: 160,
                                                            
        },

            {
                            title: '店铺地址',
                        dataIndex: 'shopAddress',
            key: 'shopAddress',
            width: 160,
                                                                rules: [{required: true, message: '请输入店铺地址', trigger: 'blur'},],
                                                                            
        },

            {
                            title: '结算类型',
                        dataIndex: 'settlementType',
            key: 'settlementType',
            width: 160,
                                                                //值类型
                valType: "object",
                                                                                                                                                                                                                                formType: "radioGroup",
                props: {
                    options: [
                                                    {
                                label: '银行卡',
                                value:1,
                            },
                                                    {
                                label: '微信',
                                value:2,
                            },
                                                    {
                                label: '支付宝',
                                value:3,
                            },
                                            ],
                    style:
                        {
                            width: '100%'
                        }
                },
                                                    rules: [
                        {required: true, message: '请选择结算类型', trigger: 'change'},
                    ],
                                                    formSort: 1,
                        
        },

            {
                            title: '银行卡结算-收款人',
                        dataIndex: 'bankPayee',
            key: 'bankPayee',
            width: 160,
                                                                                                        
        },

            {
                            title: '银行卡结算-开户银行',
                        dataIndex: 'bankNumber',
            key: 'bankNumber',
            width: 160,
                                                                                                        
        },

            {
                            title: '银行卡结算-开户行地址',
                        dataIndex: 'bankAddress',
            key: 'bankAddress',
            width: 160,
                                                                                                        
        },

            {
                            title: '微信结算-真实姓名',
                        dataIndex: 'wechatRealName',
            key: 'wechatRealName',
            width: 160,
                                                                                                        
        },

            {
                            title: '微信结算-微信号',
                        dataIndex: 'wechatAccount',
            key: 'wechatAccount',
            width: 160,
                                                                                                        
        },

            {
                            title: '微信结算-收款二维码',
                        dataIndex: 'wechatQrCode',
            key: 'wechatQrCode',
            width: 160,
                                                                                                        
        },

            {
                            title: '支付宝结算-真实姓名',
                        dataIndex: 'alipayRealName',
            key: 'alipayRealName',
            width: 160,
                                                                                                        
        },

            {
                            title: '支付宝结算-微信号',
                        dataIndex: 'alipayAccount',
            key: 'alipayAccount',
            width: 160,
                                                                                                        
        },

            {
                            title: '支付宝结算-收款二维码',
                        dataIndex: 'alipayQrCode',
            key: 'alipayQrCode',
            width: 160,
                                                                                                        
        },

            {
                            title: '排序',
                        dataIndex: 'sort',
            key: 'sort',
            width: 160,
                                                            
        },

            {
                            title: '显示状态0=不显示|1=显示',
                        dataIndex: 'isShow',
            key: 'isShow',
            width: 160,
                                                            
        },

            {
                            title: '创建时间',
                        dataIndex: 'createTime',
            key: 'createTime',
            width: 160,
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
                            title: '修改时间',
                        dataIndex: 'updateTime',
            key: 'updateTime',
            width: 160,
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
                            title: '创建人',
                        dataIndex: 'createUser',
            key: 'createUser',
            width: 160,
                                                                                                                        noEdit: true,
                noAdd: true,
                                    noSearch: true,
                                            noShow: true,
                                                
        },

            {
                            title: '修改人',
                        dataIndex: 'updateUser',
            key: 'updateUser',
            width: 160,
                                                                                                                        noEdit: true,
                noAdd: true,
                                    noSearch: true,
                                            noShow: true,
                                                
        },

    
]


// 模块配置
const moduleConfig = {
    module: shop,
    moduleAdd: "addShop",
    moduleEdit: "editShop",
    moduleDelete: "deleteShop",
    moduleGetList: "getShopPageList",
    moduleGetDetail: "getShopDetail",
    moduleName: "店铺",
}

// 权限对象
const permissionObj = {
    id: 'spm:shop',
    addBtn: 'spm:shop:add',
    editBtn: 'spm:shop:edit',
    deleteBtn: 'spm:shop:delete'
};

export {
    columns,
    moduleConfig,
    permissionObj
};