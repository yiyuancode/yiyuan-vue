import { request } from '@/utils/request';

/**
 * 获取主机信息(分页)
 * @param {*} opts
 *  @param {*} pageSize 每页显示数量
 *  @param {*} pageNum 当前页面
 *  @param {*} hostName 主机名
 *  @param {*} host IP地址
 *  @param {*} sshPort ssh端口
 *  @param {*} sshUsername ssh用户名
 *  @param {*} sshPassword ssh登录密码
 *  @param {*} isMonitorEnabled 开启监控
 *  @param {*} updateTimeStart 更新时间（开始）
 *  @param {*} updateTimeEnd 更新时间（结束）
 *  @param {*} createTimeStart 创建时间（开始）
 *  @param {*} createTimeEnd 创建时间（结束）
 * @returns
 */
export async function getHostPageList(opts = {}) {
  const {
    pageSize,
    pageNum,
    hostName,
    host,
    sshPort,
    sshUsername,
    sshPassword,
    isMonitorEnabled,
    createUser,
    updateUser,
    createTimeStart,
    createTimeEnd,
    updateTimeStart,
    updateTimeEnd
  } = opts;

  const resp = await request({
    url: '/sys/host/page',
    params: {
      pageSize,
      pageNum,
      hostName,
      host,
      sshPort,
      sshUsername,
      sshPassword,
      isMonitorEnabled,
      createUser,
      updateUser,
      createTimeStart,
      createTimeEnd,
      updateTimeStart,
      updateTimeEnd
    }
  });
  return resp.data;
}

/**
 * 获取主机详情
 * @param {*} id
 * @returns
 */
export async function getHostDetail(id) {
  const resp = await request({
    url: `/sys/host/details/${id}`
  });
  return resp.data;
}

/**
 * 添加主机
 * @param {*} hostInfo
 *  @param {*} hostName 主机名
 *  @param {*} host IP地址
 *  @param {*} sshPort SSH端口
 *  @param {*} sshUsername SSH登录用户名
 *  @param {*} sshPassword SSH登录密码
 *  @param {*} isMonitorEnabled 开启监控
 * @returns
 */

export async function addHost(hostInfo = {}) {
  const {
    hostName,
    host,
    sshPort,
    sshUsername,
    sshPassword,
    isMonitorEnabled
  } = hostInfo;

  const resp = await request({
    url: '/sys/host/add',
    method: 'post',
    data: {
      hostName,
      host,
      sshPort,
      sshUsername,
      sshPassword,
      isMonitorEnabled
    }
  });
  return resp.data;
}

/**
 * 编辑主机
 * @param {*} hostInfo 主机信息
 *  @param {*} hostName 主机名
 *  @param {*} host IP地址
 *  @param {*} sshPort SSH端口
 *  @param {*} sshUsername SSH登录用户名
 *  @param {*} sshPassword SSH登录密码
 *  @param {*} isMonitorEnabled 开启监控
 * @param {*} id 主机id
 * @returns
 */
export async function editHost(hostInfo, id) {
  const {
    hostName,
    host,
    sshPort,
    sshUsername,
    sshPassword,
    isMonitorEnabled
  } = hostInfo;

  const resp = await request({
    url: '/sys/host/edit',
    method: 'post',
    data: {
      hostName,
      host,
      sshPort,
      sshUsername,
      sshPassword,
      isMonitorEnabled,
      id
    }
  });
  return resp.data;
}

/**
 * 删除主机（可支持批量删除）
 * @param {*} ids
 */
export async function deleteHost(ids) {
  const resp = await request({
    url: '/sys/host/delete',
    method: 'post',
    params: {
      ids
    }
  });
  return resp.data;
}
