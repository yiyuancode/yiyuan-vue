<template>
  <div>
<<<<<<< HEAD
    <!--    <y-search-->
    <!--      :scopedSlots="3"-->
    <!--      :loading="table.loading"-->
    <!--      @search="search"-->
    <!--    >-->
    <!--      <a-form-model-item slot="scopedSlots-1" label="ID">-->
    <!--        <a-input v-model="searchForm.id"  allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-2" label="NAME">-->
    <!--        <a-input v-model="searchForm.name"  allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-3" label="平台分类">-->
    <!--        <a-cascader-->
    <!--          v-model="searchForm.tenantCategoryId"-->
    <!--          :options="searchForm.productCateList"-->
    <!--          placeholder="请选择平台分类"-->
    <!--        />-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-4" label="商户分类">-->
    <!--        <a-cascader-->
    <!--          v-model="searchForm.shopCategoryId"-->
    <!--          :options="searchForm.productCateList"-->
    <!--          placeholder="请选择商户分类"-->
    <!--        />-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-5" label="品牌">-->
    <!--        <a-cascader-->
    <!--          v-model="searchForm.brandId"-->
    <!--          :options="searchForm.productCateList"-->
    <!--          placeholder="请选择品牌"-->
    <!--        />-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item label="保障服务"> TO DO 保障服务待维护后-->
    <!--        <a-cascader-->
    <!--          v-model="formData.guaranteeIds"-->
    <!--          :options="forPramsData.productCateList"-->
    <!--          placeholder="请选择品牌"-->
    <!--        />-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-6" label="运费模版">-->
    <!--        <a-cascader-->
    <!--          v-model="searchForm.tempId"-->
    <!--          :options="searchForm.productCateList"-->
    <!--          placeholder="请选择品牌"-->
    <!--        />-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-7" label="主图">-->
    <!--        <y-img-->
    <!--          :src="globalConfig.imgBaseUrl + image"-->
    <!--          style="height: 30px; width: 30px"-->
    <!--        ></y-img>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-8" label="轮播图">-->
    <!--        <y-img-->
    <!--          :src="globalConfig.imgBaseUrl + sliderImage"-->
    <!--          style="height: 30px; width: 30px"-->
    <!--        ></y-img>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-3" label="商品名">-->
    <!--        <a-input v-model="searchForm.name" placeholder="请输入商品名" allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-10" label="商品简介">-->
    <!--        <a-input v-model="searchForm.title" placeholder="请输入商品简介" allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-11" label="关键字">-->
    <!--        <a-input v-model="searchForm.keyword" placeholder="请输入关键字" allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-13" label="虚拟销量">-->
    <!--        <a-input v-model="searchForm.fictiSales" placeholder="根据情况输入虚拟销量" allowClear/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-14" label="排序">-->
    <!--        <a-input v-model="searchForm.tenantSort" placeholder="排序"/>-->
    <!--      </a-form-model-item>-->
    <!--      <a-form-model-item slot="scopedSlots-15" label="分佣">-->
    <!--        <a-input v-model="searchForm.isSub" placeholder="分佣"/>-->
    <!--      </a-form-model-item>-->

    <!--    </y-search>-->
