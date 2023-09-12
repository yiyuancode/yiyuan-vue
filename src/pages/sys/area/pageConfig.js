/**
 * 区域页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-09-11
 */
import * as area from '@/api/sys/area';

const columns = [
  {
    title: '区域ID',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    rules: [{ required: true, message: '请输入区域ID', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },

  {
    title: '父级ID',
    dataIndex: 'pid',
    key: 'pid',
    width: 160,
    rules: [{ required: true, message: '请输入父级ID', trigger: 'blur' }]
  },

  {
    title: '区域名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    rules: [{ required: true, message: '请输入区域名称', trigger: 'blur' }]
  },

  {
    title: '排序',
    dataIndex: 'sort',
    key: 'sort',
    width: 160
  },

  {
    title: '显示状态',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160,
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select'
    },
    options: [
      {
        label: '不显示',
        value: 0
      },
      {
        label: '显示',
        value: 1
      }
    ],
    formType: 'radioGroup',
    props: {
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择显示状态', trigger: 'change' }],
    defaultValue: 1,
    formSort: 1
  },

  {
    title: '是否删除',
    dataIndex: 'isDel',
    key: 'isDel',
    width: 160,
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select'
    },
    formType: 'radioGroup',
    options: [
      {
        label: '未删除',
        value: 0
      },
      {
        label: '已删除',
        value: 1
      }
    ],
    props: {
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择是否删除', trigger: 'change' }],
    defaultValue: 0,
    formSort: 1
  },

  {
    title: '分类级别',
    dataIndex: 'level',
    key: 'level',
    width: 160,
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select'
    },
    formType: 'radioGroup',
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
      },
      {
        label: '四级分类',
        value: 4
      },
      {
        label: '五级分类',
        value: 5
      }
    ],
    props: {
      style: {
        width: '100%'
      }
    },
    formSort: 1
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    searchObj: {
      formType: 'rangePicker'
    },
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
    searchObj: {
      formType: 'rangePicker'
    },
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
  module: area,
  moduleAdd: 'addArea',
  moduleEdit: 'editArea',
  moduleDelete: 'deleteArea',
  moduleGetList: 'getAreaPageList',
  moduleGetDetail: 'getAreaDetail',
  moduleName: '区域'
};

const permissionObj = {
  id: 'sys:area',
  addBtn: 'sys:area:add',
  editBtn: 'sys:area:edit',
  deleteBtn: 'sys:area:delete'
};

export { columns, moduleConfig, permissionObj };
