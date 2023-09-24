<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">一源源码 全开源 天一生水 未来可期</div>
    </div>
    <div class="login">
      <a-form :form="form" @submit="loginHandle">
        <a-tabs
          size="large"
          :tabBarStyle="{ textAlign: 'center' }"
          style="padding: 0 2px"
        >
          <a-tab-pane key="1" tab="账户密码登录">
            <a-alert
              v-show="error"
              type="error"
              :closable="true"
              :message="error"
              showIcon
              style="margin-bottom: 24px"
            />
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入账户名',
                        whitespace: true
                      }
                    ]
                  }
                ]"
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
              >
                <a-icon slot="prefix" type="user"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码',
                        whitespace: true
                      }
                    ]
                  }
                ]"
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
              >
                <a-icon slot="prefix" type="lock"/>
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手机号登录">
            <a-form-item>
              <a-input size="large" placeholder="mobile number">
                <a-icon slot="prefix" type="mobile"/>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail"/>
                  </a-input>
                </a-col>
                <a-col :span="8" style="padding-left: 4px">
                  <a-button
                    style="width: 100%"
                    class="captcha-button"
                    size="large"
                  >获取验证码
                  </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button
            :loading="logging"
            style="width: 100%; margin-top: 24px"
            size="large"
            htmlType="submit"
            type="primary"
          >登录
          </a-button>

        </a-form-item>
        <!-- <div>
          其他登录方式
          <a-icon class="icon" type="alipay-circle" />
          <a-icon class="icon" type="taobao-circle" />
          <a-icon class="icon" type="weibo-circle" />
          <router-link style="float: right" to="/dashboard/workplace" >注册账户</router-link>
        </div> -->
      </a-form>
    </div>
    <a-button
      @click="addNew"
      htmlType="submit"
      type="primary"
    >下载
    </a-button>
  </common-layout>
</template>

<script>
  import CommonLayout from '@/layouts/CommonLayout';
  import {getUserInfo} from '@/api/login';
  import {loadRoutes} from '@/utils/routerUtil';
  import {mapMutations} from 'vuex';
  import axios from "axios";

  export default {
    name: 'Login',
    components: {CommonLayout},
    data() {
      return {
        logging: false,
        error: '',
        form: this.$form.createForm(this)
      };
    },
    computed: {
      systemName() {
        return this.$store.state.setting.systemName;
      }
    },
    methods: {
      ...mapMutations('account', [
        'setUser',
        'setPermissions',
        'setRoles',
        'setMenuTreeList'
      ]),

      async loginHandle(e) {
        this.logging = true;
        try {
          e.preventDefault();
          await this.form.validateFields();

          const username = this.form.getFieldValue('username');
          const password = this.form.getFieldValue('password');

          const loginRes = await this.$store.dispatch('account/login', {
            username,
            password
          });
          // 登录成功
          if (loginRes.code === 200) {
            // 获取用户信息
            const userInfo = await getUserInfo();

            // console.log(userInfo);

            const testUser = {
              name: userInfo.username,
              avatar:
                'https://img1.baidu.com/it/u=2526782352,137544254&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1690650000&t=53a347dfa7b7b0f10bac989e71dc852e'
            };
            // 设置用户
            this.setUser(testUser);
            // 设置权限
            this.setPermissions(userInfo.permissionsList);
            // 设置角色
            this.setRoles(userInfo.roleList);
            // 设置菜单列表
            this.setMenuTreeList(userInfo.menuTreeList);

            // 获取路由信息
            loadRoutes(userInfo.menuTreeList, 'menuTreeList');

            this.$router.push('/auth/admin');
            this.$message.success(loginRes.message);
          }
        } catch (err) {
          Promise.reject(err);
        }

        this.logging = false;
      },
      async addNew() {
        let req = axios.create();
        // 前端演示代码
// 问题的原因就是responseType，一定要加上！！！
// 问题的原因就是responseType，一定要加上！！！
// 问题的原因就是responseType，一定要加上！！！
        req.get("http://localhost:8085/sys/user/excel", {
          data: {},
          responseType: "arraybuffer" // 或者blob,GET请求用blob？？有待考证
        }).then(res => {
          // 这里的type最好参考Response Headers里面的content-type，有可能是application/vnd.ms-excel
          let blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8'
          })
          // 获取文件名，根据自己需要的分割
          // let fileName = res.headers['content-disposition'].split(';')[1].split("=")[1]
          let fileName = "123.xlsx"
          let a = document.createElement('a')
          let url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = fileName
          document.body.appendChild(a)
          a.style.display = 'none'
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        })
        // const operator = '帅龍之龍' // 操作人员
        // req.post(
        //   `http://106.54.87.159:50012/sys/user/excel`,
        //   {
        //     params: {
        //       'operator': operator
        //     },
        //     headers: {
        //       'Access-Control-Allow-Origin': '*',
        //       'Auth-Token': '5201314'
        //     },
        //     responseType: 'blob'
        //   }
        // )
        //   .then((res) => {
        //     try {
        //       console.log('响应信息 =>', res)
        //
        //
        //       // 响应头信息
        //       const headers = res.headers
        //
        //       // attachment;filename=%E5%B8%85%E9%BE%8D%E4%B9%8B%E9%BE%8D-%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E6%88%98%E7%BB%A9.xlsx
        //       const contentDisposition = headers['content-disposition']
        //       console.log('contentDisposition =>', contentDisposition)
        //
        //       // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8
        //       const contentType = headers['content-type']
        //       console.log('contentType =>', contentType)
        //
        //       let fileName = "123.xlsx";
        //       console.log('解析前文件名 =>', fileName) // 解析前文件名：%E5%B8%85%E9%BE%8D%E4%B9%8B%E9%BE%8D-%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E6%88%98%E7%BB%A9.xlsx
        //
        //       fileName = decodeURIComponent(fileName)
        //       console.log('解析后文件名 =>', fileName) // 解析后文件名：帅龍之龍-王者荣耀战绩.xlsx
        //
        //       // this.exportFileToExcel(contentType, res.data, fileName)
        //
        //       const url = window.URL.createObjectURL(
        //         new Blob(
        //           [res.data],
        //           {
        //             type: contentType
        //           }
        //         )
        //       )
        //       const link = document.createElement('a')
        //       link.style.display = 'none'
        //       link.href = url
        //       link.setAttribute('download', `${fileName}` || 'template.xlsx')
        //       document.body.appendChild(link)
        //       link.click()
        //       document.body.removeChild(link)
        //
        //
        //       // } else {
        //       //   console.error("文件数据为空")
        //       //   // this.$message({message: '文件数据为空', type: 'error', duration: 1000})
        //       // }
        //     } catch (e) {
        //       console.error(e)
        //       // this.$message({message: e, type: 'error', duration: 1000})
        //     }
        //   })
        //   .catch((e) => {
        //     console.error(e)
        //     this.$message({message: e, type: 'error', duration: 1000})
        //   })


      },
    }
  };
</script>

<style lang="less" scoped>
  .common-layout {
    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        a {
          text-decoration: none;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }

        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
          sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }

      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }

    .login {
      width: 368px;
      margin: 0 auto;

      @media screen and (max-width: 576px) {
        width: 95%;
      }

      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }

      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
