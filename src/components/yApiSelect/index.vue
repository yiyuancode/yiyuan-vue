<template>
  <div style="width: 100%;">

    <a-select
      :mode="mode"
      v-model="selectedKeys"
              :placeholder="placeholder"
              :allowClear="allowClear"
              @change="change">
      <a-select-option v-for="(item) in options" :value="item[apiConfig.objMap.value]" :key="item[apiConfig.objMap.value]">
        {{ item[apiConfig.objMap.label] }}
      </a-select-option>
    </a-select>

  </div>
</template>
<script>

  export default {
    props: {

      mode: {
        type: String,
        default: function () {
          //mode = "multiple"多选
          return 'default';
        }
      },
      value: {
        type: String,
        default: function () {
          return null;
        }
      },
      apiConfig: {
        type: Object,
        default: () => {
          return {
            apiFun: () => {
            },
            parms: {},
            objMap: {value: 'id', label: 'name'}
          }
        }
      },
      allowClear: {
        type: Boolean,
        default: function () {
          return true;
        }
      },
      placeholder: {
        type: String,
        default: function () {
          return "请选择店铺";
        }
      },


    },
    data() {
      return {
        selectedKeys: undefined,
        options: [],
      };
    },
    // computed: {
    //   valueIdVal:()=>{
    //     console.log("valueIdVal.valueIdVal",this.value)
    //   }
    // },
    watch: {
      value: async function (newVal) {
        if (newVal) {
          console.log("valueIdVal.valueIdVal", newVal)
          this.options = await this.apiConfig.apiFun({...this.apiConfig.parms, key: 234});
          this.selectedKeys =  this.mode=="multiple" ? this.value.split(",") : this.value
          console.log("this.options", this.options)
        }
      },

      apiConfig:{
        // 执行方法 深度 监听如果apiConfig 的parm有更改也会再次执行
        async handler(newVal,oldVal) {
          if (newVal) {
            
            console.log("valueIdVal.valueIdVal", newVal)
            this.options = await this.apiConfig.apiFun({...this.apiConfig.parms, key: 234});
            this.selectedKeys =  this.mode=="multiple" ? this.value.split(",") : this.value
            console.log("this.options", this.options)
          }
        },
        deep: true, // 深度监听
        immediate: true  // 第一次改变就执行
      }
    },
    //用watch 代替creatd  不用写key了
    // async created() {
    //   // await this.getData();
    //   // if (this.value) {
    //   //   this.selectedKeys = this.value
    //   // }
    //   //
    // },
    methods: {
      async getData() {
        this.options = await this.apiConfig.apiFun({...this.apiConfig.parms, key: 234});
        console.log("this.options", this.options)
      },
      change(value, label, extra) {
        this.$emit('input',this.mode=="multiple"? value.join(","):value);
        this.$emit('change', this.mode=="multiple"? value.join(","):value);
      }
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
