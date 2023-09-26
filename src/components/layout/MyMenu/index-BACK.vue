<template>
  <div class="MyMenu">
    <!-- {{item.childList}} -->

    <el-submenu
      :index="item.name + ''"
      v-if="item.children && item.children.length != 0"
      popper-append-to-body
    >
      <!-- <el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item> -->
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ item.mate.title }}</span>
      </template>
      <MyMenu
        :item="item2"
        v-for="(item2, index2) in item.children"
        :key="index2"
      ></MyMenu>
    </el-submenu>

    <el-menu-item :index="item.name + ''" v-else @click="itemClick">
      <!-- <i class="el-icon-menu"></i> -->
      <span slot="title">{{ item.mate.title }}</span>
    </el-menu-item>

    <!-- <el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item> -->
  </div>
</template>

<script>
export default {
  name: 'MyMenu',
  props: {
    // tableData: [],
    item: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    return {
      test: [
        {
          name: 123
        },
        {
          name: 123
        }
      ]
    };
  },
  methods: {
    btnClick() {
      this.$emit('MyTableChange');
    },
    itemClick() {
      let $this = this;
      // console.log('item', item)
      this.$store.commit('addMyTags', $this.item);
    }
  }
};
</script>

<style lang="less" scoped>
.MyMenu {
  height: 100%;
  width: 100%;
}
</style>
