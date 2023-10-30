<template>
  <div class="manage-container">
    <a-form-model
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商户">
        <y-shop-select v-model="formData.tenantId"
                       @change="tenantIdChange"></y-shop-select>
      </a-form-model-item>
      <a-form-model-item label="平台分类">
<!--        todo 需要有商户参数的传递-->
        <y-product-category-tree-select
          v-model="formData.platCategoryIds" />
      </a-form-model-item>
      <a-form-model-item label="店铺分类">
        <!--        todo 根据商户id查询对应店铺分类-->
        <y-product-category-tree-select
          :tenantId="forPramsData.tenantId"
          :key="forPramsData.tenantId"
          v-model="formData.platCategoryIds" />
      </a-form-model-item>
      <a-form-model-item label="品牌">
<!--        todo 根据当前平台id加载对应品牌列表 此字为非必填-->
<!--        <a-cascader-->
<!--          v-model="formData.shopCategoryId"-->
<!--          :options="forPramsData.productCateList"-->
<!--          placeholder="请选择商户分类"-->
<!--        />-->
      </a-form-model-item>
      <a-form-model-item label="保障服务">
<!--        TODO 保障服务 非必填，维护服务保障需要后补-->
<!--        <a-cascader-->
<!--          v-model="formData.guaranteeIds"-->
<!--          :options="forPramsData.productCateList"-->
<!--          placeholder="请选择品牌"-->
<!--        />-->
      </a-form-model-item>
      <a-form-model-item label="运费">
<!--        todo 运费模版还需要维护 -->
<!--        <a-cascader-->
<!--          v-model="formData.brandId"-->
<!--          :options="forPramsData.productCateList"-->
<!--          placeholder="请选择品牌"-->
<!--        />-->
      </a-form-model-item>
      <a-form-model-item label="主图">
<!--        <y-img todo 缺省值处理中 -->
<!--          :src="globalConfig.imgBaseUrl + image"-->
<!--          style="height: 30px; width: 30px"-->
<!--        ></y-img>-->
      </a-form-model-item>
      <a-form-model-item label="轮播图">
<!--        <y-img todo 多图上传 组件后补-->
<!--          :src="globalConfig.imgBaseUrl + sliderImage"-->
<!--          style="height: 30px; width: 30px"-->
<!--        ></y-img>-->
      </a-form-model-item>

      <a-form-model-item label="视频">
        <a-input v-model="formData.videoLink" placeholder="请输入商视频链接" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="商品名">
        <a-input v-model="formData.name" placeholder="请输入商品名" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="商品简介">
        <a-input v-model="formData.title" placeholder="请输入商品简介" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="关键字">
        <a-input v-model="formData.keyword" placeholder="请输入关键字" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="详情">
        <a-input v-model="formData.goodsDesc" placeholder="请输商品详情" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="单位">
        <a-input v-model="formData.unitName" placeholder="请输入单位" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="销量">
        <a-input v-model="formData.sales" placeholder="请输入单位" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="虚拟销量">
        <a-input v-model="formData.fictiSales" placeholder="根据情况输入虚拟销量" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="商品二维码">
        <a-input v-model="formData.codePath" placeholder="商品二维码"/>
      </a-form-model-item>
      <a-form-model-item label="商户排序">
        <a-input v-model="formData.tenantSort" placeholder="商户排序"/>
      </a-form-model-item>
      <a-form-model-item label="单独分佣">
        <a-input v-model="formData.isSub" placeholder="单独分佣"/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> 创建 </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { addProduct, editProduct } from '@/api/ptm/product.js';
export default {
  name: "EditProduct",
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
  data(){
    return{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formData: {
        tenantId: 0,            // 商户id TODO 商户创建自带参数，暂时指定0=平台
        platCategoryIds: null,   // 平台分类id
        shopCategoryId: null,     // 商户分类id
        brandId: null,            // 品牌 TODO 检查品牌和分类的关联
        guaranteeIds: null,       // 保障服务
        tempId: null,             // 运费模版
        image: null,              // 主图
        sliderImage: null,        // 轮播图
        name: null,               // 名称
        title: null,              // 简介
        keyword: null,            // 关键字
        unitName: null,           // 单位名称
        // sales: 0,                 // 实际销量
        fictiSales: 0,            // 虚拟销量
        // browse: 0,             // 浏览量
        tenantSort: 0,            // 排序
        isSub: true,              // 分佣模式
        // isAudit: true,
        // auditStatus: ,
        goodsDesc: null,          // 商品富文本描述
        // codePath: null,           // 商品二维码/小程序码
        videoLink: null,          // 视频连接
        skuList: [
            {
              updateUser: null,
              sku: null,
              salePrice: 0,       // 售价
              id: null,
              costPrice: 0,       // 成本价
              stock: 0,
              tenantId: 0,
              crossedPrice: 0,    // 划线价
              isShow: true        // 上下架状态
            }
        ]
      },
      forPramsData: {
        productCateList: [],
        tenantId: null, // 此处为选择商户后的id
      }
    }
  },
  created(){

  },
  methods:{
    // 商品维护表单提交方法，编辑和创建
    async onSubmitHandle(){
      this.formData.tenantId = 0; // 平台创建商户id为0
      if (this.editId) {
        await editProduct(this.formData, this.formData.id);
        this.$emit('onSubmitHandleSuccess');
      } else {
        await addProduct(this.formData);
        this.$emit('onSubmitHandleSuccess');
      }
    },
    tenantIdChange(tenantId) {
      console.log("tenantIdChange", tenantId);
      this.forPramsData.tenantId = tenantId;

    },
  }
}
</script>

<style scoped lang="less">

</style>
