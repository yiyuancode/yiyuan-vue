
import { request, METHOD } from '@/utils/request';

/**
 * 获取角色信息(分页)
 * @param {*} pageSize 每页显示数量
 * @param {*} pageNum 当前页面
 */
export async function getRolePageList(pageSize, pageNum) {
    const resp = await request("/auth/role/pages", METHOD.GET, {
        pageSize,
        pageNum
    });
    return resp.data;
}
