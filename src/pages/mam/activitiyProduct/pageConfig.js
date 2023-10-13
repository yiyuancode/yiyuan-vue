/**
 * 活动商品页面组件配置配置
 *
 * @author  一源-花和尚
 * @date 2023-10-13
 */
import * as activitiyProduct from '@/api/mam/activitiyProduct';

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
    title: '活动id',
    dataIndex: 'mamActivitiyId',
    key: 'mamActivitiyId',
    width: 160,
    rules: [{ required: true, message: '请输入活动id', trigger: 'blur' }]
  },

  {
    title: '商品id',
    dataIndex: 'ptmProductId',
    key: 'ptmProductId',
    width: 160,
    rules: [{ required: true, message: '请输入商品id', trigger: 'blur' }]
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
  module: activitiyProduct,
  moduleAdd: 'addActivitiyProduct',
  moduleEdit: 'editActivitiyProduct',
  moduleDelete: 'deleteActivitiyProduct',
  moduleGetList: 'getActivitiyProductPageList',
  moduleGetDetail: 'getActivitiyProductDetail',
  moduleName: '活动商品'
};

// 权限对象
const permissionObj = {
  id: 'mam:activitiyProduct',
  addBtn: 'mam:activitiyProduct:add',
  editBtn: 'mam:activitiyProduct:edit',
  deleteBtn: 'mam:activitiyProduct:delete'
};

export { columns, moduleConfig, permissionObj };
