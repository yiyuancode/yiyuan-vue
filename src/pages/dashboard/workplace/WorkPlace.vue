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
import { request, METHOD } from '@/utils/request';

export default {
  name: 'WorkPlace',
  components: { PageLayout },
  i18n: require('./i18n'),
  data() {
    return {
      projects: [],
      loading: true,
      activities: [],
      teams: [],
      welcome: {
        timeFix: '',
        message: ''
      }
    };
  },
  computed: {
    ...mapState('account', { currUser: 'user' }),
    ...mapState('setting', ['lang'])
  },
  created() {
    request('/user/welcome', METHOD.GET).then(
      (res) => (this.welcome = res.data)
    );
    request('/work/activity', METHOD.GET).then(
      (res) => (this.activities = res.data)
    );
    request('/work/team', METHOD.GET).then((res) => (this.teams = res.data));
    request('/project', METHOD.GET).then((res) => {
      this.projects = res.data;
      this.loading = false;
    });
  }
};
</script>

<style lang="less">
@import 'index';
</style>