=======
    <y-search
      :scopedSlots="['id','tenantId','platCategoryId','shopCategoryId','brandId','guaranteeIds','name','title','keyword',
      'stockStart','stockEnd','browseStart','browseEnd','isSpecType','isRecycle','isAudit','auditStatus','isShow','createTimeStart',
      'createTimeEnd','tempId']"
      :loading="table.loading"
      @search="search"
    >
      <a-form-model-item slot="id" slot-scope="{ form }" label="ID">
        <a-input v-model="form.id"  allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="tenantId" slot-scope="{ form }" label="商户">
        <y-api-select
          v-model="form.tenantId"  :apiConfig="tenantIdApiConfig" @change="tenantIdChange"/>
      </a-form-model-item>
      <a-form-model-item slot="platCategoryId" slot-scope="{ form }" label="平台分类">
        <y-product-category-plat-select v-model="form.platCategoryId" @change="platCateIdChange">
        </y-product-category-plat-select>
      </a-form-model-item>
      <a-form-model-item slot="shopCategoryId" slot-scope="{ form }" label="店铺分类">
        <y-product-category-shop-select
          :key="form.tenantId"
          v-model="form.shopCategoryId"
          :tenantId="form.tenantId"></y-product-category-shop-select>
      </a-form-model-item>
      <a-form-model-item slot="brandId" slot-scope="{ form }" label="品牌">
        <a-select :disabled="searchOption.brandIdList.length === 0"
          v-model="form.brandId" placeholder="选择平台分类后再选择关联品牌">
          <a-select-option v-for="(item, index) in searchOption.brandIdList" :key="index" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="guaranteeIds" slot-scope="{ form }" label="保障服务">
        <y-product-guarantee-select :key="form.tenantId"
                                    v-model="form.guaranteeIds"
                                    :tenantId="form.tenantId"
        ></y-product-guarantee-select>
      </a-form-model-item>
      <a-form-model-item slot="name" slot-scope="{ form }" label="商品名">
        <a-input v-model="form.name" placeholder="请输入商品名" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="title" slot-scope="{ form }" label="商品简介">
        <a-input v-model="form.title" placeholder="请输入商品简介" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="keyword" slot-scope="{ form }" label="关键字">
        <a-input v-model="form.keyword" placeholder="请输入关键字" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="stockStart" slot-scope="{ form }" label="库存S">
        <a-input v-model="form.stockStart" placeholder="库存数量S" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="stockEnd" slot-scope="{ form }" label="库存E">
        <a-input v-model="form.stockEnd" placeholder="库存数量E" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="browseStart" slot-scope="{ form }" label="浏览量S">
        <a-input v-model="form.browseStart" placeholder="浏览量S" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="browseEnd" slot-scope="{ form }" label="浏览量E">
        <a-input v-model="form.browseEnd" placeholder="浏览量E" allowClear/>
      </a-form-model-item>
      <a-form-model-item slot="isSpecType" slot-scope="{ form }" label="商品规格">
        <a-select v-model="form.isSpecType" placeholder="商品规格" allowClear>
          <a-select-option :key="0" :value="0">单</a-select-option>
          <a-select-option :key="1" :value="1">多</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="isRecycle" slot-scope="{ form }" label="删除状态">
        <a-select v-model="form.isRecycle" placeholder="删除状态" allowClear>
          <a-select-option :key="0" :value="0">否</a-select-option>
          <a-select-option :key="1" :value="1">是</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="isAudit" slot-scope="{ form }" label="是否审核">
        <a-select v-model="form.isAudit" placeholder="是否状态" allowClear>
          <a-select-option :key="0" :value="0">否</a-select-option>
          <a-select-option :key="1" :value="1">是</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="auditStatus" slot-scope="{ form }" label="审核状态">
        <a-select v-model="form.auditStatus" placeholder="审核状态" allowClear>
          <a-select-option :key="0" :value="0">无需审核</a-select-option>
          <a-select-option :key="1" :value="1">待审核</a-select-option>
          <a-select-option :key="2" :value="2">待审成功</a-select-option>
          <a-select-option :key="3" :value="3">审核拒绝</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="isShow" slot-scope="{ form }" label="上架状态">
        <a-select v-model="form.isShow" placeholder="上架状态" allowClear>
          <a-select-option :key="0" :value="0">否</a-select-option>
          <a-select-option :key="1" :value="1">是</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item slot="createTimeStart" slot-scope="{ form }" label="创建时间S">
        <a-input v-model="form.createTimeStart" placeholder="创建时间S"/>
      </a-form-model-item>
      <a-form-model-item slot="createTimeEnd" slot-scope="{ form }" label="创建时间E">
        <a-input v-model="form.createTimeEnd" placeholder="创建时间E"/>
      </a-form-model-item>
<!--      根据商户的运费模版加载运费列表用于筛选商品-->
      <a-form-model-item slot="tempId" slot-scope="{ form }" label="运费">
        <y-freight-temp-select v-model="form.tempId"></y-freight-temp-select>
      </a-form-model-item>
    </y-search>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
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
          :title="'确定批量删除选中的分类'"
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
<<<<<<< HEAD
      <div slot="icon" slot-scope="{ text, record }" class="y-flex">
