/**
 * 店铺类型页面组件配置配置
 *
 * @author  一源-spring
 * @date 2023-10-16
 */
import * as shopType from '@/api/spm/shopType';

const columns = [
  {
    title: '店铺类型id',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入店铺类型id', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },

  {
    title: '店铺类型名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{ required: true, message: '请输入店铺类型名称', trigger: 'blur' }]
  },

  {
    title: '店铺类型描述',
    dataIndex: 'typeDesc',
    key: 'typeDesc',
    width: 160,
    rules: [{ required: true, message: '请输入店铺类型描述', trigger: 'blur' }]
  },

  {
    title: '店铺类型合约',
    dataIndex: 'typeContract',
    key: 'typeContract',
    width: 160,
    rules: [{ required: true, message: '请输入店铺类型合约', trigger: 'blur' }],
    formType: 'text'
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },

  {
    title: '显示状态0=不显示|1=显示',
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
  module: shopType,
  moduleAdd: 'addShopType',
  moduleEdit: 'editShopType',
  moduleDelete: 'deleteShopType',
  moduleGetList: 'getShopTypePageList',
  moduleGetDetail: 'getShopTypeDetail',
  moduleName: '店铺类型'
};

// 权限对象
const permissionObj = {
  id: 'spm:shopType',
  addBtn: 'spm:shopType:add',
  editBtn: 'spm:shopType:edit',
  deleteBtn: 'spm:shopType:delete'
};

export { columns, moduleConfig, permissionObj };
