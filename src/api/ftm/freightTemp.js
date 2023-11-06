import {request} from '@/utils/request';

/**
 * 获取所有的物流模板信息(全部)
 *
 * @param {*} data 物流模板信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function getFreightTempList(data) {
  return request({
    url: "/ftm/freightTemp/list",
    params: data
  });

}

/**
 * 获取所有的物流模板信息(分页)
 *
 * @param {*} data 物流模板信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function getFreightTempPageList(data) {
  return request({
    url: "/ftm/freightTemp/page",
    params: data
  });

}


/**
 * 获取物流模板详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function getFreightTempDetail(id) {
  return request({
    url: `/ftm/freightTemp/details/${id}`,
  });

}

/**
 * 添加物流模板
 *
 * @param {*} data 物流模板信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */

export function addFreightTemp(data) {
  return request({
    url: "/ftm/freightTemp/add",
    method: "post",
    data
  });

}

/**
 * 编辑物流模板
 *
 * @param {*} data 物流模板信息
 * @param {*} id 物流模板id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function editFreightTemp(data, id) {
  return request({
    url: "/ftm/freightTemp/edit",
    method: "post",
    data: {
      ...
        data, id
    }
  })
    ;

}

/**
 * 删除物流模板（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function deleteFreightTemp(ids) {
  return request({
    url: "/ftm/freightTemp/delete",
    method: "post",
    params: {
      ids
    }
  });

}