=======
      <div slot="id" slot-scope="{ text, record }" class="y-flex">
        <a-icon type="copy" @click="handlerCopyText(text)"/>
      </div>
      <div slot="platCategoryIds" slot-scope="{ text, record }" class="y-flex">
        {{ text | getPlatCateNameById }}
      </div>
      <div slot="tenantId" slot-scope="{ text, record }" class="y-flex">
        {{ text | getShopNameById }}
      </div>
      <div slot="shopCategoryIds" slot-scope="{ text, record }" class="y-flex">
        {{ text | getShopCateById }}
      </div>
      <div slot="brandId" slot-scope="{ text, record }" class="y-flex">
        {{ text | getBrandNameById }}
      </div>
      <div slot="guaranteeIds" slot-scope="{ text, record }" class="y-flex">
        {{ text | getProductGuaranteeNameById }}
      </div>
      <div slot="tempId" slot-scope="{ text, record }" class="y-flex">
        {{ text | getFreightTempByIdNameById }}
      </div>
      <!--      主图image-->
      <div slot="image" slot-scope="{ text, record }" class="y-flex">
        <y-img :src="globalConfig.imgBaseUrl + text" :width="35"></y-img>
      </div>
      <!--      详情图sliderImage-->
      <div slot="sliderImage" slot-scope="{ text, record }" class="y-flex">
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
        <y-img :src="globalConfig.imgBaseUrl + text" :width="35"></y-img>
      </div>
      <!--   上下架 -->
      <div slot="isShow" slot-scope="{ text, record }">
        {{ enumsMap['isShow' + text] }}
      </div>
      <!--      是否单独分拥-->
      <div slot="isSub" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['isSub' + text] }}
      </div>
      <!--      审核状态-->
      <div slot="auditStatus" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['auditStatus' + text] }}
      </div>
      <!--      规格-->
      <div slot="isSpecType" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['isSpecType' + text] }}
      </div>
      <div slot="isRecycle" slot-scope="{ text, record }" class="y-flex">
        {{ enumsMap['isRecycle' + text] }}
      </div>
      <div slot="operation" slot-scope="{ text, record }" class="y-flex">
        <a-button-group>
          <!--            编辑分类-->
          <a-button
            icon="edit"
            shape="round"
            @click="() => onEdit(text, record)"
          ></a-button>
          <!--            删除分类-->
          <a-popconfirm
            :title="'确定删除名称为【' + record.name + '】的分类'"
            ok-text="确定"
            cancel-text="取消"
            @confirm="() => onDelete(record)"
          >
            <a-button icon="delete" type="danger" shape="round"></a-button>
          </a-popconfirm>
        </a-button-group>
      </div>
    </y-table>

    <!--    商品属性编辑-->
    <a-drawer
      title="商品属性"
      width="90%"
      :visible="editConfig.visible"
      @close="editConfig.visible = false"
    >
      <edit
        v-if="editConfig.visible"
        :editId="editConfig.editId"
        @onSubmitHandleSuccess="onEditSubmit"
        @onCancelSubmit="editConfig.visible = false"
      ></edit>
    </a-drawer>
  </div>
</template>
<script>
<<<<<<< HEAD
import { columns, enumsMap } from './pageConfig.js';
import { deleteProduct, getProductPageList } from '@/api/ptm/product.js';
=======
import {getShopList } from "@/api/spm/shop.js";
import {columns, enumsMap} from './pageConfig.js';
import { listOfProductBrandByCid } from "@/api/ptm/productBrand.js"
import {deleteProduct, getProductPageList} from '@/api/ptm/product.js';
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
import edit from './edit.vue';
import { mapGetters } from 'vuex';
import {getBrandNameById, getFreightTempByIdNameById, getShopCateById} from "../../../filters";

