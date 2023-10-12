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
    config.headers['admintoken'] = satokn;
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

    if (response.data.type === 'application/octet-stream') {

      // 获取http头部的文件名信息，若无需重命名文件，将下面这行删去
      // const fileName = response.headers['content-disposition'].split('=')[1];
      /* 兼容ie内核，360浏览器的兼容模式 */
      // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      //   const blob = new Blob([response.data], { type: 'application/zip' });
      //   window.navigator.msSaveOrOpenBlob(blob, fileName);
      // } else {
      //   /* 火狐谷歌的文件下载方式 */
      //   const blob = new Blob([response.data], { type: 'application/zip' });
      //   const url = window.URL.createObjectURL(blob);
      //   const link = document.createElement('a'); // 创建a标签
      //   link.href = url;
      //   link.download = fileName; // 文件重命名，若无需重命名，将该行删去
      //   link.click();
      //   URL.revokeObjectURL(url); // 释放内存
      // }
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return response;
      // resolve(response)
    }

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
