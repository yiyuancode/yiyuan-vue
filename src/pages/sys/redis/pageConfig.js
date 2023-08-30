/**
 * Redis记录页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-08-30
 */
import * as redis from '@/api/sys/redis';

const columns = [
  {
    title: '主键ID',
    dataIndex: 'id',
    key: 'id',

    rules: [{ required: true, message: '请输入主键ID', trigger: 'blur' }],
    noEdit: true,
    noAdd: true
  },

  {
    title: 'redis名称',
    dataIndex: 'name',
    key: 'name',

    rules: [{ required: true, message: '请输入redis名称', trigger: 'blur' }]
  },

  {
    title: 'ip地址',
    dataIndex: 'host',
    key: 'host',

    rules: [{ required: true, message: '请输入ip地址', trigger: 'blur' }]
  },

  {
    title: 'reids端口',
    dataIndex: 'port',
    key: 'port'
  },

  {
    title: 'redis密码',
    dataIndex: 'password',
    key: 'password'
  },

  {
    title: 'Redis 服务器版本号',
    dataIndex: 'redisVersion',
    key: 'redisVersion'
  },

  {
    title: 'Redis 服务器运行模式',
    dataIndex: 'redisMode',
    key: 'redisMode'
  },

  {
    title: 'Redis 服务器运行的操作系统',
    dataIndex: 'os',
    key: 'os'
  },

  {
    title: 'Redis 服务器当前已连接客户端数量',
    dataIndex: 'connectedClients',
    key: 'connectedClients'
  },

  {
    title: 'Redis 服务器集群模式下已连接的客户端数量',
    dataIndex: 'clusterConnections',
    key: 'clusterConnections'
  },

  {
    title: 'Redis 服务器支持的最大客户端数量',
    dataIndex: 'maxClients',
    key: 'maxClients'
  },

  {
    title: '正在等待阻塞命令执行的客户端数量',
    dataIndex: 'blockedClients',
    key: 'blockedClients'
  },

  {
    title: '正在等待 TRACKING 命令执行的客户端数量',
    dataIndex: 'trackingClients',
    key: 'trackingClients'
  },

  {
    title: '在客户端超时表中的客户端数量',
    dataIndex: 'clientsInTimeoutTable',
    key: 'clientsInTimeoutTable'
  },

  {
    title: 'Redis 服务器接收的网络数据总字节数(KB)',
    dataIndex: 'totalNetInputBytes',
    key: 'totalNetInputBytes'
  },

  {
    title: 'Redis 服务器发送的网络数据总字节数(KB)',
    dataIndex: 'totalNetOutputBytes',
    key: 'totalNetOutputBytes'
  },

  {
    title: 'Redis 服务器历史已接受的连接请求数量',
    dataIndex: 'totalConnectionsReceived',
    key: 'totalConnectionsReceived'
  },

  {
    title: 'Redis 服务器历史已执行的命令数量',
    dataIndex: 'totalCommandsProcessed',
    key: 'totalCommandsProcessed'
  },

  {
    title: 'Redis 服务器瞬时执行的命令数量',
    dataIndex: 'instantaneousOpsPerSec',
    key: 'instantaneousOpsPerSec'
  },

  {
    title: 'Redis 所有库的key总和',
    dataIndex: 'totalKeyCount',
    key: 'totalKeyCount'
  },

  {
    title: 'Redis 所有库将要过期的key总和',
    dataIndex: 'totalExpiredKeyCount',
    key: 'totalExpiredKeyCount'
  },

  {
    title: 'Redis 实例当前占用的内存大小(KB)',
    dataIndex: 'usedMemory',
    key: 'usedMemory'
  },

  {
    title: 'Redis 实例所在系统总内存大小(KB)',
    dataIndex: 'totalSystemMemory',
    key: 'totalSystemMemory'
  },

  {
    title: 'Redis 实例配置的最大内存限制(KB)',
    dataIndex: 'maxmemory',
    key: 'maxmemory'
  },

  {
    title: 'Redis 实例占用的当前内存峰值大小(KB)',
    dataIndex: 'usedMemoryPeak',
    key: 'usedMemoryPeak'
  },

  {
    title: '开启监控',
    dataIndex: 'isMonitorEnabled',
    key: 'isMonitorEnabled',
    //值类型
    valType: 'object',
    searchObj: {
      formType: 'select',
      options: [
        {
          label: '开启',
          value: 0
        },
        {
          label: '关闭',
          value: 1
        }
      ]
    },
    formType: 'radioGroup',
    props: {
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
      style: {
        width: '100%'
      }
    },
    rules: [{ required: true, message: '请选择开启监控', trigger: 'change' }],

    formSort: 1
  },

  {
    title: '排序字段',
    dataIndex: 'sortBy',
    key: 'sortBy'
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
    noAdd: true
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
    noSearch: true
  },

  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 'createUser',

    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
  },

  {
    title: '修改人',
    dataIndex: 'updateUser',
    key: 'updateUser',

    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true
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

export { columns, moduleConfig };
