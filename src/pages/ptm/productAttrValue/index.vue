<template>
<<<<<<< HEAD
  <ManagePage
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :renderObj="renderObj"
    @onSave="saveHandle"
    @onSubmit="submitHandle"
    @onDelete="deleteHandle"
    @onSearch="searchHandle"
    @onReset="resetHandle"
    @onChange="tableChangeHandle"
  >
    <!--    table- 是因为manage组建插槽为了有区分，添加了table前缀-->
    <span slot="table-isShow" slot-scope="text">{{
      text.record.isShow ? '显示' : '不显示'
    }}</span>
  </ManagePage>
=======
  <div>
    <y-search
      :scopedSlots="['id','tenantId', 'ptmProductAttrKeyId','attrKey','isShow']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="id" slot-scope="{ form }" label="ID">
        <a-input v-model="form.id" allowClear placeholder="ID"></a-input>
      </a-form-model-item>
      <a-form-model-item slot="tenantId" slot-scope="{ form }" label="商户">
        <y-shop-select v-model="form.tenantId" placeholder="请选择商户" @change="handleShopSelect"></y-shop-select>
      </a-form-model-item>
      <a-form-model-item slot="ptmProductAttrKeyId" slot-scope="{ form }" label="属性值">
        <y-api-select v-model="form.ptmProductAttrKeyId" :apiConfig="attrIdApiConfig"></y-api-select>
      </a-form-model-item>
      <a-form-model-item slot="attrValue" slot-scope="{ form }" label="属性值">
        <a-input v-model="form.attrValue" allowClear placeholder="属性值"></a-input>
      </a-form-model-item>
      <a-form-model-item slot="isShow" slot-scope="{ form }" label="是否显示">
        <a-select v-model="form.isShow" allowClear placeholder="选择显示状态">
          <a-select-option :value="0"> 不显示</a-select-option>
          <a-select-option :value="1"> 显示</a-select-option>
        </a-select>
      </a-form-model-item>
<!--      TODO 时间范围查询条件 createTimeStart / updateTimeEnd-->
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
      <div slot="operations">
        <a-button type="primary" icon="plus" @click="onAdd"> 新建</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="'确定批量删除选中的属性值'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onBatchDelete()"
        >
          <a-button :disabled="table.rowSelection.selectedRowKeys.length <= 0">
            批量删除
          </a-button>
        </a-popconfirm>
        <a-divider type="vertical" />
      </div>

      <div slot="id" slot-scope="{ text, record }" class="y-flex">
        <a-icon type="copy" @click="handlerCopyText(text)"/>
      </div>

      <div slot="isShow" slot-scope="{ text, record }">
        {{ enumsMap['isShow'+text] }}
      </div>

      <div slot="tenantId" slot-scope="{ text, record }">
        {{ text | getShopNameById }}
      </div>

      <div slot="ptmProductAttrKeyId" slot-scope="{ text, record }">
        {{ text | getAttrKeyById }}
      </div>

    </y-table>

<!--    属性值编辑-->
    <a-drawer
      title="商品属性值"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit
        v-if="editConfig.visible"
        :editId="editConfig.editId"
        @onSaveSubmit="onEditSubmit"
        @onCancel="editConfig.visible = false"
      ></edit>
    </a-drawer>
  </div>

>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
</template>

<script>
import { columns,enumsMap, permissionObj } from './pageConfig';
import { getProductAttrValuePageList } from '@/api/ptm/productAttrValue.js';
import {getProductAttrKeyList} from "@/api/ptm/productAttrKey";
import edit from "./edit.vue";
// TODO 属性名使用类似过滤器实现
export default {
  name: 'ProductAttrValue',
  components: { edit },
  data() {
    return {
      enumsMap,
      attrKeyListData: [],
      attrIdApiConfig:{   // 商户列表
        apiFun: getProductAttrKeyList,
        parms: {},
        objMap: {value: 'id', label: 'attrKey'}
      },
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
      editConfig: {
        editId: null,
        visible: false
      }
    };
  },
  created(){
    this.handlerGetAttrKeyList();
  },
  methods: {
    search(form) {
      this.searchForm = form;
      this.getData();
    },
    onAdd() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    onEditSubmit() {
      this.editConfig.visible = false;
      this.getData();
    },
    // 批量删除商品分类
    async onBatchDelete() {
      // await deleteProductAttrKey(
      //   this.table.rowSelection.selectedRowKeys.join(',')
      // );
      // this.$message.success(`批量删除分类成功`);
      // this.table.records = this.table.records.filter(
      //   (item) => !this.table.rowSelection.selectedRowKeys.includes(item.id)
      // );
      // this.table.rowSelection.selectedRowKeys = [];
      // this.getData();
    },
    async getData() {
      this.table.loading = true;
      if (this.table.records.length == 0 && this.table.pagination.pageNum > 1) {
        this.table.pagination.pageNum = this.table.pagination.pageNum - 1;
      }
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await getProductAttrValuePageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },
    tableChange(pagination, log) {
      this.table.pagination = pagination;
      this.getData();
    },
    handleShopSelect(tenantId){
      this.attrIdApiConfig.parms = { tenantId : tenantId }
    },
    async handlerGetAttrKeyList(){
      this.attrKeyListData = await getProductAttrKeyList({});
    },
    handlerCopyText(id) {
      this.$copyText(id).then(() => {
        // 复制成功回调
        this.$message.success('复制属性值id成功')
        console.log('文本已复制到剪贴板');
      }).catch(() => {
        // 复制失败回调
        console.error('复制失败');
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
