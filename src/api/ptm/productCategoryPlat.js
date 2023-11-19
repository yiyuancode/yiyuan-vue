import {request} from '@/utils/request';

/**
 * 获取所有的平台商品分类信息(全部)
 *
 * @param {*} data 平台商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryPlatList(data) {
    return request({
        url: "/ptm/productCategoryPlat/list",
        params: data
    });

}
/**
 * 获取所有的平台商品分类信息(分页)
 *
 * @param {*} data 平台商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryPlatPageList(data) {
    return request({
        url: "/ptm/productCategoryPlat/page",
        params: data
    });

}


/**
 * 获取平台商品分类详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryPlatDetail(id) {
    return request({
        url: `/ptm/productCategoryPlat/details/${id}`,
    });

}

/**
 * 添加平台商品分类
 *
 * @param {*} data 平台商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */

export function addProductCategoryPlat(data) {
    return request({
        url: "/ptm/productCategoryPlat/add",
        method: "post",
        data
    });

}

/**
 * 编辑平台商品分类
 *
 * @param {*} data 平台商品分类信息
 * @param {*} id 平台商品分类id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function editProductCategoryPlat(data, id) {
    return request({
        url: "/ptm/productCategoryPlat/edit",
        method: "post",
        data: {
...
    data, id
}
})
    ;

}
/**
 * 删除平台商品分类（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function deleteProductCategoryPlat(ids) {
    return request({
        url: "/ptm/productCategoryPlat/delete",
        method: "post",
        params: {
            ids
        }
    });

}


/**
 * 查询平台商品分类树结构
 *
 * @param {*} data 平台商品分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-11-19
 */
export function getProductCategoryPlatTree(data) {
  return request({
    url: "/ptm/productCategoryPlat/tree",
    params: data
  });

}
