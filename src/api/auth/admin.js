
import { request } from '@/utils/request';


/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(username, password) {
    const resp = await request({
        url: "/auth/login",
        method: "post",
        data: {
            username,
            password
        }
    });

    return resp;
}

export async function getRoutesConfig() {
    return request({
        url : "/routes"
    });
}



export default {
    login,
    getRoutesConfig
};
