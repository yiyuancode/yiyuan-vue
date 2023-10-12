<template>
  <div class="MyAvatar">
    <a-dropdown>
      <a>
        <a-avatar
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        管理员:{{ $store.getters['user/myUserInfo']?.username }}
      </a>

      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">个人设置</a>
        </a-menu-item>
        <a-menu-item>
          <a @click="loginout">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      loginout() {
        this.$router.replace({name: 'login'});
        //异步清除当前用户登录得所有缓存,因为上面跳转也是一个异步所以执行到清除得不一定跳转完成了，会导致主页一些读取vuex得地方报错
        setTimeout(
          () => {
            this.$store.dispatch('user/loginout')
            this.$store.dispatch('tags/loginout')
          }, 50
        )

      }
    }
  };
</script>
<style lang="less">
  .MyAvatar {
    width: auto;
    height: 100%;
    margin-right: 100px;
    display: flex;
    justify-content: right;
    align-items: center;
    display: inline-block;
  }
</style>
