<template>
  <div style="width: 100%">
    <a-menu
      :selectedKeys="selectMenuKey"
      :default-open-keys="openMenuKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
      @select="onMenuSelect"
      @openChange="onMenuOpenChange"
    >
      <template v-for="item in dynamicRoutes">
        <a-menu-item v-if="!item.children" :key="item.name">
          <a-icon type="pie-chart"/>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.name"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
  import {dynamicRoutes} from '@/router/index.js';
  import {Menu} from 'ant-design-vue';
  import {mapGetters} from "vuex";

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
      };
    },
    computed: {
      ...mapGetters({
        hasTagsName: "tags/hasTagsName",
        openMenuKeys: "tags/openMenuKeys",
        selectMenuKey: "tags/selectMenuKey"
      }),
    },
    methods: {
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
      },
      onMenuSelect({item, key}) {
        console.log("item", item)

        if (this.hasTagsName(key)) {
          this.$router.push({name: key})
        } else {
          this.$router.push({name: key, query: {key: new Date().getTime()}})
        }
      },
      onMenuOpenChange(openKeys) {
        this.$store.commit('tags/openMenuKeys', openKeys);
      }
    }
  };
</script>
