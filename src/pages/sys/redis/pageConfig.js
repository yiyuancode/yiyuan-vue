/**
 * Redis记录页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
import * as redis from '@/api/sys/redis';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    rules: [{ required: true, message: '请输入redis名称', trigger: 'blur' }],
    width: 160
  },

  {
    title: 'ip地址',
    dataIndex: 'host',
    key: 'host',
    rules: [{ required: true, message: '请输入ip地址', trigger: 'blur' }],
    width: 160
  },

  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
    width: 80
  },

  {
    title: 'redis密码',
    dataIndex: 'password',
    key: 'password',
    width: 160
  },

  {
    title: '版本号',
    dataIndex: 'redisVersion',
    key: 'redisVersion',
    width: 160
  },

  {
    title: '运行模式',
    dataIndex: 'redisMode',
    key: 'redisMode',
    width: 160
  },

  {
    title: '操作系统',
    dataIndex: 'os',
    key: 'os',
    width: 160
  },

  {
    title: '连接数',
    dataIndex: 'connectedClients',
    key: 'connectedClients',
    width: 160
  },

  {
    title: '开启监控',
    dataIndex: 'isMonitorEnabled',
    key: 'isMonitorEnabled',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select'
    },
    options: [
      {
        label: '开启',
        value: 0
      },
      {
        label: '关闭',
        value: 1
      }
    ],
    formType: 'radioGroup',
    props: {
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择开启监控', trigger: 'change' }],
    formSort: 1,
    width: 160
  },

  {
    title: '排序字段',
    dataIndex: 'sortBy',
    key: 'sortBy',
    width: 160
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
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择创建时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,
    width: 160
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
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择修改时间', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true,
    noSearch: true,
    width: 160
  }
];

// 模块配置
const moduleConfig = {
  module: redis,
  moduleAdd: 'addRedis',
  moduleEdit: 'editRedis',
  moduleDelete: 'deleteRedis',
  moduleGetList: 'getRedisPageList',
  moduleGetDetail: 'getRedisDetail',
  moduleName: 'Redis记录'
};

// 权限对象
const permissionObj = {
  id: 'sys:redis',
  addBtn: 'sys:redis:add',
  editBtn: 'sys:redis:edit',
  deleteBtn: 'sys:redis:delete'
};

export { columns, moduleConfig, permissionObj };
