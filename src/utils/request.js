import axios from 'axios';

// 跨域认证信息 header 名
const xsrfHeaderName = 'satoken';

axios.defaults.timeout = 5000 * 50;
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = xsrfHeaderName;
axios.defaults.xsrfCookieName = xsrfHeaderName;
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? '/' : process.env.VUE_APP_API_BASE_URL + '/';
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
// 认证类型
// const AUTH_TYPE = {
//   BEARER: 'Bearer',
//   BASIC: 'basic',
//   AUTH1: 'auth1',
//   AUTH2: 'auth2'
// };

// // http method
// const METHOD = {
//   GET: 'get',
//   POST: 'post'
// };

const request = axios;

/**
 * 设置认证信息
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(satoken) {
  localStorage.setItem(xsrfHeaderName, satoken);
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization() {
  localStorage.removeItem(xsrfHeaderName);
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization() {
  if (localStorage.getItem(xsrfHeaderName)) {
    return true;
  }
  return false;
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const { request, response } = interceptors;
  // 加载请求拦截器
  request.forEach((item) => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (config) => config;
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error);
    }
    axios.interceptors.request.use(
      (config) => onFulfilled(config, options),
      (error) => onRejected(error, options)
    );
  });
  // 加载响应拦截器
  response.forEach((item) => {
    let { onFulfilled, onRejected } = item;
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = (response) => response;
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = (error) => Promise.reject(error);
    }
    axios.interceptors.response.use(
      (response) => onFulfilled(response, options),
      (error) => onRejected(error, options)
    );
  });
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {};
  if (!url || url === '' || typeof url !== 'string') {
    return params;
  }
  const paramsStr = url.split('?')[1];
  if (!paramsStr) {
    return params;
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ');
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1];
    params[paramsArr[i * 2]] =
      value === 'true' ? true : value === 'false' ? false : value;
  }
  return params;
}

export {
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
  parseUrlParams
};
