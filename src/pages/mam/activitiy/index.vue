<template>
  <div>
    <y-search
      :columns="table.columns"
      :scopedSlots="['username', 'phone', 'sex']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="username" slot-scope="{ form }" label="姓名">
        <a-input v-model="form.username" allowClear placeholder="请输入姓名"/>
      </a-form-model-item>
      <a-form-model-item slot="phone" slot-scope="{ form }" label="手机">
        <a-input v-model="form.phone" allowClear placeholder="请输入手机"/>
      </a-form-model-item>
      <a-form-model-item slot="sex" slot-scope="{ form }" label="商品分类">
        <!--        <y-product-category-tree-select v-model="form.category"></y-product-category-tree-select>-->

        <!--        <y-product-category-tree-select v-model="form.category"-->
        <!--                                        :tenantId="233"></y-product-category-tree-select>-->
        <!--        <y-area-select v-model="form.area"></y-area-select>-->
        <!--        <y-shop-select v-model="form.tenantId" @change="tenantIdChange"></y-shop-select>-->
        <y-plat-category-select></y-plat-category-select>

        <y-shop-select v-model="form.tenantId" @change="(tenantId)=>form.tenantId=tenantId"></y-shop-select>

        <y-shop-category-select :tenantId="form.tenantId" :key="form.tenantId"></y-shop-category-select>

        <y-rich-editor v-model="form.rich"></y-rich-editor>

      </a-form-model-item>
    </y-search>
    <y-table
      rowKey="id"
      :columns="table.columns"
      :records="table.records"
      :pagination="table.pagination"
      :row-selection="table.rowSelection"
      :loading="table.loading"
      @change="tableChange"
    >
      <span slot="isShow" slot-scope="{ text, record }">
        <a-switch
          v-model="record.isShow"
          checked-children="是"
          un-checked-children="否"
          @change="(checked) => onRowChange({ ...record, isShow: checked })"
        />
      </span>
      <div slot="action" slot-scope="{ text, record }" class="y-flex">
        <a-button icon="edit"></a-button>
        <a-divider type="vertical"/>
        <a-button type="danger" icon="delete"></a-button>
      </div>
    </y-table>
  </div>
</template>
<script>
  import {columns} from '@/pages/mam/activitiy/pageConfig.js';
  import {editActivitiy, getActivitiyPageList} from '@/api/mam/activitiy.js';

  export default {
    data() {
      return {
        area: "11, 1101,110101",
        searchForm: {},
        c: ["1", "58"],
        table: {
          columns,
          records: [],
          loading: false,
          pagination: {
            pageNum: 1,
            pageSize: 2,
            total: 0,
            pageSizeOptions: ['2', '20', '30', '40'],
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条` // 显示总条数和当前数据范围
          },
          rowSelection: {
            selectedRowKeys: [],
            onChange: this.tableSelectedRowKeys
          }
        }
      };
    },
    created() {
      this.getData();
    },
    methods: {
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
        let {records, total, current} = await getActivitiyPageList({
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
        await editActivitiy(record, record.id);
        await this.getData();
      }
    }
  };
</script>
