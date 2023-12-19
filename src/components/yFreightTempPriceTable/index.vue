<template>
  <div style="width: 100%">
    <div class="y-tools">
      <div class="y-tools-action">
        <a-button type="primary" icon="check-circle" @click="onSubmit"
          >确定</a-button
        >
      </div>
    </div>

    <div class="y-tools">
      <div class="y-tools-title">指定包邮</div>
      <div class="y-tools-action">
        <a-button type="primary" icon="plus" @click="onAddBaoYou"
          >添加</a-button
        >
      </div>
    </div>
    <div class="y-table">
      <a-table
        rowKey="key"
        :columns="columnsBaoYou"
        :data-source="recordsBaoYou"
        :pagination="false"
        size="small"
      >
        <div slot="sysAreaIds" slot-scope="text, record">
          <!--          <span v-if="record.isDefault">默认全国 (开启指定区域不配送时无效)</span>-->
          <y-area-multiple-select v-model="record.sysAreaIds" />
        </div>

        <div slot="fullPackageNum" slot-scope="text, record">
          <a-input-number
            v-model="record.fullPackageNum"
            :min="0"
            allow-clear
          />
        </div>
        <div slot="fullPackagePrice" slot-scope="text, record">
          <a-input-number
            v-model="record.fullPackagePrice"
            :min="0.0"
            :precision="2"
            allow-clear
          />
        </div>
        <a slot="action" slot-scope="text, record">
          <a-button
            icon="delete"
            type="danger"
            @click="onDelBaoYou(record)"
          ></a-button>
        </a>
      </a-table>
    </div>
    <div class="y-tools">
      <div class="y-tools-title">指定不包邮</div>
      <div class="y-tools-action">
        <a-button type="primary" icon="plus" @click="onAdd">添加</a-button>
      </div>
    </div>
    <div class="y-table">
      <a-table
        rowKey="key"
        :columns="columns"
        :data-source="records"
        :pagination="false"
        size="small"
      >
        <div slot="sysAreaIds" slot-scope="text, record">
          <span v-if="record.isDefault">默认全国</span>
          <y-area-multiple-select v-else v-model="record.sysAreaIds" />
        </div>
        <div slot="firstNum" slot-scope="text, record">
          <a-input-number v-model="record.firstNum" :min="0" allow-clear />
        </div>
        <div slot="firstPrice" slot-scope="text, record">
          <a-input-number
            v-model="record.firstPrice"
            :min="0.0"
            :precision="2"
            allow-clear
          />
        </div>
        <div slot="nextNum" slot-scope="text, record">
          <a-input-number v-model="record.nextNum" :min="0" allow-clear />
        </div>
        <div slot="nextPrice" slot-scope="text, record">
          <a-input-number
            v-model="record.nextPrice"
            :min="0.0"
            :precision="2"
            allow-clear
          />
        </div>
        <div slot="fullPackageNum" slot-scope="text, record">
          <a-input-number
            v-model="record.fullPackageNum"
            :min="0"
            allow-clear
          />
        </div>
        <div slot="fullPackagePrice" slot-scope="text, record">
          <a-input-number
            v-model="record.fullPackagePrice"
            :min="0.0"
            :precision="2"
            allow-clear
          />
        </div>
        <a slot="action" slot-scope="text, record">
          <a-button
            icon="delete"
            type="danger"
            @click="onDel(record)"
          ></a-button>
        </a>
      </a-table>
    </div>
  </div>
</template>
<script>
import { columns } from './pageConfig.js';
import { columns as columnsBaoYou } from './pageConfigBaoYou.js';

export default {
  props: ['value'],
  data() {
    return {
      columns,
      records: [
        {
          id: this.getUuid(),
          isDefault: true
        }
      ],
      columnsBaoYou,
      recordsBaoYou: []
    };
  },
  created() {
    if (this.value) {
      this.recordsBaoYou = this.value.filter((item) => {
        return item.isPackage;
      });
      this.records = this.value.filter((item) => {
        return !item.isPackage;
      });
    }
  },
  methods: {
    onAddBaoYou() {
      this.recordsBaoYou.push({
        key: this.getUuid(),
        isPackage: true
      });
    },
    onDelBaoYou(record) {
      this.recordsBaoYou = this.recordsBaoYou.filter((item) => {
        return item.key != record.key;
      });
    },
    onAdd() {
      this.records.push({
        id: this.getUuid(),
        isPackage: false
      });
    },
    onDel(record) {
      this.records = this.records.filter((item) => {
        return item.key != record.key;
      });
    },
    onSubmit() {
      console.log('onSubmit', [...this.records, ...this.recordsBaoYou]);
      this.$emit('input', [...this.records, ...this.recordsBaoYou]);
    },
    getUuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.y-tools {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .y-tools-title {
    color: rgba(0, 0, 0, 0.85);
    font-size: 15px;
    width: 120px;
  }

  .y-tools-action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.y-table {
  width: 100%;
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
  justify-content: flex-end;
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

/*.ant-table-tbody > tr > td {*/
/*   padding: 0px !important;*/
/* }*/

/*.ant-table-tbody > tr > th {*/
/*  padding: 0px !important;*/
/*}*/

/*/deep/ .ant-table-thead > tr > th {*/
/*  padding: 12px 15px !important;*/
/*  !*line-height: 0px!important;*!*/
/*}*/

/*/deep/ .ant-table-tbody > tr > td {*/
/*  padding: 12px 15px !important;*/

/*}*/
</style>
