import { request } from '@/utils/request';

/**
 * 获取主机详情
 * @param {*} id
 * @returns
 */
export async function geHostMonitorQueryCount(data) {
  const resp = await request({
    url: `/sys/hostMonitor/queryCount`,
    params: data
  });
  return resp.data;
}
