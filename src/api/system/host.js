import {request} from '@/utils/request';

/**
 * 获取所有的主机记录信息(分页)
 *
 * @param {*} data 主机记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getHostPageList(data) {
    const resp = await
    request({
        url: "/system/host/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取主机记录详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getHostDetail(id) {
    const resp = await
    request({
        url: `/system/host/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加主机记录
 *
 * @param {*} data 主机记录信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addHost(data) {
    const resp = await
    request({
        url: "/system/host/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑主机记录
 *
 * @param {*} data 主机记录信息
 * @param {*} id 主机记录id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editHost(data, id) {
    const resp = await
    request({
        url: "/system/host/edit",
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
 * 删除主机记录（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteHost(ids) {
    const resp = await
    request({
        url: "/system/host/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

