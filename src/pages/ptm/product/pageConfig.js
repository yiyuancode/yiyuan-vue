/**
 * 商品信息页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as product from '@/api/ptm/product';

const columns = [
  {
    title: '商品id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },
  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }]
  },

  {
    title: '主类目id(商品分类2级id，逗号拼接)',
    dataIndex: 'tenantCategoryId',
    key: 'tenantCategoryId',
    width: 160,
    rules: [
      {
        required: true,
        message: '请输入主类目id(商品分类2级id，逗号拼接)',
        trigger: 'blur'
      }
    ]
  },

  {
    title: '店铺内部分类id(商品分类3级)',
    dataIndex: 'shopCategoryId',
    key: 'shopCategoryId',
    width: 160,
    rules: [
      {
        required: true,
        message: '请输入店铺内部分类id(商品分类3级)',
        trigger: 'blur'
      }
    ]
  },

  {
    title: '品牌id',
    dataIndex: 'brandId',
    key: 'brandId',
    width: 160,
    rules: [{ required: true, message: '请输入品牌id', trigger: 'blur' }]
  },

  {
    title: '保障服务ids(英文逗号拼接)',
    dataIndex: 'guaranteeIds',
    key: 'guaranteeIds',
    width: 160,
    rules: [
      {
        required: true,
        message: '请输入保障服务ids(英文逗号拼接)',
        trigger: 'blur'
      }
    ]
  },

  {
    title: '运费模板ID',
    dataIndex: 'tempId',
    key: 'tempId',
    width: 160,
    rules: [{ required: true, message: '请输入运费模板ID', trigger: 'blur' }]
  },

  {
    title: '商品橱窗图片',
    dataIndex: 'image',
    key: 'image',
    width: 160,
    rules: [{ required: true, message: '请输入商品橱窗图片', trigger: 'blur' }]
  },

  {
    title: '详情图(多个逗号分割)',
    dataIndex: 'sliderImage',
    key: 'sliderImage',
    width: 160,
    rules: [
      { required: true, message: '请输入详情图(多个逗号分割)', trigger: 'blur' }
    ]
  },

  {
    title: '详情视频链接',
    dataIndex: 'videoLink',
    key: 'videoLink',
    width: 160
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
    rules: [{ required: true, message: '请输入商品简介', trigger: 'blur' }]
  },

  {
    title: '关键字,英文逗号拼接',
    dataIndex: 'keyword',
    key: 'keyword',
    width: 160,
    rules: [
      { required: true, message: '请输入关键字,英文逗号拼接', trigger: 'blur' }
    ]
  },

  {
    title: '商品详情(富文本)',
    dataIndex: 'goodsDesc',
    key: 'goodsDesc',
    width: 160,
    formType: 'text'
  },

  {
    title: '库存(根据sku所有累计库存自动设置)',
    dataIndex: 'stock',
    key: 'stock',
    width: 160
  },

  {
    title: '售卖价格(根据sku最低售卖价格自动设置)',
    dataIndex: 'salePrice',
    key: 'salePrice',
    width: 160
  },

  {
    title: '划线价格(根据sku最低划线价格自动设置)',
    dataIndex: 'crossedPrice',
    key: 'crossedPrice',
    width: 160
  },

  {
    title: '成本价(根据sku最低成本价自动设置)',
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
    title: '虚拟销量(如果为默认值前端展示实际销量,反之展示虚拟销量)',
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

  {
    title: '商品二维码地址(用户小程序海报)',
    dataIndex: 'codePath',
    key: 'codePath',
    width: 160
  },

  {
    title: '总后台排序',
    dataIndex: 'tenantSort',
    key: 'tenantSort',
    width: 160
  },

  {
    title: '是否单规格0=单|1=多',
    dataIndex: 'isSpecType',
    key: 'isSpecType',
    width: 160
  },

  {
    title: '是否放入回收站0=否|1=是',
    dataIndex: 'isRecycle',
    key: 'isRecycle',
    width: 160
  },

  {
    title: '是否单独分佣0=否|1=是',
    dataIndex: 'isSub',
    key: 'isSub',
    width: 160
  },

  {
    title: '是否加入审核0=否|1=是',
    dataIndex: 'isAudit',
    key: 'isAudit',
    width: 160
  },

  {
    title: '审核状态',
    dataIndex: 'auditStatus',
    key: 'auditStatus',
    width: 160,
    //值类型
    valType: 'object',
    formType: 'radioGroup',
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
  { // 准备写插槽使用
    title: '商品SKU',
    dataIndex: 'skuForm',
    key: 'skuForm',
    width: 160,
    formType: 'customerForm',
  },
  { // 准备写插槽使用
    title: '商品SKU1',
    dataIndex: 'skuForm1',
    key: 'skuForm1',
    width: 160,
    formType: 'customerForm'
  },
  {
    title: '拒绝原因',
    dataIndex: 'reasonContent',
    key: 'reasonContent',
    width: 160,
    rules: [{ required: true, message: '请输入拒绝原因', trigger: 'blur' }]
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },

  {
    title: '是否上架0=否|1=是',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160
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
    noAdd: true
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

export { columns, moduleConfig, permissionObj };
