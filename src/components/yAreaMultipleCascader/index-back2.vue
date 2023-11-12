<template>
  <div class="yAreaMultipleCascader">
    <!--    <el-select-->
    <!--      v-model="value2"-->
    <!--      multiple-->
    <!--      collapse-tags-->
    <!--      style="margin-left: 20px;"-->
    <!--      size="small"-->
    <!--      :popper-append-to-body="false"-->
    <!--      placeholder="请选择">-->
    <!--&lt;!&ndash;      <el-option&ndash;&gt;-->
    <!--&lt;!&ndash;        v-for="item in options"&ndash;&gt;-->
    <!--&lt;!&ndash;        :key="item.value"&ndash;&gt;-->
    <!--&lt;!&ndash;        :label="item.label"&ndash;&gt;-->
    <!--&lt;!&ndash;        :value="item.value">&ndash;&gt;-->
    <!--&lt;!&ndash;      </el-option>&ndash;&gt;-->
    <!--      <div cl></div>-->
    <!--    </el-select>-->

    <div class="yAreaMultipleCascader-select">
      <a-select mode="tags"
                showArrow
                :open="false"
                placeholder="Tags Mode"
                :getPopupContainer="triggerNode => triggerNode.parentNode"
                @dropdownVisibleChange="dropdownVisibleChange"

                @change="handleChange">
        <!--      <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">-->
        <!--        {{ (i + 9).toString(36) + i }}-->
        <!--      </a-select-option>-->

      </a-select>
    </div>

    <div @blur="blurClick" class="yAreaMultipleCascader-drop" v-if="dropShow">
      <a-menu style="width: 256px" mode="vertical" @click="handleClick">
        <a-menu-item key="1">
          <a-icon type="mail"/>
          Navigation One
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="calendar"/>
          Navigation Two
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="appstore"/><span>Navigation Three</span></span>
          <a-menu-item key="3">
            Option 3
          </a-menu-item>
          <a-menu-item key="4">
            Option 4
          </a-menu-item>
          <a-sub-menu key="sub1-2" title="Submenu">
            <a-menu-item key="5">
              Option 5
            </a-menu-item>
            <a-menu-item key="6">
              Option 6
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="setting"/><span>Navigation Four</span></span>
          <a-menu-item key="7">
            Option 7
          </a-menu-item>
          <a-menu-item key="8">
            Option 8
          </a-menu-item>
          <a-menu-item key="9">
            Option 9
          </a-menu-item>
          <a-menu-item key="10">
            Option 10
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>
<script>
  import {getCityTreeByPid} from '@/api/sys/area.js';
  import {getCascaderSelectedKeys} from "@/utils/cascaderUtils.js";

  export default {

    props: {
      tenantId: {
        type: String,
        default: function () {
          return null;
        }
      },
      value: {
        type: String,
        default: function () {
          return null;
        }
      },
      allowClear: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      multiple: {
        type: Boolean,
        default: function () {
          return true;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return "请选择城市";
        }
      },
      treeDefaultExpandAll: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
      replaceFields: {
        type: Object,
        default: function () {
          return {children: 'children', title: 'name', key: 'id', value: 'id'};
        }
      },

    },
    data() {
      return {
        treeData: [],
        selectedKeys: [],
        dropShow: false
      };
    },
    computed: {},
    async created() {
      this.init();
      if (this.value) {
        this.selectedKeys = getCascaderSelectedKeys(this.treeData, this.value);
        console.log("res.arr", this.selectedKeys)
      }
    }
    ,
    methods: {

      blurClick() {
        this.dropShow = false
      },
      dropdownVisibleChange(open) {
        this.dropShow = open
      },
      lazyLoad(node, resolve) {
        this.getData(node.data ? node.data.id : 0).then((res) => {
          let nodeList = res
          nodeList.forEach((item) => {
            item.leaf = item.level > 4;
            // item.checked = true;
            if (item.level > 1) {
              this.selectedKeys.push(item.id)
            }


          })
          // this.selectedKeys.push(node.data.id)
          resolve(nodeList);
        });

      },

      async init() {
        this.treeData = await this.getData(0);
      },
      async getData(pid) {
        let treeList = await getCityTreeByPid(pid);
        return treeList;
      },
      onChange(val) {
        console.log("onChange.this.val.", this.$refs.yAreaMultipleCascader.getCheckedNodes())
        console.log("onChange.this.selectedKeys.", this.selectedKeys)
        this.$emit('input', this.selectedKeys.join(","));
      },
      /**
       * level: 当前层级
       * data: 当前层级的数据
       */
      setDisable(level, data) {
        let _this = this;
        data.forEach((v) => {
          //此处判断可根据你后台返回的数据类型适当变换，原理就是将不符合条件的项给禁掉
          if (!v.children && v.level.value < level) {
            v.disabled = true;
          }
          if (v.children && v.level.value < level) {
            v.disabled = false;
          }
          if (!v.children && v.level.value == level) {
            v.disabled = false;
          }
          if (v.children) {
            _this.setDisable(level, v.children);
          }
        });
      },


    }
  };
</script>
<style lang="less" scoped>

  .yAreaMultipleCascader {
    position: relative;
    height: auto;

    .yAreaMultipleCascader-select {
      height: 100%;
      width: 100%;
    }

    .yAreaMultipleCascader-drop {
      position: absolute;
      /*bottom: -10px;*/
      left: 0;
      width: auto;
      z-index: 100;
    }
  }


  .ant-select-dropdown {
    display: none !important;
  }

  .ant-advanced-search-form {
    padding: 10px;

    /deep/ .ant-form-item {
      display: flex;

      .ant-form-item-label {
        width: 100px;
        white-space: nowrap; /* 防止文本换行 */
        overflow: hidden; /* 超出部分隐藏 */
        text-overflow: ellipsis; /* 显示省略符号 */
      }

      .ant-form-item-control-wrapper {
        flex: 1;

        .ant-calendar-picker {
          width: 100% !important;
        }
      }
    }
  }

  .y-tools {
    height: 100px;
    width: 100%;
    background: red;
  }

  .y-table {
    margin: 20px;
  }

</style>
