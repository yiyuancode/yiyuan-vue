
import { request, METHOD } from '@/utils/request';


/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(username, password) {
    const resp = await request("/auth/login", METHOD.POST, {
        username,
        password
    }, {
        headers: {
            "platform": "0", //平台端
        }
    });

    return resp;
}

export async function getRoutesConfig() {
    return request("/routes", METHOD.GET);
}



export default {
    login,
    getRoutesConfig
};
