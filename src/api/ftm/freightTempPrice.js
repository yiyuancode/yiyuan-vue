import {request} from '@/utils/request';

/**
 * 获取所有的物流模板价格信息(分页)
 *
 * @param {*} data 物流模板价格信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function getFreightTempPricePageList(data) {
  return request({
    url: "/ftm/freightTempPrice/page",
    params: data
  });

}


/**
 * 获取物流模板价格详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function getFreightTempPriceDetail(id) {
  return request({
    url: `/ftm/freightTempPrice/details/${id}`,
  });

}

/**
 * 添加物流模板价格
 *
 * @param {*} data 物流模板价格信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */

export function addFreightTempPrice(data) {
  return request({
    url: "/ftm/freightTempPrice/add",
    method: "post",
    data
  });

}

/**
 * 编辑物流模板价格
 *
 * @param {*} data 物流模板价格信息
 * @param {*} id 物流模板价格id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function editFreightTempPrice(data, id) {
  return request({
    url: "/ftm/freightTempPrice/edit",
    method: "post",
    data: {
      ...
        data, id
    }
  })
    ;

}

/**
 * 删除物流模板价格（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
export function deleteFreightTempPrice(ids) {
  return request({
    url: "/ftm/freightTempPrice/delete",
    method: "post",
    params: {
      ids
    }
  });

}

