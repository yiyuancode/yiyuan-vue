<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    };
  }
};
</script>

<style lang="less" scoped>
html,
body {
  height: 100%;
  width: 100%;
  // font-family: "alibaba-font" !important;
}

#app {
  // font-family: "alibaba-font" !important;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
<style>
.popContainer {
  height: 100%;
}
.popContainer::-webkit-scrollbar {
  background-color: #e8eaec;
  width: 0 !important;
}
</style>
