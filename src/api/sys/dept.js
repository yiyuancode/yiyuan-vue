import {request} from '@/utils/request';

/**
 * 获取所有的部门信息(分页)
 *
 * @param {*} data 部门信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getDeptPageList(data) {
    const resp = await
    request({
        url: "/sys/dept/page",
        params: data
    });
    return resp.data;
}


/**
 * 获取部门详情
 *
 * @param {*} id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function getDeptDetail(id) {
    const resp = await
    request({
        url: `/sys/dept/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加部门
 *
 * @param {*} data 部门信息
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */

export async function addDept(data) {
    const resp = await
    request({
        url: "/sys/dept/add",
        method: "post",
        data
    });
    return resp.data;
}

/**
 * 编辑部门
 *
 * @param {*} data 部门信息
 * @param {*} id 部门id
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function editDept(data, id) {
    const resp = await
    request({
        url: "/sys/dept/edit",
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
 * 删除部门（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源团队-花和尚
 * @date 2023-08-25
 */
export async function deleteDept(ids) {
    const resp = await
    request({
        url: "/sys/dept/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

