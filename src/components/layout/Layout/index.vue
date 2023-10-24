<template>
  <div class="layout">
    <div class="sider">
      <div class="logo"/>
      <MyMenu></MyMenu>
    </div>
    <div class="content">
      <div class="header">
        <MyAvatar></MyAvatar>
      </div>
      <div class="body">
        <MyTags class="myTags"></MyTags>
        <keep-alive>
          <router-view v-if="hasTagsName($route.name) && !$route.query.key"/>
        </keep-alive>
        <router-view
          v-if="!hasTagsName($route.name) || $route.query.key"
          :key="$route.query.key"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import MyMenu from '@/components/layout/MyMenu';
  import MyTags from '@/components/layout/MyTags/index.vue';
  import MyAvatar from '@/components/layout/MyAvatar/index.vue';
  import {mapGetters} from 'vuex';

  export default {
    components: {MyMenu, MyTags, MyAvatar},
    computed: {
      ...mapGetters({
        hasTagsName: 'tags/hasTagsName'
      })
    },
    data() {
      return {
        collapsed: false
      };
    }
  };
</script>

<style lang="less" scoped>
  .layout {
    height: 100%;
    width: 100%;
    /*background: red;*/
    display: flex;

    .sider {
      width: 200px;
      height: 100%;
      /*background: #1f1f1f;*/
      overflow-y: auto;
      background: #032121;
    }

    .content {
      flex: 1;
      height: 100%;

      /*background: #1890ff;*/
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      background: #F0F2F5;

      .header {
        height: 64px !important;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: #FFFFFF;
        /*background: red;*/
      }

      .body {
        flex: 1;
        width: 100%;
        margin-top: 32px !important;
        position: relative;
        padding: 20px;

        .myTags {
          position: absolute;
          top: -20px;
          left: 12px;
          width: 100%;
        }
      }
    }
  }

  .sider::-webkit-scrollbar {
    background-color: #e8eaec;
    width: 0 !important;
  }

  .sider::-webkit-scrollbar {
    background-color: #e8eaec;
    width: 0 !important;
  }
</style>
