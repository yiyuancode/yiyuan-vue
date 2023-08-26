import {request} from '@/utils/request';

/**
 * 获取所有的数据库信息(分页)
 *
 * @param {*} data 数据库信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTablePageList(data) {
  const resp = await
    request({
      url: "/sys/table/page",
      params: data
    });
  return resp.data;
}


/**
 * 获取数据库详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTableDetail(id) {
  const resp = await
    request({
      url: `/sys/table/details/${id}`,
    });
  return resp.data;
}

/**
 * 添加数据库
 *
 * @param {*} data 数据库信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addTable(data) {
  const resp = await
    request({
      url: "/sys/table/add",
      method: "post",
      data
    });
  return resp.data;
}

/**
 * 编辑数据库
 *
 * @param {*} data 数据库信息
 * @param {*} id 数据库id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editTable(data, id) {
  const resp = await
    request({
      url: "/sys/table/edit",
      method: "post",
      data: {
        ...
          data, id
      }
    })
  ;
  return resp.data;
}

/**
 * 删除数据库（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteTable(ids) {
  const resp = await
    request({
      url: "/sys/table/delete",
      method: "post",
      params: {
        ids
      }
    });
  return resp.data;
}

/**
 * 刷新数据库（可支持批量删除）
 *
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function refreshTable() {
  const resp = await
    request({
      url: "/sys/table/refresh",
      method: "post",
    });
  return resp.data;
}

/**
 * 生成代码
 *
 * @param {*} data
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function generateCodeTable(data) {
  const resp = await
    request({
      url: "/sys/table/generateCode",
      method: "post",
      data,
      responseType: 'blob'
    });
  return resp.data;
}
