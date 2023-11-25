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
        <y-product-category-plat-select v-model="formData.platCategoryIds" @change="cateIdChange">
        </y-product-category-plat-select>
      </a-form-model-item>
      <a-form-model-item label="店铺分类">
        <y-product-category-shop-select
          :key="forPramsData.tenantId"
          v-model="formData.shopCategoryIds"
          :disabled="formData.tenantId === 0"
          :tenantId="formData.tenantId"></y-product-category-shop-select>
      </a-form-model-item>
      <a-form-model-item label="品牌">
        <a-select
          v-model="formData.brandId" placeholder="选择平台分类后再选择关联品牌">
          <a-select-option v-for="(item, index) in forPramsData.brandIdList" :key="index" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="保障服务">
        <y-product-guarantee-select :key="formData.tenantId" v-model="formData.guaranteeIds"
                                    :tenantId="formData.tenantId"
          ></y-product-guarantee-select>
      </a-form-model-item>
      <a-form-model-item label="运费">
        <y-freight-temp-select v-model="formData.tempId"></y-freight-temp-select>
      </a-form-model-item>
      <a-form-model-item label="主图">
        <y-img
          v-if="formData.image"
          :src="formData.image"
          style="height: 100px; width: 100px;"
        ></y-img>
        <UploadSngle
          v-else
          v-model="formData.image"
          @UploadSngle="(fileUrl) => UploadSngle(fileUrl, formData)"
        ></UploadSngle>
      </a-form-model-item>
      <a-form-model-item label="轮播图">
        <y-upload-multiple :key="formData.sliderImage"
                           v-model="formData.sliderImage"></y-upload-multiple>
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
      <a-form-model-item label="单位">
        <a-input v-model="formData.unitName" placeholder="请输入单位" allowClear/>
      </a-form-model-item>
      <a-form-model-item label="销量">
        <a-input-number v-model="formData.sales" :min="0" :max="999999" />
      </a-form-model-item>
      <a-form-model-item label="虚拟销量">
        <a-input-number v-model="formData.fictiSales" :min="0" :max="999999" />
      </a-form-model-item>
      <a-form-model-item label="商品二维码">
        <a-input v-model="formData.codePath" placeholder="商品二维码"/>
      </a-form-model-item>
      <a-form-model-item label="平台排序">
        <a-input-number v-model="formData.sort" :min="0" :max="999999" />
<!--        <a-input-number v-model="formData.tenantSort" :min="0" :max="999999" />-->
      </a-form-model-item>
      <a-form-model-item label="单独分佣">
        <a-radio-group v-model="formData.isSub">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="商品属性名">
        <a-select label-in-value v-model="formData.attrKey" placeholder="请选择商品属性" @change="handleAttrValueChange">
          <a-select-option v-for="(item, index) in forPramsData.productAttrKeyList" :key="index" :value="item.id">
            {{ item.attrKey }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品属性值">
        <a-select label-in-value v-model="formData.attrValue" mode="multiple" placeholder="请选择商品属性">
          <a-select-option v-for="(item, index) in forPramsData.productAttrValueList" :key="index" :value="item.id">
            {{ item.attrValue }}
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="handleSkuList">
          确认生成sku
        </a-button>
      </a-form-model-item>
      <a-form-model-item label="商品详情">
        <rich-editor v-model="formData.goodsDesc"></rich-editor>
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
import { listOfProductBrandByCid } from "@/api/ptm/productBrand.js"
import UploadSngle from '@/components/uploadSngle';
import richEditor from "../../../components/RichEditor/index.vue";
import {getProductAttrKeyList} from "@/api/ptm/productAttrKey";
import {getProductAttrValueList} from "../../../api/ptm/productAttrValue";
import {makeSkuTempList} from "../../../api/ptm/productSku";
export default {
  name: "EditProduct",
  components:{ UploadSngle, richEditor },
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
        tenantId: null,            // 商户id
        platCategoryIds: null,   // 平台分类id
        shopCategoryIds: null,     // 商户分类id
        brandId: null,            // 品牌
        guaranteeIds: null,       // 保障服务
        tempId: null,             // 运费模版
        image: null,              // 主图
        sliderImage: null,        // 轮播图
        name: null,               // 名称
        title: null,              // 简介
        keyword: null,            // 关键字
        unitName: null,           // 单位名称
        sales: 0,                 // 实际销量
        fictiSales: 0,            // 虚拟销量
        tenantSort: 0,            // 商户排序
        sort: 0,            // 平台排序
        isSub: 0,              // 分佣模式 是否单独分佣0=否|1=是
        goodsDesc: null,          // 商品富文本描述
        // codePath: null,           // 商品二维码/小程序码
        videoLink: null,          // 视频连接
        attrKey:[],                // 临时用到的属性名 不当作参数
        attrValue:[],                // 临时用到的属性值 不当作参数
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
        productAttrKeyList: [], // 商品属性key列表
        productAttrValueList: [], // 商品属性Value列表
        brandIdList:[], // 商品品牌集合
      }
    }
  },
  created(){

  },
  methods:{
    // 商品维护表单提交方法，编辑和创建
    async onSubmitHandle(){
      if (this.editId) {
        await editProduct(this.formData, this.formData.id);
        this.$emit('onSubmitHandleSuccess');
      } else {
        await addProduct(this.formData);
        this.$emit('onSubmitHandleSuccess');
      }
    },
    tenantIdChange(tenantId) {
      this.forPramsData.tenantId = tenantId;
      // 根据当前商户获取对应属性名称
      this.handleAttrKeyChange({tenantId:this.forPramsData.tenantId});
    },
    cateIdChange(cid){
      this.formData.platCategoryIds=cid
      this.getProductBrandListByCid();
    },
    // 根据分类id获取品牌
    async getProductBrandListByCid(){
      this.formData.shopCategoryIds = null;
      this.forPramsData.brandIdList = await listOfProductBrandByCid(this.formData.platCategoryIds);
      console.log('this.forPramsData.brandIdList:', this.forPramsData.brandIdList);
    },
    UploadSngle(fileUrl, item) {
      console.log('item:', item);
      item.image = fileUrl;
    },
    // 选择属性key
    async handleAttrKeyChange(params){
      this.forPramsData.productAttrKeyList = await getProductAttrKeyList(params);
    },
    // 根据选择的attrKeyID加载AttrValue
    async handleAttrValueChange(selectedAttrKey){
      console.log('selectedAttrKey:',selectedAttrKey)
      this.forPramsData.productAttrValueList = await getProductAttrValueList({ptmProductAttrKeyId:selectedAttrKey.key});
    },
    async handleSkuList(){
      let attrKey = [this.formData.attrKey.label.trim()];
      let attrValue =[this.formData.attrValue.map(obj => obj.label.trim())];
      this.formData.skuList = await makeSkuTempList({attrKeyList:attrKey, attrValList:attrValue});
    }
  }
}
</script>

<style scoped lang="less">

</style>
