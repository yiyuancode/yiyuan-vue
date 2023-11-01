<template>
  <div style="width: 100%;">
    <el-cascader
      v-model="selectedKeys"
      :options="treeData"
      :props="{ multiple,children: 'children', label: 'name', value: 'id' }"
      size="small"
      :placeholder="placeholder"
      :show-all-levels="false"
      clearable
      @change="change"
    ></el-cascader>
  </div>
</template>
<script>
  import {getProductCategoryTreeListForPlat} from "@/api/ptm/productCategory.js";

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
          return "请选择平台分类";
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
      await this.getData();
      // this.selectedKeys = this.value
      if (this.value) {
        // 之后遍历，获取父节点
        let ids = this.value.split(",");
        ids.forEach((element) => {
          let selectSubsidiaryDepartment = [
            this.cascadeDisplay(this.treeData, element)
          ]
          ids.push(...selectSubsidiaryDepartment)
        })
      }
    }
    ,
    methods: {
      async getData() {
        let treeList = await getProductCategoryTreeListForPlat();
        this.setDisable(3, treeList)
        this.treeData = treeList;
        console.log("this.treeData", this.treeData)

      }
      ,
      change(value) {

        // let idArray = value.map((item) => {
        //   return item[item.length - 1]
        // })
        let ids = value.map(function (item) {
          return item[item.length - 1]
        }).join(",");
        this.$emit('input', ids);
        this.$emit('change', ids);
        console.log("change", value)
        console.log("change", ids)
      }
      ,
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
      }
      ,
      cascadeDisplay(object, value) {
        for (var key in object) {
          if (object[key].id == value) return [object[key].id]
          if (object[key].children && Object.keys(object[key].children).length > 0) {
            var temp = this.cascadeDisplay(object[key].children, value)
            if (temp) return [object[key].id, temp].flat()
          }
        }
      }
      ,

      /**
       * el-cascader递归获取父级id
       * @param  list 数据列表
       * @param  id 后端返回的id
       * propsCascader 是el-cascader props属性
       **/
      getParentsById(list, id) {
        for (let i in list) {
          if (list[i][this.propsCascader.value || 'value'] == id) {
            return [list[i][this.propsCascader.value || 'value']]
          }
          if (list[i].children) {
            let node = this.getParentsById(list[i].children, id)
            if (node !== undefined) {
              // 追加父节点
              node.unshift(list[i][this.propsCascader.value || 'value'])
              return node
            }
          }
        }
      }
      ,
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
