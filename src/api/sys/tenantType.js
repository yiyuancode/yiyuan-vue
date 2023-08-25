import {request} from '@/utils/request';

/**
 * 获取所有的租户类型信息(分页)
 *
 * @param {*} data 租户类型信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantTypePageList(data) {
    const resp = await
    request({
        url: "/sys/tenantType/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取租户类型详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantTypeDetail(id) {
    const resp = await
    request({
        url: `/sys/tenantType/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加租户类型
 *
 * @param {*} data 租户类型信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addTenantType(data) {
    const resp = await
    request({
        url: "/sys/tenantType/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑租户类型
 *
 * @param {*} data 租户类型信息
 * @param {*} id 租户类型id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editTenantType(data, id) {
    const resp = await
    request({
        url: "/sys/tenantType/edit",
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
 * 删除租户类型（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteTenantType(ids) {
    const resp = await
    request({
        url: "/sys/tenantType/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

