import axios from 'axios';
// import store from '../store'
import { message } from 'ant-design-vue';
import { vm } from '@/main';
// import { logout } from '@/requests/user';
// import {initRouter} from './router'
//多环境API BaseUrl
// export const baseUrlMap = {
//   'api': process.env.VUE_APP_API_BASE_URL
// }
//
// function getBaseApi(url) {
//   let urlSplit = url.split("/");
//   return baseUrlMap[urlSplit[1]] + url.replace("/" + urlSplit[1], "");
// }

// 创建axios实例
let request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api的base_url
  timeout: 15000 // 请求超时时间
  // headers:{
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;',
  // }
});
// request拦截器
request.interceptors.request.use(
  (config) => {
    console.log("config",config)
    // getBaseApi(config.url)
    //   config.url = !getBaseApi(config.url) ? config.url : getBaseApi(config.url);
    // let isLogin= vm.$store.getters['account/isLogin']
    // let myToken = vm.$store.getters['account/myToken']
    let myToken = localStorage.getItem('myToken');
    console.log(' localStorage.getItem.myToken', myToken);
    if (myToken) {
      // config.headers['Authorization'] = "Bearer " + myToken // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['admintoken'] = myToken;
    }
    // if (config.formUrlHeaders) {
    //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8;'
    // }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);
// respone拦截器
request.interceptors.response.use(
  (response) => {
    console.log('response', response);
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    // const res = response.data
    //   return response.data
    let { code } = response.data;
    if (code == 200) {
      return response.data.data;
    } else {
      switch (code) {
        case 500:
          message.error('请求异常' + response.data.message);
          break;
        case 400:
          message.error('参数错误，请重新检查' + response.data.message);
          // vm.$router.replace("/404")
          break;
        case 401:
          // this.locale = require('ant-design-vue/es/locale-provider/zh_TW').default
          message.error('登录失效，请重新登录');
          vm.$router.replace('/login');
          break;
      }
    }
  },
  (error) => {
    console.log('error', error);
    switch (error.response.status) {
      case 400:
        break;
      case 401:
        vm.$router.replace('/login');
        break;
      case 'US':
    }
    return Promise.reject(error);
  }
);
export { request };