export default {
  components: { edit },
  data() {
    return {
      enumsMap,
      tenantIdApiConfig:{   // 商户列表
        apiFun: getShopList,
        parms: {},
        objMap: {value: 'id', label: 'shopName'}
      },
      searchForm: {
        // 表单查询对象
        id: null,
        tenantId: null, //商户id
        platCategoryId: null, // 平台分类id
<<<<<<< HEAD
        ptmProductCategoryId: null, // TODO 待修改为平台属性
=======
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
        shopCategoryId: null, // 商户分类id
        brandId: null, // 品牌
        guaranteeIds: null, // 保障服务 多个逗号分隔
        tempId: null, // TODO 平台可以直接搜索和选择运费模版，也可以根据商家筛选对应的运费模版
        name: null, // 商品名称
        title: null, // 商品title
        keyword: null, // 商品关键字
        stock: 0, // 库存 TODO 前端可以给出预设区间做选择
        salePrice: 0, // 售价 TODO 前端可以给出预设区间做价格选择
        sales: 0, // 销量 TODO 前端给出区间做选择
        browse: null, // 浏览量 TODO 前端给区间做选择 做选择的均为后端需要同步支持的参数，次功能需要设计后再决定
        isSpecType: null, // 商品规格 是否放入回收站0=否|1=是
        isSub: null, // 商品规格 是否单独分佣0=否|1=是
        isShow: null, // 商品上下架状态 是否上架0=否|1=是
        auditStatus: null, // 审核状态#0=无需审核|1=待审核|2=审核成功|3=审核拒绝
        createTimeStart: null, // 创建时间
        createTimeEnd: null,
        updateTimeStart: null,
        updateTimeEnd: null
      },
      searchOption:{ // 搜索表单用到的备选数据
        brandIdList:[]
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
          fixed: true, // 锁定左侧复选框
          onChange: this.tableSelectedRowKeys
        }
      },
      // 商品类型父级选择框下拉数据
      searchDataOfProductCate: [],
      editConfig: {
        editId: null,
        visible: false
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getFreightTempByIdNameById,
    getBrandNameById,
    getShopCateById,
    async search(form) {
      this.searchForm = form;
      console.log('this.searchForm:', this.searchForm);
      await this.getData();
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
      if (this.table.records.length == 0 && this.table.pagination.pageNum > 1) {
        this.table.pagination.pageNum = this.table.pagination.pageNum - 1;
      }
      let { pageNum, pageSize } = this.table.pagination;
      let { records, total, current } = await getProductPageList({
        pageNum: pageNum,
        pageSize: pageSize,
        ...this.searchForm
      });
      this.table.records = records;
      this.table.pagination.total = total;
      this.table.pagination.current = current;
      this.table.loading = false;
    },

    // 新增商品分类
    onAdd() {
      this.editConfig.editId = null;
      this.editConfig.visible = true;
    },
    // 批量删除商品分类
    async onBatchDelete() {
      console.log(
        'onBatchDelete.selectedRowKeys',
        this.table.rowSelection.selectedRowKeys
      );
      await deleteProduct(this.table.rowSelection.selectedRowKeys.join(','));
      this.$message.success(`批量删除分类成功`);
      this.table.records = this.table.records.filter(
        (item) => !this.table.rowSelection.selectedRowKeys.includes(item.id)
      );
      this.table.rowSelection.selectedRowKeys = [];
      this.getData();
    },
    // 商品分类编辑后提交事件
    onEditSubmit() {
      this.editConfig.visible = false;
      this.getData();
    },
    // 列表点击删除商品分类
    async onDelete(record) {
      await deleteProduct(record.id);
      this.$message.success(`删除分类${record.name}成功`);
      this.table.records = this.table.records.filter(
        (item) => item.id != record.id
      );
      this.getData();
    },
    // 商品分类行编辑
    onEdit(text, record) {
      this.editConfig.editId = record.id;
      this.editConfig.visible = true;
    },
    // 搜索选项方法 START
    tenantIdChange(tenantId) {
      this.searchForm.tenantId = tenantId;
      // 根据当前商户获取对应属性名称
      // this.handleAttrKeyChange({tenantId:this.searchForm.tenantId});
    },
    platCateIdChange(cid){
      this.searchForm.platCategoryId=cid
      this.getProductBrandListByCid();
    },
    async getProductBrandListByCid(){
      this.searchOption.brandIdList = await listOfProductBrandByCid(this.searchForm.platCategoryId);
    },
    // 搜索选项方法 END
    handlerCopyText(productId) {
      this.$copyText(productId).then(() => {
        // 复制成功回调
        this.$message.success('复制商品id成功')
        console.log('文本已复制到剪贴板');
      }).catch(() => {
        // 复制失败回调
        console.error('复制失败');
      });
    }
  }
};
</script>
