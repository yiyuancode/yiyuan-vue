import { request } from '@/utils/request';

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(username, password) {
    const resp = await request({
        url: "/login/accountLogin",
        method: "post",
        data: {
            username,
            password
        }
    });

    return resp;
}

/**
 * 获取用户信息
 * @returns 
 */
export async function getUserInfo() {
    const resp = await request({
        url: "/login/getUserInfo",
        method: "get",
    });

    return resp.data;
}

export async function getRoutesConfig() {
    const resp = await request({
        url: "/routes",
    });
    return resp.data;
}

export default {
    login,
    getUserInfo,
    getRoutesConfig
}