<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      locale: {}
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
