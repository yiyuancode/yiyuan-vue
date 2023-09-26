import { request } from '@/utils/request';

/**
 * 获取所有的管理端用户信息(分页)
 *
 * @param {*} data 管理端用户信息
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export function getUserPageList(data) {
  return request({
    url: '/sys/user/page',
    params: data
  });
}

/**
 * 获取管理端用户详情
 *
 * @param {*} id
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export function getUserDetail(id) {
  return request({
    url: `/sys/user/details/${id}`
  });
}

/**
 * 添加管理端用户
 *
 * @param {*} data 管理端用户信息
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */

export function addUser(data) {
  return request({
    url: '/sys/user/add',
    method: 'post',
    data
  });
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
export function editUser(data, id) {
  return request({
    url: '/sys/user/edit',
    method: 'post',
    data: {
      ...data,
      id
    }
  });
}

/**
 * 删除管理端用户（可支持批量删除）
 *
 * @param {*} ids
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export function deleteUser(ids) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    params: {
      ids
    }
  });
}

/**
 * 登录
 *
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export function login(data) {
  return request({
    url: '/sys/user/login',
    method: 'post',
    data
  });
}

/**
 * 获取用户信息
 *
 * @return
 * @author  一源-花和尚
 * @date 2023-09-26
 */
export function getUserInfo() {
  return request({
    url: `/sys/user/getUserInfo`
  });
}
