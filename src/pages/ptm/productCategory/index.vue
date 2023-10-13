<template>
  <div class="manage-container">
    <div class="search-container"></div>
    <div class="content-container">
      <div class="operate-btn-container">
        <!--      <a-button-group>-->
        <a-button type="primary" @click="onAddProductCateHandle">
          添加分类
        </a-button>
        <a-button> 批量删除 </a-button>
        <!--      </a-button-group>-->
      </div>
      <div ref="listContainer" class="list-container">
        <a-table
          :columns="columns"
          :data-source="tableData.records"
          :scroll="{ x: '100%' }"
        >
          <span slot="icon" slot-scope="icon">
            {{ globalConfig.imgBaseUrl + icon }}
          </span>
          <!--          slot-scope(当前数据，当前行)-->
          <span slot="level" slot-scope="text">
            {{ text.desc }}
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
// import manage from '@/mixins/manage';
import { columns } from './pageConfig';
import { getProductCategoryPageList } from '@/api/ptm/productCategory';

export default {
  name: 'ProductCategory',
  components: {},
  mixins: [],
  data() {
    return {
      columns,
      tableData: {
        records: []
      }
    };
  },
  created() {
    this.getProductCateListData();
  },
  methods: {
    async getProductCateListData() {
      this.tableData = await getProductCategoryPageList();
      console.log('this.tableData:', this.tableData);
    },
    onAddProductCateHandle() {}
  }
};
</script>

<style lang="less" scoped></style>
