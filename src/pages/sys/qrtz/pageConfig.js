/**
 * 定时任务页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
import * as qrtz from '@/api/sys/qrtz';

const columns = [
  {
    title: '任务名称',
    dataIndex: 'jobName',
    key: 'jobName',
    rules: [
      {
        required: true,
        message: '请输入任务名称(和任务组组成唯一值)',
        trigger: 'blur'
      }
    ],
    width: 120,
  },

  {
    title: '任务组',
    dataIndex: 'jobGroup',
    key: 'jobGroup',
    rules: [
      {
        required: true,
        message: '请输入任务组（和名称组合唯一值）',
        trigger: 'blur'
      }
    ],
    width: 120,
  },

  {
    title: '任务执行java类',
    dataIndex: 'jobClassName',
    key: 'jobClassName',
    rules: [{required: true, message: '请输入任务执行类', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '执行时间表达式',
    dataIndex: 'jobCronExpression',
    key: 'jobCronExpression',
    rules: [
      {required: true, message: '请输入任务执行时间表达式', trigger: 'blur'}
    ],
    width: 160,
  },

  {
    title: '任务描述备注',
    dataIndex: 'jobDesc',
    key: 'jobDesc',
    rules: [{required: true, message: '请输入任务描述备注', trigger: 'blur'}],
    width: 160,
  },

  {
    title: '任务状态',
    dataIndex: 'jobStatus',
    key: 'jobStatus',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '暂停',
          value: 0
        },
        {
          label: '执行中',
          value: 1
        },
        {
          label: '已结束',
          value: 2
        }
      ]
    },
    formType: 'radioGroup',
    props: {
      options: [
        {
          label: '暂停',
          value: 0
        },
        {
          label: '执行中',
          value: 1
        },
        {
          label: '已结束',
          value: 2
        }
      ],
      style: {
        width: '100%'
      }
    },
    rules: [{required: true, message: '请选择任务状态', trigger: 'change'}],
    defaultValue: 1,
    formSort: 1,
    width: 100,
  },

  {
    title: '开始执行时间',
    dataIndex: 'startTime',
    key: 'startTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [
        {required: true, message: '请选择任务开始执行时间', trigger: 'change'}
      ];
    },
    width: 160,
  },

  {
    title: '结束执行时间',
    dataIndex: 'endTime',
    key: 'endTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [
        {required: true, message: '请选择任务结束执行时间', trigger: 'change'}
      ];
    },
    width: 160,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    searchObj: {
      formType: 'rangePicker'
    },
    props: {
      showTime: true,
      style: {width: '100%'}
    },
    formType: 'datePicker',
    rules: function () {
      return [{required: true, message: '请选择创建时间', trigger: 'change'}];
    },
    noEdit: true,
    noAdd: true,
    width: 160,
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    searchObj: {
      formType: 'rangePicker'
    },
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
    noSearch: true,
    width: 160,
  },


];

// 模块配置
const moduleConfig = {
  module: qrtz,
  moduleAdd: 'addQrtz',
  moduleEdit: 'editQrtz',
  moduleDelete: 'deleteQrtz',
  moduleGetList: 'getQrtzPageList',
  moduleGetDetail: 'getQrtzDetail',
  moduleName: '定时任务'
};

export {columns, moduleConfig};
