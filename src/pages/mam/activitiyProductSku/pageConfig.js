/**
 * 活动商品sku页面组件配置配置
 *
 * @author  一源-花和尚
 * @date 2023-10-13
 */
import * as activitiyProductSku from '@/api/mam/activitiyProductSku';

const columns = [
  {
    title: '商品sku主键',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入商品sku主键', trigger: 'blur' }],
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
    title: '商品id',
    dataIndex: 'ptmProductId',
    key: 'ptmProductId',
    width: 160,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }]
  },

  {
    title: '商品原skuid',
    dataIndex: 'ptmProductSkuId',
    key: 'ptmProductSkuId',
    width: 160,
    rules: [{ required: true, message: '请输入商品原skuid', trigger: 'blur' }]
  },

  {
    title: '商品sku',
    dataIndex: 'sku',
    key: 'sku',
    width: 160,
    formType: 'text'
  },

  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock',
    width: 160
  },

  {
    title: '售卖价格',
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
    title: '是否显示0=否|1=是',
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
  module: activitiyProductSku,
  moduleAdd: 'addActivitiyProductSku',
  moduleEdit: 'editActivitiyProductSku',
  moduleDelete: 'deleteActivitiyProductSku',
  moduleGetList: 'getActivitiyProductSkuPageList',
  moduleGetDetail: 'getActivitiyProductSkuDetail',
  moduleName: '活动商品sku'
};

// 权限对象
const permissionObj = {
  id: 'mam:activitiyProductSku',
  addBtn: 'mam:activitiyProductSku:add',
  editBtn: 'mam:activitiyProductSku:edit',
  deleteBtn: 'mam:activitiyProductSku:delete'
};

export { columns, moduleConfig, permissionObj };
