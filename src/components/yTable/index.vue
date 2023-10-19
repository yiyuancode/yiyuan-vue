<template>
  <a-card style="width: 100%;margin-top: 20px;">
    <div class="y-tools">
      <div class="y-tools-title">{{$route.meta.title}}</div>
      <div class="y-tools-action">
        <a-button type="primary" icon="plus">
          新建
        </a-button>
        <a-divider type="vertical"/>
        <a-tooltip placement="top" title="刷新">
          <a-icon :style="iconStyle" type="reload" @click="reload"/>
        </a-tooltip>
        <a-divider type="vertical"/>
        <a-tooltip placement="top" title="密度">


          <a-dropdown :trigger="['click']">
            <a-icon :style="iconStyle" type="column-height" @click="e => e.preventDefault()"/>
            <a-menu :selectedKeys="selectedKeys" slot="overlay"
                    @click="({key})=>{size=key;selectedKeys=[key]}">
              <a-menu-item key="default">
                默认
              </a-menu-item>
              <a-menu-item key="middle">
                中等
              </a-menu-item>
              <a-menu-item key="small">
                紧凑
              </a-menu-item>
            </a-menu>
          </a-dropdown>

        </a-tooltip>
        <a-divider type="vertical"/>
        <a-tooltip placement="top" title="列设置">

          <a-popover placement="bottomLeft" trigger="click">
            <template slot="content">
              <!--              <a-checkbox-group v-model="columnsCheckboxValue">-->
              <div class="setting-content" v-if="fixedLeftColumns.length!=0">
                固定在左侧
                <draggable v-model="fixedLeftColumns" chosenClass="chosen" forceFallback="true"
                           group="people"
                           animation="1000" @start="onStart" @end="onEnd">
                  <transition-group>
                    <div class="item" v-for="(item) in fixedLeftColumns" :key="item.key">
                      <a-icon type="more" :style="{color:'#8E989D'}"/>
                      <div class="item-right">
                        <a-checkbox :checked="item['checked']" @change="(e)=>checkedChneg(e,item)">
                          {{item.title}}
                        </a-checkbox>
                        <div class="item-right-icon">
                          <a-tooltip placement="top" title="取消固定">
                            <a-icon type="vertical-align-middle" @click="rmLeftClick(item)"/>
                          </a-tooltip>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </draggable>
              </div>
              <div class="setting-content" v-if="noFixedColumns.length!=0">
                不固定
                <draggable v-model="noFixedColumns" chosenClass="chosen" forceFallback="true"
                           group="people"
                           animation="1000" @start="onStart" @end="onEnd">
                  <transition-group>
                    <div class="item" v-for="(item) in noFixedColumns" :key="item.key">
                      <a-icon type="more" :style="{color:'#8E989D'}"/>
                      <div class="item-right">
                        <a-checkbox :checked="item['checked']" @change="(e)=>checkedChneg(e,item)">
                          {{item.title}}
                        </a-checkbox>
                        <div class="item-right-icon">
                          <a-tooltip placement="top" title="固定在左侧">
                            <a-icon type="vertical-align-top" @click="addLeftClick(item)"/>
                          </a-tooltip>
                          <span style="margin: 0 2px;"></span>
                          <a-tooltip placement="top" title="固定在右侧">
                            <a-icon type="vertical-align-bottom" @click="addRightClick(item)"/>
                          </a-tooltip>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </draggable>
              </div>
              <div class="setting-content" v-if="fixedRightColumns.length!=0">
                固定在右侧
                <draggable v-model="fixedRightColumns" chosenClass="chosen" forceFallback="true"
                           group="people"
                           animation="1000" @start="onStart" @end="onEnd">
                  <transition-group>
                    <div class="item" v-for="(item) in fixedRightColumns" :key="item.key">
                      <a-icon type="more" :style="{color:'#8E989D'}"/>
                      <div class="item-right">
                        <a-checkbox :checked="item['checked']" @change="(e)=>checkedChneg(e,item)">
                          {{item.title}}
                        </a-checkbox>
                        <div class="item-right-icon">
                          <a-tooltip placement="top" title="取消固定">
                            <a-icon type="vertical-align-middle" @click="rmRightClick(item)"/>
                          </a-tooltip>
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </draggable>
              </div>
              <!--              </a-checkbox-group>-->
            </template>
            <template slot="title">
              <div class="setting-title">
                <div class="setting-title-name">
                  <!--                  indeterminate 为false checked显示勾选和不勾选得状态，indeterminate=true为正在勾选得状态-->
                  <a-checkbox :indeterminate="uIndeterminate" :checked="uCheckAlll"
                              @change="onCheckAllChange">
                  </a-checkbox>
                  列设置
                </div>
                <a class="setting-title-btn" @click="resetColumnsSetting">重置</a>
              </div>
            </template>
            <a-icon :style="iconStyle" type="setting"/>
          </a-popover>


        </a-tooltip>

      </div>
    </div>
    <div class="y-table">
      <a-table
        :rowKey="rowKey"
        :columns="uColumns"
        :data-source="records"
        :pagination="uPagination"
        :row-selection="rowSelection"
        :scroll="{ x: 100 }"
        :loading="loading"
        :size="uTableSize"
        @change="change"
      >

        <template :slot="item.scopedSlots.customRender" slot-scope="text, record"
                  v-for="(item) in uScopedSlots">
          <slot :name="`${item.scopedSlots.customRender}`" v-bind="{text,record}"></slot>
        </template>


        <a slot="action">
        </a>
      </a-table>
    </div>
  </a-card>
