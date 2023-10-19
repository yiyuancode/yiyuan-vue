import {request} from '@/utils/request';

/**
 * 获取所有的店铺类型信息(分页)
 *
 * @param {*} data 店铺类型信息
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function getShopTypePageList(data) {
    return request({
        url: "/spm/shopType/page",
        params: data
    });

}


/**
 * 获取店铺类型详情
 *
 * @param {*} id
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function getShopTypeDetail(id) {
    return request({
        url: `/spm/shopType/details/${id}`,
    });

}

/**
 * 添加店铺类型
 *
 * @param {*} data 店铺类型信息
 * @return
 * @author  spring
 * @date 2023-10-16
 */

export function addShopType(data) {
    return request({
        url: "/spm/shopType/add",
        method: "post",
        data
    });

}

/**
 * 编辑店铺类型
 *
 * @param {*} data 店铺类型信息
 * @param {*} id 店铺类型id
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function editShopType(data, id) {
    return request({
        url: "/spm/shopType/edit",
        method: "post",
        data: {
...
    data, id
}
})
    ;

}
/**
 * 删除店铺类型（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  spring
 * @date 2023-10-16
 */
export function deleteShopType(ids) {
    return request({
        url: "/spm/shopType/delete",
        method: "post",
        params: {
            ids
        }
    });

}

