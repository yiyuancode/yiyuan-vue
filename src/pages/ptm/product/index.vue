<template>
  <div class="manage-container">
    <div class="search-container">
      我是商品列表
    </div>
    <div class="content-container">
      <div class="operate-btn-container">
        <a-button type="primary" @click="onAddProductHandle">
          添加商品
        </a-button>
        <a-popconfirm
          :title="'确定批量删除选中的属性'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="() => onProductListDelete()"
        >
          <a-button :disabled="tableData.selectedRows.length <= 0"> 批量删除 </a-button>
        </a-popconfirm>
      </div>
      <div ref="listContainer" class="list-container">
        <a-table
          :columns="columns"
          :data-source="tableData.records"
          :scroll="{ x: '100%' }"
          :rowKey="
            (record, index) => {
              return index;
            }
          "
          :pagination="paginationConfig"
          :rowSelection="{
            fixed: true,
            onChange: onTableSelectedChange,
            selectedRowKeys: tableData.selectedKeys
          }"
        >
        </a-table>
      </div>
    </div>

<!--    编辑商品-->
    <a-drawer
      title="商品"
      width="500"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <product-edit v-if="editConfig.visible" :editId="editConfig.editId" @onSubmitHandleSuccess="onProductSubmitSuccess"></product-edit>
    </a-drawer>
  </div>
</template>
<script>
import productEdit from './edit.vue';
import { columns, moduleConfig } from './pageConfig';
import { getProductPageList } from '@/api/ptm/product';
export default {
  name:"ProductList",
  components:{productEdit },
  data(){
    return{
      columns,
      ...moduleConfig,
      tableData: {
        records:[],
        selectedRows: [], // 表格首列选择项
        selectedKeys: [] // 表格选中的数据，暂时仅仅用于清空操作后的列表选中状态
      },
      editConfig: {
        editId: null,
        visible: false
      },
      paginationConfig: {
        current: 1, // 当前页码
        pageSize: 10, // 每页显示条数
        total: 0, // 数据总数
        showSizeChanger: true, // 是否显示每页显示条数切换器
        pageSizeOptions: ['10', '20', '30', '40'], // 每页显示条数选项
        showTotal: (total) => `共 ${total} 条数据`, // 自定义显示总条数文本
        onChange: this.handlePageChange, // 页码改变的回调
        onShowSizeChange: this.handlePageSizeChange // 每页显示条数改变的回调
      },
      tableQueryParams: {
        // 表单查询对象
        pageSize: 10,
        pageNum: 1,
        id: null,
        tenantId: null, //商户id
        tenantCategoryId: null, // 分类名称
        ptmProductCategoryId: null,// TODO 待修改为平台属性
        shopCategoryId: null, // 商户分类id
        brandId: null, // 品牌
        guaranteeIds: null, // 保障服务 多个逗号分隔
        tempId: null, // TODO 平台可以直接搜索和选择运费模版，也可以根据商家筛选对应的运费模版
        name: null, // 商品名称
        title: null, // 商品title
        keyword: null, // 商品关键字
        stock: null, // 库存 TODO 前端可以给出预设区间做选择
        salePrice: null, // 售价 TODO 前端可以给出预设区间做价格选择
        sales: null, // 销量 TODO 前端给出区间做选择
        browse: null, // 浏览量 TODO 前端给区间做选择 做选择的均为后端需要同步支持的参数，次功能需要设计后再决定
        isSpecType: null, // 商品规格 是否放入回收站0=否|1=是
        isSub: null, // 商品规格 是否单独分佣0=否|1=是
        isShow: null, // 商品上下架状态 是否上架0=否|1=是
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null
      },
      searchDataOfProductCate: [], // 商品类型父级选择框下拉数据
    }
  },
  created(){
    this.getProductPageListHandler(this.tableQueryParams);
  },
  methods:{
    onAddProductHandle(){
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    onProductListDelete(rowData){
      console.log("批量删除:", rowData);
    },
    onProductSubmitSuccess(){

    },
    async getProductPageListHandler(queryParam){
      let productListResult = await getProductPageList(queryParam);
      this.tableData.records = productListResult.records;
      this.paginationConfig.total = productListResult.total;
      this.paginationConfig.current = productListResult.current;
    },
    // 处理当前第几页
    handlePageChange(page) {
      this.tableQueryParams.pageNum = page;
      this.paginationConfig.current = page;
      this.getProductPageListHandler(this.tableQueryParams);
    },
    // 处理每页显示条数改变的逻辑
    handlePageSizeChange(pageSize) {
      this.tableQueryParams.pageSize = pageSize;
      this.getProductPageListHandler(this.tableQueryParams);
    },
    // 列表多选事件
    onTableSelectedChange(selectedRowKeys, selectedRow) {
      this.tableData.selectedRows = selectedRow;
      this.tableData.selectedKeys = selectedRowKeys;
    },
  }
}
</script>

<style scoped lang="less">

</style>
