
import { request } from '@/utils/request';


/**
 * 获取所有的租户信息(分页)
 * @param {*} pageSize 每页显示数量
 * @param {*} pageNum 当前页面
 * @returns 
 */
export async function getTenantPageList(pageSize, pageNum) {
    const resp = await request({
        url: "/sys/tenant/page",
        params: {
            pageSize,
            pageNum
        }
    });
    return resp.data;
}


/**
 * 获取租户详情
 * @param {*} id 
 * @returns
 */
export async function getTenantDetail(id) {
    const resp = await request({
        url: `/sys/tenant/details/${id}`,
    });
    return resp.data;
}

/**
 * 添加租户
 * @param {*} tenantInfo
 *  @param {*} name 租户名称
 *  @param {*} code 租户代码
 *  @param {*} startTime 开始日期
 *  @param {*} endTime 结束日期
 *  @param {*} status 状态 启用/冻结
 * @returns 
 */

export async function addTenant(tenantInfo = {}) {
    console.log(tenantInfo);
    const {
        name,
        code,
        startTime,
        endTime,
        status,
    } = tenantInfo;

    const resp = await request({
        url: "/sys/tenant/add",
        method: "post",
        data: {
            name,
            code,
            startTime,
            endTime,
            status
        }
    });
    return resp.data;
}

/**
 * 编辑租户
 * @param {*} tenantInfo 租户信息
 *  @param {*} name 租户名称
 *  @param {*} code 租户代码
 *  @param {*} startTime 开始日期
 *  @param {*} endTime 结束日期
 *  @param {*} status 状态 启用/冻结
 * 
 * @param {*} id 租户id
 * 
 * @returns 
 */
export async function editTenant(tenantInfo, id) {
    const {
        name,
        code,
        startTime,
        endTime,
        status
    } = tenantInfo;

    const resp = await request({
        url: "/sys/tenant/edit",
        method: "post",
        data: {
            name,
            code,
            startTime,
            endTime,
            status,
            id
        }
    });
    return resp.data;
}


/**
 * 删除租户（可支持批量删除）
 * @param {*} ids 
 */
export async function deleteTenant(ids) {
    const resp = await request({
        url: "/sys/tenant/delete",
        method: "post",
        params: {
            ids
        }
    });
    return resp.data;
}

