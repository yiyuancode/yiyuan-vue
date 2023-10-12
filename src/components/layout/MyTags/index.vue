<template>
  <div style="width: 100%">
    <!--    <div :style="{ marginBottom: '16px' }">-->
    <!--      <a-button @click="add">-->
    <!--        ADD-->
    <!--      </a-button>-->
    <!--    </div>-->
    <a-tabs
      v-model="curTags.name"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @change="myTagsChange"
    >
      <a-tab-pane
        v-for="item in myTags"
        :key="item.name"
        :closable="item.closable"
      >
        <div slot="tab">
          <a-dropdown :trigger="['contextmenu']">
            <div class="tab">
              <a-icon
                :type="item.loading ? 'loading' : 'sync'"
                :class="[
                  'icon-sync',
                  { hide: !isTagsAlive(item.name)}
                ]"
                @click="refresh(item)"
              />
              <span v-if="isTagsAlive(item.name)">{{ item.meta.title }}</span>
              <span v-if="!isTagsAlive(item.name)" @click="changeClik(item)">{{
                item.meta.title
              }}</span>
              <a-icon class="icon-close" type="close" @click.stop="cloeClick(item)"/>
            </div>
            <a-menu slot="overlay" @click="(op) => tabMenuItemClick(op, item)">
              <!--              <a-menu-item key="1">-->
              <!--                <a-icon type="vertical-right"/>-->
              <!--                关闭左侧-->
              <!--              </a-menu-item>-->
              <!--              <a-menu-item key="2">-->
              <!--                <a-icon type="vertical-left"/>-->
              <!--                关闭右侧-->
              <!--              </a-menu-item>-->
              <a-menu-item key="cloeOtherClick">
                <a-icon type="close"/>
                关闭其他
              </a-menu-item>
              <a-menu-item key="refresh">
                <a-icon type="reload"/>
                刷新页面
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";

  export default {
    data() {
      const panes = [
        {title: 'Tab 1', content: 'Content of Tab 1', key: '1'},
        {title: 'Tab 2', content: 'Content of Tab 2', key: '2'}
      ];
      return {
        // myTagsActiveKey: this.$store.getters.myTags[0].name,
        panes,
        newTabIndex: 0
      };
    },
    computed: {
      ...mapGetters({
        myTags: "tags/myTags",
        isTagsAlive: "tags/isTagsAlive",
        curTags: "tags/curTags",
      }),
    },
    created() {
    },
    methods: {
      tabMenuItemClick({key}, item) {

        this[key](item);
      },
      cloeClick(item) {
        if (this.myTags.length > 1) {
          this.$store.dispatch("tags/del", item).then(() => {
            this.$router.push({name: this.curTags.name})
          })
        }

      },
      refresh(item) {
        this.$router.replace({name: item.name, query: {key: new Date().getTime()}})

      },
      changeClik(item) {
        this.$router.push({name: item.name})
      },
      cloeOtherClick(item) {
        this.$store.dispatch("tags/delOther", item)
      },

      onEdit() {

      },
      myTagsChange(targetKey) {

        this.$router.push({name: targetKey})
      }
    }
  };
</script>

<style scoped lang="less">
  .tab {
    margin: 0 -16px;
    padding: 0 16px;
    font-size: 14px;
    user-select: none;
    transition: all 0.2s;

    .title {
      display: inline-block;
      height: 100%;
    }

    .icon-close {
      font-size: 12px;
      margin-left: 6px;
      margin-right: -4px !important;
      color: @text-color-second;

      &:hover {
        color: @text-color;
      }
    }

    .icon-sync {
      margin-left: -4px;
      color: @primary-4;
      transition: all 0.3s ease-in-out;

      &:hover {
        color: @primary-color;
      }

      font-size: 14px;

      &.hide {
        font-size: 0;
      }
    }
  }

  .tabs-head {
    margin: 0 auto;

    &.head.fixed {
      width: 1400px;
    }
  }

  .tabs-container {
    margin: -16px auto 8px;
    transition: top, left 0.2s;

    .header-lock {
      font-size: 18px;
      cursor: pointer;
      color: @primary-3;

      &:hover {
        color: @primary-color;
      }
    }

    &.affixed {
      margin: 0 auto;
      top: 0px;
      padding: 8px 24px 0;
      position: fixed;
      height: 48px;
      z-index: 1;
      background-color: @layout-body-background;

      &.side,
      &.mix {
        /*right: 0;*/
        /*left: 256px;*/

        // z-index: 1;
        &.collapsed {
          left: 80px;
        }
      }

      &.head {
        width: inherit;
        padding: 8px 0 0;

        &.fluid {
          left: 0;
          right: 0;
          padding: 8px 24px 0;
        }
      }

      &.fixed-header {
        top: 64px;
      }
    }
  }

  .virtual-tabs {
    height: 48px;
  }
</style>
