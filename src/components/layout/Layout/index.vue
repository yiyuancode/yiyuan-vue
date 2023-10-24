<template>
  <div class="layout">
    <div class="sider">
      <div class="logo" />
      <MyMenu></MyMenu>
    </div>
    <div class="content">
      <div class="headers">
        <MyAvatar></MyAvatar>
      </div>
      <div class="body">
        <MyTags class="myTags"></MyTags>
        <keep-alive>
          <router-view v-if="hasTagsName($route.name) && !$route.query.key" />
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
import { mapGetters } from 'vuex';

export default {
  components: { MyMenu, MyTags, MyAvatar },
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
  display: flex;

  .sider {
    width: 200px;
    height: 100%;
    overflow-y: auto;
    background: #032121;
  }

  .content {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background: #f0f2f5;

    .headers {
      height: 64px !important;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      background: #ffffff;
    }

    .body {
      flex: 1;
      width: 100%;
      padding: 20px;

      .myTags {
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
