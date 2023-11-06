<template>
  <div>
    <y-search
      :columns="table.columns"
      :loading="table.loading"
      :scopedSlots="['tenantId','tempId']"
      @search="search"
    >
      <a-form-model-item slot="tenantId" slot-scope="{ form }" label="商户">
        <y-shop-select v-model="form.tenantId"/>
      </a-form-model-item>
      <a-form-model-item slot="tempId" slot-scope="{ form }" label="运费模板">
        <y-freight-temp-select v-model="form.tempId"/>
      </a-form-model-item>
    </y-search>

    <y-table
      :columns="table.columns"
      :loading="table.loading"
      :pagination="table.pagination"
      :records="table.records"
      :row-selection="table.rowSelection"
      @change="tableChange"
      rowKey="id"
    >
      <div class="y-flex" slot="operations">
        <a-button type="primary" icon="plus" @click="onAdd"> 新建</a-button>
        <a-divider type="vertical"/>
      </div>
      <span slot="tenantId" slot-scope="{ text, record }">
        <y-shop-select v-model="record.tenantId" isSpan></y-shop-select>
      </span>
      <span slot="packageType" slot-scope="{ text, record }">
        <y-enum-span v-model="record.packageType"></y-enum-span>
      </span>
      <span slot="chargeType" slot-scope="{ text, record }">
        <y-enum-span v-model="record.chargeType"></y-enum-span>
      </span>
      <span slot="isShow" slot-scope="{ text, record }">
        <y-boolean-span v-model="record.isShow"></y-boolean-span>
      </span>
      <span slot="isShow" slot-scope="{ text, record }">
        <y-boolean-span v-model="record.isShow"></y-boolean-span>
      </span>
      <div class="y-flex" slot="action" slot-scope="{ text, record }">
        <a-button icon="edit" @click="onEdit(record)"></a-button>
        <a-divider type="vertical"/>
        <a-popconfirm
          :title="'确定删除名称为【' + record.name + '】的分类'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onDelete(record)"
        >
          <a-button icon="delete" type="danger"></a-button>
        </a-popconfirm>
      </div>
    </y-table>

    <edit :columns="table.columns" :editId="editId" :key="editId" :editConfigProps="editConfigProps"
          @ok="getData">
    </edit>
  </div>
</template>
<script>
  import {columns} from './pageConfig.js';
  import {
    deleteFreightTemp as deletePost,
    getFreightTempPageList as pageGet
  } from '@/api/ftm/freightTemp.js';
  import edit from './edit.vue';

  export default {
    components: {edit},
    data() {
      return {
        searchForm: {},
        c: ["1", "58"],
        table: {
          columns,
          records: [],
          loading: false,
          pagination: {
            pageNum: 1,
            pageSize: 10,
            total: 0,
            pageSizeOptions: ['10', '20', '30', '40'],
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条` // 显示总条数和当前数据范围
          },
          rowSelection: {
            selectedRowKeys: [],
            onChange: this.tableSelectedRowKeys
          }
        },
        editConfigProps: {
          visible: false,
          title: "物流模板",
          columns
        },
        editId: null
      };
    },
    created() {
      this.getData();
    },
    methods: {
      imgsChange(imgs) {
        console.log("imgsChange", imgs)
      },
      tenantIdChange(tenantId) {
        console.log("tenantIdChange", tenantId)
      },
      search(form) {
        this.searchForm = form;
        this.getData();
      },
      tableSelectedRowKeys(selectedRowKeys) {
        console.log('tableSelectedRowKeys', selectedRowKeys);
        this.table.rowSelection.selectedRowKeys = selectedRowKeys;
      },
      tableChange(pagination, log) {
        this.table.pagination = pagination;
        this.getData();
      },
      async getData() {
        this.table.loading = true;
        let {pageNum, pageSize} = this.table.pagination;
        let {records, total, current} = await pageGet({
          pageNum: pageNum,
          pageSize: pageSize,
          ...this.searchForm
        });
        this.table.records = records;
        this.table.pagination.total = total;
        this.table.pagination.current = current;
        this.table.loading = false;
      },
      async onRowChange(record) {
        // await editActivitiy(record, record.id);
        await this.getData();
      },
      onAdd() {
        this.editId = null;
        this.editConfigProps.visible = true;
      },
      async onDelete(record) {
        await deletePost(record.id)
        await this.getData();
      },
      onEdit(record) {
        this.editId = record.id;
        this.editConfigProps.visible = true;
      }
    }
  };
</script>
