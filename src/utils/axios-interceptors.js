// import Cookie from 'js-cookie';

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
      !localStorage.getItem(xsrfCookieName)
    ) {
      message.warning('认证 token 已过期，请重新登录');
    }
    const satokn = localStorage.getItem(xsrfCookieName);
    config.headers['satoken'] = satokn;
    config.headers['platform'] = '0';
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
    const { message: msg, code } = response.data;
    const { message } = options;

    if (code !== 200 && msg) {
      message.error(msg);
      return Promise.reject(msg);
    }
    return response.data;
  },
  onRejected(error, options) {
    const { message } = options;
    const { response } = error;
    if (error.code === 'ECONNABORTED') {
      message.error('请求超时!!');
    } else if (response && response.status === 502) {
      message.error('网关错误');
    }
    return Promise.reject(error);
  }
};

export default {
  request: [reqCommon], // 请求拦截
  response: [respCommon] // 响应拦截
};
