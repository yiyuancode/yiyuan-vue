import { request } from '@/utils/request';

/**
 * 获取所有角色信息
 */
export async function getRoleList() {
  const resp = await request({
    url: '/auth/role/list'
  });
  return resp.data;
}

/**
 * 获取角色信息(分页)
 * @param {*} opts
 *  @param {*} pageSize 每页显示数量
 *  @param {*} pageNum 当前页面
 *  @param {*} name 角色名称
 *  @param {*} code 角色代码
 *  @param {*} createTimeStart 创建时间（开始）
 *  @param {*} createTimeEnd 创建时间（结束）
 *  @param {*} updateTimeStart 更新时间（开始）
 *  @param {*} updateTimeEnd 更新时间（结束）
 *
 *
 * @returns
 */
export async function getRolePageList(opts = {}) {
  const {
    pageSize,
    pageNum,
    name,
    code,
    createTimeStart,
    createTimeEnd,
    updateTimeStart,
    updateTimeEnd
  } = opts;

  const resp = await request({
    url: '/auth/role/page',
    params: {
      pageSize,
      pageNum,
      name,
      code,
      createTimeStart,
      createTimeEnd,
      updateTimeStart,
      updateTimeEnd
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
    url: `/auth/role/details/${id}`
  });
  return resp.data;
}

/**
 * 添加角色
 * @param {*} roleInfo
 *  @param {*} name 角色名称
 *  @param {*} code 角色代码
 *  @param {*} roleDesc 角色描述
 * @returns
 */

export async function addRole(roleInfo = {}) {
  const { name, code, roleDesc } = roleInfo;

  const resp = await request({
    url: '/auth/role/add',
    method: 'post',
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
 *  @param {*} code 角色代码
 *  @param {*} roleDesc 角色描述
 *
 * @param {*} id 角色id
 * @returns
 */
export async function editRole(roleInfo, id) {
  const { name, code, roleDesc } = roleInfo;

  const resp = await request({
    url: '/auth/role/edit',
    method: 'post',
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
    url: '/auth/role/delete',
    method: 'post',
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
    url: '/auth/role/assignMenu',
    method: 'post',
    data: {
      roleId,
      menuIdList
    }
  });
  return resp;
}
