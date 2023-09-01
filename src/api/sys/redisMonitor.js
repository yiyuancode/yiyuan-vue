import { request } from '@/utils/request';
/**
 * 获取主机详情
 * @param {*} id
 * @returns
 */
export async function geReidsMonitorQueryCount(data) {
  const resp = await request({
    url: `/sys/reidsMonitor/queryCount`,
    params: data
  });
  return resp.data;
}
