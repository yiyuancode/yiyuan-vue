<template>
  <div>dept</div>
</template>

<script>
// import manage from '@/mixins/manage';
// import {columns, moduleConfig} from './pageConfig';

export default {
  // mixins: [manage()],
  name: 'dept',
  data() {
    return {
      // columns,
      // ...moduleConfig
    };
  },
  created() {
    console.log('初始化创建dept组件', this.$route);
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
