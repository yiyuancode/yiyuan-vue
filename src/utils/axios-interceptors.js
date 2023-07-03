import Cookie from 'js-cookie';


// 请求通用
const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { message } = options;
    const { url, xsrfCookieName } = config;
    if (
      url.indexOf('login') === -1 &&
      xsrfCookieName &&
      !Cookie.get(xsrfCookieName)
    ) {
      message.warning('认证 token 已过期，请重新登录');
    }
    return config;
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options;
    message.error(error.message);
    return Promise.reject(error);
  }
};

// 响应通用
const respCommon = {
  onFulfilled(response, options) {
    const data = response.data.data;
    if(data.token){
      response.headers["satoken"] = data.token;
    }
    const { message } = options;
    if (response.code === 401) {
      message.error('无此权限');
    }
    return response;
  },
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (response.status === 403) {
      message.error('请求被拒绝');
    }
    return Promise.reject(error);
  }
}


export default {
  request: [reqCommon], // 请求拦截
  response: [respCommon] // 响应拦截
};
