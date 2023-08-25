import {request} from '@/utils/request';

/**
 * 获取所有的租户店铺分类信息(分页)
 *
 * @param {*} data 租户店铺分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantCategoryPageList(data) {
    const resp = await
    request({
        url: "/sys/tenantCategory/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取租户店铺分类详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantCategoryDetail(id) {
    const resp = await
    request({
        url: `/sys/tenantCategory/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加租户店铺分类
 *
 * @param {*} data 租户店铺分类信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addTenantCategory(data) {
    const resp = await
    request({
        url: "/sys/tenantCategory/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑租户店铺分类
 *
 * @param {*} data 租户店铺分类信息
 * @param {*} id 租户店铺分类id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editTenantCategory(data, id) {
    const resp = await
    request({
        url: "/sys/tenantCategory/edit",
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
 * 删除租户店铺分类（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteTenantCategory(ids) {
    const resp = await
    request({
        url: "/sys/tenantCategory/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

