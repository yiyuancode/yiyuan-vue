<template>
  <div style="width: 100%;">
    <el-cascader
      ref="yAreaMultipleCascader"
      v-model="selectedKeys"
      :props="{ multiple, checkStrictly:true, children: 'children', label: 'name', value: 'id',lazy:true, lazyLoad }"
      size="small"
      :placeholder="placeholder"
      :show-all-levels="false"
      @change="onChange"
      clearable
    ></el-cascader>

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
        selectedKeys: []
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
       lazyLoad(node, resolve) {
          this.getData(node.data ? node.data.id : 0).then((res)=>{
            let nodeList =res
            nodeList.forEach((item) => {
              item.leaf = item.level > 4;
              // item.checked = true;
              if(item.level>1){
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
