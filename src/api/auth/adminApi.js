
import { request, METHOD, removeAuthorization } from '@/utils/request';


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
    },{
        headers:{
            "platform" : "0", //平台端
        }
    });

    return resp;
}

export async function getRoutesConfig() {
    return request("/routes", METHOD.GET);
}

/**
 * 退出登录
 */
export function logout() {
    localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY);
    localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY);
    localStorage.removeItem(process.env.VUE_APP_ROLES_KEY);
    removeAuthorization();
}
export default {
    login,
    logout,
    getRoutesConfig
};
