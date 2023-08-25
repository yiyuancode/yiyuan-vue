import {request} from '@/utils/request';

/**
 * 获取所有的租户信息信息(分页)
 *
 * @param {*} data 租户信息信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantInfoPageList(data) {
    const resp = await
    request({
        url: "/sys/tenantInfo/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取租户信息详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getTenantInfoDetail(id) {
    const resp = await
    request({
        url: `/sys/tenantInfo/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加租户信息
 *
 * @param {*} data 租户信息信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addTenantInfo(data) {
    const resp = await
    request({
        url: "/sys/tenantInfo/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑租户信息
 *
 * @param {*} data 租户信息信息
 * @param {*} id 租户信息id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editTenantInfo(data, id) {
    const resp = await
    request({
        url: "/sys/tenantInfo/edit",
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
 * 删除租户信息（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteTenantInfo(ids) {
    const resp = await
    request({
        url: "/sys/tenantInfo/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

