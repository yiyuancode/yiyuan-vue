<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
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
                <a-icon slot="prefix" type="user" />
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
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane key="2" tab="手机号登录">
            <a-form-item>
              <a-input size="large" placeholder="mobile number">
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-row :gutter="8" style="margin: 0 -4px">
                <a-col :span="16">
                  <a-input size="large" placeholder="captcha">
                    <a-icon slot="prefix" type="mail" />
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
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout';
import { getUserInfo } from '@/api/login';
import { loadRoutes } from '@/utils/routerUtil';
import { mapMutations } from 'vuex';

export default {
  name: 'Login',
  components: { CommonLayout },
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
    }
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
