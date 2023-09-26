<template>
  <div style="width: 100%">
    <a-menu
      :selectedKeys="$store.getters.myMenuSelectedKeys"
      :default-open-keys="$store.getters.myMenuOpenKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @select="onMenuSelect"
      @openChange="onMenuOpenChange"
    >
      <template v-for="item in dynamicRoutes">
        <a-menu-item v-if="!item.children" :key="item.name">
          <a-icon type="pie-chart" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.name" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { dynamicRoutes } from '@/router/index.js';
import { Menu } from 'ant-design-vue';

const SubMenu = {
  template: `
      <a-sub-menu :key="menuInfo.name" v-bind="$props" v-on="$listeners">
        <span slot="title">
          <a-icon type="mail"/><span>{{ menuInfo.meta.title }}</span>
        </span>
        <template v-for="item in menuInfo.children">
          <a-menu-item v-if="!item.children" :key="item.name">
            <a-icon type="pie-chart"/>
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
          <sub-menu v-else :menu-info="item" :key="item.name"/>
        </template>
      </a-sub-menu>
    `,
  name: 'SubMenu',
  // must add isSubMenu: true
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    // Cannot overlap with properties within Menu.SubMenu.props
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
};
export default {
  components: {
    'sub-menu': SubMenu
  },
  data() {
    return {
      collapsed: false,
      dynamicRoutes
      // list: [
      //   {
      //     key: '1',
      //     title: '权限管理',
      //   },
      //   {
      //     key: '2',
      //     title: '系统管理',
      //     children: [
      //       {
      //         key: '2-1',
      //         title: '用户管理',
      //         // children: [{key: '2.1.1', title: 'Option 2.1.1'}],
      //       },
      //     ],
      //   },
      //   {
      //     key: '3',
      //     title: '文件管理',
      //     children: [
      //       {
      //         key: '3.1',
      //         title: 'Navigation 3',
      //         // children: [{key: '2.1.1', title: 'Option 2.1.1'}],
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    onMenuSelect({ item, key, selectedKeys }) {
      console.log('onMenuSelect.key', key);
      console.log('onMenuSelect.item', item);
      console.log('onMenuSelect.selectedKeys', selectedKeys);
      // let route = dynamicRoutesMap[key];
      this.$store.commit('addMyTags3', key);
      this.$router.push({ name: key });
    },
    onMenuOpenChange(openKeys) {
      console.log('onMenuSelect.openKeys', openKeys);
      this.$store.commit('myMenuOpenKeys', openKeys);
    }
  }
};
</script>
