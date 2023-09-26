import {request} from '@/utils/request';

/**
 * 获取所有的管理端用户信息(分页)
 *
 * @param {*} data 管理端用户信息
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export async function getUserPageList(data) {
    const resp = await
    request({
        url: "/sys/user/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取管理端用户详情
 *
 * @param {*} id
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export async function getUserDetail(id) {
    const resp = await
    request({
        url: `/sys/user/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加管理端用户
 *
 * @param {*} data 管理端用户信息
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */

export async function addUser(data) {
    const resp = await
    request({
        url: "/sys/user/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑管理端用户
 *
 * @param {*} data 管理端用户信息
 * @param {*} id 管理端用户id
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export async function editUser(data, id) {
    const resp = await
    request({
        url: "/sys/user/edit",
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
 * 删除管理端用户（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export async function deleteUser(ids) {
    const resp = await
    request({
        url: "/sys/user/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

