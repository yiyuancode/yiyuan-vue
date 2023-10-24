/**
 * 商品分类页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-10-10
 */
import * as productCategory from '@/api/ptm/productCategory';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    rules: [{required: true, message: '请输入', trigger: 'blur'}],
    noEdit: true,
    noAdd: true,
    ellipsis: true
  },

  {
    title: '父ID',
    dataIndex: 'pid',
    key: 'pid',
    width: 100,
    rules: [{required: true, message: '请输入父级ID', trigger: 'blur'}]
  },

  // { 平台商户id为0
  //   title: '商户id',
  //   dataIndex: 'tenantId',
  //   key: 'tenantId',
  //   width: 160,
  //   rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }]
  // },

  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{required: true, message: '请输入名称', trigger: 'blur'}]
  },

  {
    title: 'icon',
    dataIndex: 'icon',
    key: 'icon',
    width: 160,
    scopedSlots: {customRender: 'icon'}
  },

  {
    title: '分类级别',
    dataIndex: 'level',
    key: 'level',
    width: 160,
    //值类型
    valType: 'object',
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '一级分类',
          value: 1
        },
        {
          label: '二级分类',
          value: 2
        },
        {
          label: '三级分类',
          value: 3
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择分类级别', trigger: 'change'}],
    formSort: 1,
    scopedSlots: {customRender: 'level'}
  },

  // todo 需要在列表中实现行编辑，直接修改排序数据
  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },
  {
    title: '状态',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160,
    scopedSlots: {customRender: 'isShow'}
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择创建时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true
  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 180,
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择修改时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true,
    noSearch: true
  },

  // {
  //   title: '创建人',
  //   dataIndex: 'createUser',
  //   key: 'createUser',
  //   width: 160,
  //   noEdit: true,
  //   noAdd: true,
  //   noSearch: true,
  //   noShow: true
  // },
  //
  // {
  //   title: '修改人',
  //   dataIndex: 'updateUser',
  //   key: 'updateUser',
  //   width: 160,
  //   noEdit: true,
  //   noAdd: true,
  //   noSearch: true,
  //   noShow: true
  // }
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    // width: 150,
    //操作列可以不加宽度，但是必须要要加这个不换行属性
    ellipsis: true,
    scopedSlots: {customRender: 'operation'}
  }
];

// 模块配置
const moduleConfig = {
  module: productCategory,
  moduleAdd: 'addProductCategory',
  moduleEdit: 'editProductCategory',
  moduleDelete: 'deleteProductCategory',
  moduleGetList: 'getProductCategoryPageList',
  moduleGetDetail: 'getProductCategoryDetail',
  moduleName: '商品分类'
};

// 权限对象
const permissionObj = {
  id: 'ptm:productCategory',
  addBtn: 'ptm:productCategory:add',
  editBtn: 'ptm:productCategory:edit',
  deleteBtn: 'ptm:productCategory:delete'
};

export {columns, moduleConfig, permissionObj};
