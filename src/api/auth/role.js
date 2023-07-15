
import { request } from '@/utils/request';


/**
 * 获取角色信息(分页)
 * @param {*} pageSize 每页显示数量
 * @param {*} pageNum 当前页面
 * @returns 
 */
export async function getRolePageList(pageSize, pageNum) {
    const resp = await request({
        url: "/auth/role/pages",
        params: {
            pageSize,
            pageNum
        }
    });
    return resp.data;
}


/**
 * 获取角色详情
 * @param {*} id 
 * @returns
 */
export async function getRoleDetail(id) {
    const resp = await request({
        url: `/auth/role/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加角色
 * @param {*} roleInfo
 * @param {*} name 角色名称
 * @param {*} code 角色代码
 * @param {*} roleDesc 角色描述
 * @returns 
 */

export async function addRole(roleInfo = {}) {
    const {
        name,
        code,
        roleDesc
    } = roleInfo;

    const resp = await request({
        url: "/auth/role/add",
        method: "post",
        data: {
            name,
            code,
            roleDesc
        }
    });
    return resp.data;
}

/**
 * 编辑角色
 * @param {*} roleInfo 角色信息
 * @param {*} id 角色id
 * @returns 
 */
export async function editRole(roleInfo, id) {
    const {
        name,
        code,
        roleDesc
    } = roleInfo;

    const resp = await request({
        url: "/auth/role/edit",
        method: "post",
        data: {
            name,
            code,
            roleDesc,
            id
        }
    });
    return resp.data;
}


/**
 * 删除角色（可支持批量删除）
 * @param {*} ids 
 */
export async function deleteRole(ids) {
    const resp = await request({
        url: "/auth/role/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}


/**
 * 分配角色菜单
 * @param {*} roleId 角色id
 * @param {*} menuIdList 菜单id列表
 * @returns 
 */
export async function assignMenu(roleId, menuIdList) {
    const resp = await request({
        url: "/auth/role/assignMenu",
        method: "post",
        data: {
            roleId,
            menuIdList
        }
    });
    return resp;
}