</template>
<script>
  import _ from 'lodash';

  export default {
    props: {
      rowKey: {
        type: String,
        default: function () {
          return "";
        }
      },
      props: {
        type: Array,
        default: function () {
          return [];
        }
      },
      columns: {
        type: Array,
        default: function () {
          return [];
        }
      },
      records: {
        type: Array,
        default: function () {
          return [];
        }
      },
      pagination: {
        type: Object,
        default: function () {
          return {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            pageSizeOptions: ['10', '20', '30', '40'],
            showSizeChanger: true,
            showTotal: total => `共 ${total} 条`, // 显示总条数和当前数据范围
          };
        }
      },
      rowSelection: {
        type: Object,
        default: function () {
          return {};
        }
      },
      loading: {
        type: Boolean,
        default: function () {
          return false;
        }
      },
    },
    data() {
      return {
        dPagination: {
          current: 1,
          pageSize: 10,
          total: 0,
          pageSizeOptions: ['10', '20', '30', '40'],
          showSizeChanger: true,
          showTotal: total => `共 ${total} 条`, // 显示总条数和当前数据范围
        },
        dSelectedRowKeys: [],
        iconStyle: {
          fontSize: "16px"
        },
        drag: false,
        columnsCheckboxValue: [],
        indeterminate: false,
        selectedKeys: ['default'],
        sourceColumns: [],
        noFixedColumns: [],
        fixedRightColumns: [],
        fixedLeftColumns: [],
      };
    },
    computed: {
      uTableSize() {
        return this.selectedKeys[0]
      },
      uScopedSlots() {
        return this.columns.filter((item) => {
          return item.scopedSlots;
        });
      },
      uColumns() {
        console.log("this.columnsCheckboxValue", this.columnsCheckboxValue)
        let noFixedColumns = this.noFixedColumns.filter((item) => {
          return item.checked;
        });
        let fixedLeftColumns = this.fixedLeftColumns.filter((item) => {
          if (this.fixedLeftColumns.some(item2 => {
            return item2.key == item.key
          })) {
            item.fixed = "left"
            console.log("fixedLeftColumns-1", item)
          }
          return item.checked;
        });
        let fixedRightColumns = this.fixedRightColumns.filter((item) => {
          if (this.fixedRightColumns.some(item2 => {
            return item2.key == item.key
          })) {
            item.fixed = "right"
            console.log("fixedRightColumns-2", item)
          }

          return item.checked;
        });
        return [...fixedLeftColumns, ...noFixedColumns, ...fixedRightColumns]
      },
      uPagination() {
        return {
          current: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
          total: this.pagination.total,
          pageSizeOptions: this.pagination.pageSizeOptions,
          showSizeChanger: this.pagination.showSizeChanger,
          showTotal: this.pagination.showTotal, // 显示总条数和当前数据范围
        };
      },
      uCheckAlll() {
        return !(this.noFixedColumns.some(item => !item.checked) || this.fixedLeftColumns.some(item => !item.checked) || this.fixedRightColumns.some(item => !item.checked));
      },
      uIndeterminate() {
        if ((this.noFixedColumns.some(item => !item.checked) || this.fixedLeftColumns.some(item => !item.checked) || this.fixedRightColumns.some(item => !item.checked)) && (this.noFixedColumns.some(item => item.checked) || this.fixedLeftColumns.some(item => item.checked) || this.fixedRightColumns.some(item => item.checked))) {
          return true;
        }
        return false;

      }

    },
    created() {
      this.resetColumnsSetting();
    },
    methods: {
      change(pagination) {
        console.log("change.pagination", pagination)
        //{...pagination, pageNum: pagination.current}
        this.$emit("change", {
          pageNum: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          pageSizeOptions: pagination.pageSizeOptions,
          showSizeChanger: pagination.showSizeChanger,
          showTotal: pagination.showTotal, // 显示总条数和当前数据范围
        });
      },
      reload() {
        this.change(this.pagination)
      },
      //开始拖拽事件
      onStart() {
        this.drag = true;
      },
      //拖拽结束事件
      onEnd() {
        this.drag = false;
      },
      onCheckAllChange(e) {
        if (e.target.checked) {
          this.columns.forEach((item) => {
            this.columnsCheckboxValue.push(item.key)
          })
        } else {
          this.columnsCheckboxValue = []
        }
      },
      resetColumnsSetting() {
        this.sourceColumns = _.cloneDeep(this.columns);
        this.sourceColumns.forEach((item) => {
          // item.checked = true;
          this.$set(item, 'checked', true);
        })
        this.fixedRightColumns = this.sourceColumns.filter((item) => {
          return item.fixed && item.fixed == 'right';
        });
        this.fixedLeftColumns = this.sourceColumns.filter((item) => {
          return item.fixed && item.fixed == 'left';
        });
        this.noFixedColumns = this.sourceColumns.filter((item) => {
          return !item.fixed;
        });
        // this.columnsCheckboxValue = this.sourceColumns.map(obj => obj.key)
      },
      addRightClick(item) {
        if (!this.fixedRightColumns.some(item2 => item.key == item2.key)) {
          this.fixedRightColumns.unshift(item);
          this.noFixedColumns = this.noFixedColumns.filter(item3 => item3.key != item.key)
        }
      },
      addLeftClick(item) {
        if (!this.fixedLeftColumns.some(item2 => item.key == item2.key)) {
          this.fixedLeftColumns.push(item);
          this.noFixedColumns = this.noFixedColumns.filter(item3 => item3.key != item.key)
        }
      },
      rmRightClick(item) {
        this.fixedRightColumns = this.fixedRightColumns.filter(item3 => {
          if (item3.key == item.key) {
            this.$set(item3, "fixed", false);
          }
          return item3.key != item.key
        })
        this.noFixedColumns.push(item);
      },
      rmLeftClick(item) {
        this.fixedLeftColumns = this.fixedLeftColumns.filter(item3 => {
          if (item3.key == item.key) {
            this.$set(item3, "fixed", false);
          }
          return item3.key != item.key
        })
        console.log("rmLeftClick.fixedLeftColumns", this.fixedLeftColumns)
        this.noFixedColumns.unshift(item);
      },
      checkedChneg(e, item) {
        this.$set(item, 'checked', e.target.checked);
      }
    }
  };
</script>
<style lang="less">
  .y-tools {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .y-tools-title {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: rgba(0, 0, 0, .85);
      font-weight: 500;
      font-size: 16px;
      flex: 1;
    }

    .y-tools-action {
      width: auto;
      display: flex;
      align-items: center;
    }
  }

  .y-table {
    margin: 20px;
  }

  /*被拖拽对象的样式*/
  .item {
    padding: 6px;
    background-color: #fdfdfd;
    /*border: solid 1px #eee;*/
    margin-bottom: 10px;
    cursor: move;
    display: flex;
    align-items: center;

    .item-right {
      margin-left: 5px;
      display: flex;
      flex: 1;
      justify-content: space-between;

      .item-right-icon {
        display: none;
      }

    }
  }

  .item:hover .item-right-icon {
    /*display: inline-block;*/
    width: auto;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: end;
  }

  /*选中样式*/
  .chosen {
    border: solid 1px #3089dc !important;
  }

  .setting-content {
    max-height: 400px;
    overflow-y: auto;
  }

  .setting-content::-webkit-scrollbar {
    background-color: #e8eaec;
    width: 0 !important;
  }

  .setting-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .setting-title-name {

  }

</style>
