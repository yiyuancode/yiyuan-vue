<template>
  <div style="width: 100%; height: 100%">
    <a-layout
      style="width: 100%; height: 100% !important"
      id="components-layout-demo-custom-trigger"
    >
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <MyMenu></MyMenu>
      </a-layout-sider>
      <a-layout style="width: 100%; height: 100% !important">
        <a-layout-header
          style="
            background: #fff;
            padding: 0;
            display: flex;
            justify-content: space-between;
          "
        >
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <MyAvatar></MyAvatar>
        </a-layout-header>
        <a-layout-content
          class="layout-content"
          style="width: 100%; height: 100% !important"
        >
          <MyTags class="myTags"></MyTags>
          <keep-alive>
            <router-view v-if="hasTagsName($route.name) && !$route.query.key" />
          </keep-alive>
          <router-view
            v-if="!hasTagsName($route.name) || $route.query.key"
            :key="$route.query.key"
          />
        </a-layout-content>
      </a-layout>
    </a-layout>
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
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.layout-content {
  min-height: 280px;
  margin-top: 55px;
  position: relative;
  flex: 1;
  padding: 20px;
  background: #fff;

  .myTags {
    position: absolute;
    top: -40px;
    left: 10px;
    width: 100%;
  }
}

.ant-layout::-webkit-scrollbar {
  background-color: #e8eaec;
  width: 0 !important;
}
</style>
