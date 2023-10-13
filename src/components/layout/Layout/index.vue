<template>
  <div style="width: 100%; height: 100%">
    <a-layout
      style="width: 100%; height: 100%"
      id="components-layout-demo-custom-trigger"
    >
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <MyMenu></MyMenu>
      </a-layout-sider>
      <a-layout>
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
        <a-layout-content class="layout-content">
          <MyTags class="myTags"></MyTags>
          <!--          <keep-alive :include="$store.getters.myTagsArray">-->
          <!--            <router-view-->
          <!--              v-if="-->
          <!--                $store.getters.myTagsArray.join(`,`).indexOf($route.name) != -1-->
          <!--              "-->
          <!--            />-->
          <!--          </keep-alive>-->
          <keep-alive>
            <router-view v-if="hasTagsName($route.name) && !$route.query.key" />
          </keep-alive>
          <router-view
            v-if="!hasTagsName($route.name) || $route.query.key"
            :key="$route.query.key"
          />
          <!--          <router-view v-if="$route.query.key" />-->
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
<style lang="less">
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
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
  margin-top: 55px;
  position: relative;

  .myTags {
    position: absolute;
    top: -40px;
    left: 10px;
    width: 100%;
  }
}
</style>
