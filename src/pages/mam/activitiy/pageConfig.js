/**
 * 营销活动页面组件配置配置
 *
 * @author  一源-花和尚
 * @date 2023-10-13
 */
import * as activitiy from '@/api/mam/activitiy';

const columns = [
  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 160,
    ellipsis: true,
    rules: [{ required: true, message: '请输入商户id', trigger: 'blur' }]
  },
  {
    title: '活动名称',
    dataIndex: 'name',
    key: 'name',
    width: 160,
    ellipsis: true,
    rules: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
    width: 160,
    ellipsis: true,
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择开始时间', trigger: 'change' }];
    }
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
    width: 160,
    ellipsis: true,
    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择结束时间', trigger: 'change' }];
    }
  },
  {
    title: '是否显示',
    dataIndex: 'isShow',
    key: 'isShow',
    width: 160,
    scopedSlots: {
      customRender: 'isShow'
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    ellipsis: true,
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
    scopedSlots: {
      customRender: 'createTime'
    }
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
    ellipsis: true,
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
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    // width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true,
    fixed: 'right',
    scopedSlots: {
      customRender: 'action'
    }
  }
];

// 模块配置
const moduleConfig = {
  module: activitiy,
  moduleAdd: 'addActivitiy',
  moduleEdit: 'editActivitiy',
  moduleDelete: 'deleteActivitiy',
  moduleGetList: 'getActivitiyPageList',
  moduleGetDetail: 'getActivitiyDetail',
  moduleName: '营销活动'
};

// 权限对象
const permissionObj = {
  id: 'mam:activitiy',
  addBtn: 'mam:activitiy:add',
  editBtn: 'mam:activitiy:edit',
  deleteBtn: 'mam:activitiy:delete'
};

export { columns, moduleConfig, permissionObj };
