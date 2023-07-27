
import { request } from '@/utils/request';


/**
 * 获取用户信息(分页)
 * @param {*} pageSize 每页显示数量
 * @param {*} pageNum 当前页面
 * @returns 
 */
export async function getAdminPageList(pageSize, pageNum) {
    const resp = await request({
        url: "/auth/admin/page",
        params: {
            pageSize,
            pageNum
        }
    });
    return resp.data;
}


/**
 * 获取用户详情
 * @param {*} id 
 * @returns
 */
export async function getAdminDetail(id) {
    const resp = await request({
        url: `/auth/admin/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加用户
 * @param {*} adminInfo
 *  @param {*} username 用户名
 *  @param {*} password 密码
 * @returns 
 */

export async function addAdmin(adminInfo = {}) {
    const {
        username,
        password,
    } = adminInfo;

    const resp = await request({
        url: "/auth/admin/add",
        method: "post",
        data: {
            username,
            password,
            platform : "0", //平台端
            tenantId : "0" //平台端租户id填写0
        }
    });
    return resp.data;
}

/**
 * 编辑用户
 * @param {*} adminInfo 用户信息
 *  @param username 用户名
 * @param {*} id 用户id
 * @returns 
 */
export async function editAdmin(adminInfo, id) {
    const {
        username,
    } = adminInfo;

    const resp = await request({
        url: "/auth/admin/edit",
        method: "post",
        data: {
            username,
            id
        }
    });
    return resp.data;
}

/**
 * 删除用户（可支持批量删除）
 * @param {*} ids 
 */
export async function deleteAdmin(ids) {
    const resp = await request({
        url: "/auth/admin/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}


/**
 * 用户分配角色
 * @param {*} userId 用户id
 * @param {*} roleIdList 角色id列表
 */
export async function assignRole(userId,rolesIdList){
    const resp = await request({
        url: "/auth/admin/assignRole",
        method: "post",
        data: {
            userId,
            rolesIdList
        }
    });
    return resp.data;
}


