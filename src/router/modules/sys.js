const routerMap = {
  sys: {
    name: '系统管理',
    component: () => import('@/layouts/BlankView')
  },
  tenant: {
    name: '租户管理',
    component: () => import('@/pages/sys/tenant/index')
  },
  tenantCategory: {
    name: '租户店铺分类',
    component: () => import('@/pages/sys/tenantCategory/index')
  },
  tenantInfo: {
    name: '租户信息管理',
    component: () => import('@/pages/sys/tenantInfo/index')
  },
  tenantType: {
    name: '租户类型管理',
    component: () => import('@/pages/sys/tenantType/index')
  },
  qrtz: {
    name: '定时任务管理',
    component: () => import('@/pages/sys/qrtz/index')
  },
  host: {
    name: '主机记录管理',
    component: () => import('@/pages/sys/host/index')
  },
  dept: {
    name: '部门管理',
    component: () => import('@/pages/sys/dept/index')
  },
  log: {
    component: () => import('@/components/iframe/Iframe'),
    props: {
      src: 'http://106.54.87.159:50007/app/kibana#/discover'
    }
  },
  table: {
    name: '数据库管理',
    component: () => import('@/pages/sys/table/index')
  },
  reidsMonitor: {
    name: 'Redis监控面板',
    component: () => import('@/pages/sys/redisMonitor/index')
  }
};

const i18nMap = {
  sys: {
    name: '系统管理',

    tenant: {
      name: '租户管理'
    },
    tenantCategory: {
      name: '租户店铺分类'
    },
    tenantInfo: {
      name: '租户信息管理'
    },
    tenantType: {
      name: '租户类型管理'
    },
    qrtz: {
      name: '定时任务管理'
    },
    host: {
      name: '主机记录管理'
    },
    dept: {
      name: '部门管理'
    },
    log: {
      name: '日志管理'
    },
    table: {
      name: '数据库管理'
    },
    reidsMonitor: {
      name: 'Redis监控面板'
    },
  }
};
export default {
  i18nMap,
  routerMap
};
