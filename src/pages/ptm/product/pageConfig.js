/**
 * 商品信息页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as product from '@/api/ptm/product';
import {getEnumsMap} from "@/utils/enumsUtils.js";

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    width: 50,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }],
    noEdit: true,
    noAdd: true,
    ellipsis: true,
    scopedSlots: {customRender: 'id'},
  },
  {
    title: '商户',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }],
    ellipsis: true,
    scopedSlots: {customRender: 'tenantId'},
  },

  {
    title: '平台分类',
    dataIndex: 'platCategoryIds',
    key: 'platCategoryIds',
    width: 200,
    rules: [
      {
        required: true,
        message: '请选择 平台分类',
        trigger: 'blur'
      }
    ],
    scopedSlots: {customRender: 'platCategoryIds'},
  },

  {
    title: '商户分类',
    dataIndex: 'shopCategoryIds',
    key: 'shopCategoryIds',
    width: 160,
    rules: [
      {
        required: true,
        message: '请选择商家id(商品分类3级)',
        trigger: 'blur'
      }
    ],
    scopedSlots: {customRender: 'shopCategoryIds'},
  },

  {
    title: '品牌',
    dataIndex: 'brandId',
    key: 'brandId',
    width: 160,
    rules: [{ required: true, message: '请输入品牌id', trigger: 'blur' }],
    scopedSlots: {customRender: 'brandId'},
  },

  {
    title: '保障服务',
    dataIndex: 'guaranteeIds',
    key: 'guaranteeIds',
    width: 160,
    rules: [
      {
        required: true,
        message: '请输入保障服务ids(英文逗号拼接)',
        trigger: 'blur'
      }
    ],
    scopedSlots: {customRender: 'guaranteeIds'},
  },

  {
    title: '运费模板',
    dataIndex: 'tempId',
    key: 'tempId',
    width: 160,
    rules: [{ required: true, message: '请输入运费模板ID', trigger: 'blur' }]
  },

  {
    title: '主图',
    dataIndex: 'image',
    key: 'image',
    width: 160,
    rules: [{ required: true, message: '请输入商品橱窗图片', trigger: 'blur' }],
    scopedSlots: {customRender: 'image'},
  },

  {
    title: '主视频',
    dataIndex: 'videoLink',
    key: 'videoLink',
    width: 160
  },

  {
    title: '详情图',
    dataIndex: 'sliderImage',
    key: 'sliderImage',
    width: 160,
    rules: [
      { required: true, message: '请输入详情图(多个逗号分割)', trigger: 'blur' }
    ],
    scopedSlots: {customRender: 'sliderImage'},
  },

  {
    title: '商品名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{ required: true, message: '请输入商品名称', trigger: 'blur' }]
  },

  {
    title: '商品简介',
    dataIndex: 'title',
    key: 'title',
    width: 160,
    rules: [{ required: true, message: '请输入商品简介', trigger: 'blur' }],
    ellipsis: true
  },

  {
    title: '搜索字符',
    dataIndex: 'keyword',
    key: 'keyword',
    width: 160,
    rules: [
      { required: true, message: '请输入关键字,英文逗号拼接', trigger: 'blur' }
    ]
  },

  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    width: 160
  },

  {
    title: '售价',
    dataIndex: 'salePrice',
    key: 'salePrice',
    width: 160
  },

  {
    title: '划线价格',
    dataIndex: 'crossedPrice',
    key: 'crossedPrice',
    width: 160
  },

  {
    title: '成本价',
    dataIndex: 'costPrice',
    key: 'costPrice',
    width: 160
  },

  {
    title: '单位名',
    dataIndex: 'unitName',
    key: 'unitName',
    width: 160,
    rules: [{ required: true, message: '请输入单位名', trigger: 'blur' }]
  },

  {
    title: '实际销量',
    dataIndex: 'sales',
    key: 'sales',
    width: 160
  },

  {
    title: '虚拟销量',
    dataIndex: 'fictiSales',
    key: 'fictiSales',
    width: 160
  },

  {
    title: '浏览量',
    dataIndex: 'browse',
    key: 'browse',
    width: 160
  },

  // todo 暂时仅仅保存单个链接，多类型的处理再实现
  {
    title: '二维码',
    dataIndex: 'codePath',
    key: 'codePath',
    width: 160
  },

  {
    title: '商户排序',
    dataIndex: 'tenantSort',
    key: 'tenantSort',
    width: 160
  },

  {
    title: '规格',
    dataIndex: 'isSpecType',
    key: 'isSpecType',
    width: 160,
    scopedSlots: {customRender: 'isSpecType'},
    props: {
      options: [
        {
          label: '单',
          value: false
        },
        {
          label: '多',
          value: true
        }
      ]
    },
  },

  {
    title: '回收站',
    dataIndex: 'isRecycle',
    key: 'isRecycle',
    width: 160,
    scopedSlots: {customRender: 'isRecycle'},
    props: {
      options: [
        {
          label: '否',
          value: false
        },
        {
          label: '是',
          value: true
        }
      ]
    },
  },

  {
    title: '单独分佣',
    dataIndex: 'isSub',
    key: 'isSub',
    width: 160,
    scopedSlots: {customRender: 'isSub'},
    props: {
      options: [
        {
          label: '否',
          value: false
        },
        {
          label: '是',
          value: true
        }
      ]
    },
  },

  {
    title: '审核',
    dataIndex: 'isAudit',
    key: 'isAudit',
    width: 160,
    noShow: true
  },

  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    key: 'auditStatus',
    width: 160,
    //值类型
    valType: 'object',
    formType: 'radioGroup',
    scopedSlots: {customRender: 'auditStatus'},
    props: {
      options: [
        {
          label: '无需审核',
          value: 0
        },
        {
          label: '待审核',
          value: 1
        },
        {
          label: '审核成功',
          value: 2
        },
        {
          label: '审核拒绝',
          value: 3
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择审核状态', trigger: 'change' }],
    defaultValue: 1,
    formSort: 1
  },
  {
    title: '拒绝原因',
    dataIndex: 'reasonContent',
    key: 'reasonContent',
    width: 160,
    rules: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }],
    noShow: true
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },

  {
    title: '上架',
    dataIndex: 'isShow',
    scopedSlots: {customRender: 'isShow'},
    key: 'isShow',
    width: 160,
    props: {
      options: [
        {
          label: '下架',
          value: false
        },
        {
          label: '上架',
          value: true
        }
      ]
    },
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择创建时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,
    noShow: true,
  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择修改时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,
    noSearch: true
  },

  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
  },

  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
    fixed: 'right',
    ellipsis: true,
    noShow: true
  }
];

// 模块配置
const moduleConfig = {
  module: product,
  moduleAdd: 'addProduct',
  moduleEdit: 'editProduct',
  moduleDelete: 'deleteProduct',
  moduleGetList: 'getProductPageList',
  moduleGetDetail: 'getProductDetail',
  moduleName: '商品信息'
};

// 权限对象
const permissionObj = {
  id: 'ptm:product',
  addBtn: 'ptm:product:add',
  editBtn: 'ptm:product:edit',
  deleteBtn: 'ptm:product:delete'
};
const enumsMap = getEnumsMap(columns);
export { columns, moduleConfig, permissionObj, enumsMap };
