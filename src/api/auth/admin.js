import { request } from '@/utils/request';

/**
 * 获取用户信息(分页)
 * @param {*} opts
 *  @param {*} pageSize 每页显示数量
 *  @param {*} pageNum 当前页面
 *  @param {*} updateTimeStart 更新时间（开始）
 *  @param {*} updateTimeEnd 更新时间（结束）
 *  @param {*} createTimeStart 创建时间（开始）
 *  @param {*} createTimeEnd 创建时间（结束）
 * @returns
 */
export async function getAdminPageList(opts = {}) {
  const {
    pageSize,
    pageNum,
    username,
    platform,
    createTimeStart,
    createTimeEnd,
    updateTimeStart,
    updateTimeEnd
  } = opts;

  const resp = await request({
    url: '/auth/admin/page',
    params: {
      pageSize,
      pageNum,
      username,
      platform,
      createTimeStart,
      createTimeEnd,
      updateTimeStart,
      updateTimeEnd
    }
  });

  const record = [];
  for (let i = 0; i < 20; i++) {
    record.push({
      "id": "1111" + i,
      "username": "test11" + i,
      "password": "111" + i,
      "platform": "租户端" + i,
      "tenantId": "f9924733c2451d1554b53d521cb37185" + i,
      "createTime": "2023-08-18 13:55:22",
      "updateTime": "2023-08-18 13:55:22",
      "createUser": "fcd7fd521c18b0f181bfbd4c7a652269" + i,
      "updateUser": "fcd7fd521c18b0f181bfbd4c7a652269" + i,
      "roleList": [
        {
          "id": "64d73fb140219dff1cd3488926e59b64" + i,
          "name": "租户管理A套餐角色",
          "code": "ZUHU-A",
          "roleDesc": "租户管理A套餐角色-99元包年",
          "createTime": "2023-08-18 13:57:18",
          "updateTime": "2023-08-18 13:57:18",
          "createUser": "fcd7fd521c18b0f181bfbd4c7a652269" + i,
          "updateUser": "fcd7fd521c18b0f181bfbd4c7a652269 + i"
        }
      ],
      "userRoles": "租户管理A套餐角色"
    });
  }

  resp.data.records.push(...record);
  return resp.data;
}

/**
 * 获取用户详情
 * @param {*} id
 * @returns
 */
export async function getAdminDetail(id) {
  const resp = await request({
    url: `/auth/admin/details/${id}`
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
  const { username, password } = adminInfo;

  const resp = await request({
    url: '/auth/admin/add',
    method: 'post',
    data: {
      username,
      password,
      platform: '0', //平台端
      tenantId: '0' //平台端租户id填写0
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
  const { username } = adminInfo;

  const resp = await request({
    url: '/auth/admin/edit',
    method: 'post',
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
    url: '/auth/admin/delete',
    method: 'post',
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
export async function assignRole(userId, rolesIdList) {
  const resp = await request({
    url: '/auth/admin/assignRole',
    method: 'post',
    data: {
      userId,
      rolesIdList
    }
  });
  return resp.data;
}
