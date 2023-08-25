<template>
  <page-layout :avatar="currUser.avatar">
    <div slot="headerContent">
      <div class="title">欢迎进入一源后台管理</div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '@/layouts/PageLayout';
import { mapState } from 'vuex';

export default {
  name: 'WorkPlace',
  components: { PageLayout },
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState('account', { currUser: 'user' }),
    ...mapState('setting', ['lang'])
  },
  created() {}
};
</script>

<style lang="less">
@import 'index';
</style>
