<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :label-col="labelCol"
      :rules="rules"
      :wrapper-col="wrapperCol"
    >
<<<<<<< HEAD
      <a-form-model-item label="商户">
        <y-shop-select
          v-model="formData.tenantId"
          @change="tenantIdChange"
        ></y-shop-select>
      </a-form-model-item>
      <a-form-model-item label="平台分类">
        <span>formData.platCategoryIds:{{ formData.platCategoryIds }}</span>
        <y-product-category-plat-select
          v-model="formData.platCategoryIds"
          @change="cateIdChange"
        >
        </y-product-category-plat-select>
      </a-form-model-item>
      <a-form-model-item label="店铺分类">
        <y-product-category-shop-select
          :key="forPramsData.tenantId"
          v-model="formData.shopCategoryIds"
          :disabled="formData.tenantId === 0"
          :tenantId="formData.tenantId"
        ></y-product-category-shop-select>
=======
      <a-form-model-item ref="tenantId" label="商户" prop="tenantId">
        <y-api-select
          v-model="formData.tenantId"  :apiConfig="tenantIdApiConfig" @change="tenantIdChange"/>
      </a-form-model-item>
      <a-form-model-item ref="platCategoryIds" label="平台分类" prop="platCategoryIds">
        <y-api-select v-model="formData.platCategoryIds" :apiConfig="platCategoryIdsApiConfig" @change="cateIdChange"/>
      </a-form-model-item>
      <a-form-model-item ref="shopCategoryIds" label="店铺分类" prop="shopCategoryIds">
        <y-api-select v-model="formData.shopCategoryIds" :apiConfig="tenantCategoryIdsApiConfig"/>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item ref="brandId" label="品牌" prop="brandId">
        <a-select
          v-model="formData.brandId"
          placeholder="选择平台分类后再选择关联品牌"
        >
          <a-select-option
            v-for="(item, index) in forPramsData.brandIdList"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="保障服务">
<<<<<<< HEAD
        <y-product-guarantee-select
          :key="formData.tenantId"
          v-model="formData.guaranteeIds"
          :tenantId="formData.tenantId"
        ></y-product-guarantee-select>
      </a-form-model-item>
      <a-form-model-item label="运费">
        <y-freight-temp-select
          v-model="formData.tempId"
        ></y-freight-temp-select>
=======
        <y-api-select v-model="formData.guaranteeIds" mode="multiple"  :apiConfig="guaranteeIdsApiConfig"/>
      </a-form-model-item>
      <a-form-model-item ref="tempId" label="运费" prop="tempId">
        <y-freight-temp-select v-model="formData.tempId"></y-freight-temp-select>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item ref="image" label="主图" prop="image">
        <y-img
          v-if="formData.image"
          :src="formData.image"
          style="height: 100px; width: 100px"
        ></y-img>
        <UploadSngle
          v-else
          v-model="formData.image"
          @UploadSngle="(fileUrl) => UploadSngle(fileUrl, formData)"
        ></UploadSngle>
      </a-form-model-item>
<<<<<<< HEAD
      <a-form-model-item label="轮播图">
        <y-upload-multiple
          :key="formData.sliderImage"
          v-model="formData.sliderImage"
        ></y-upload-multiple>
=======
      <a-form-model-item ref="sliderImage" label="轮播图" prop="sliderImage">
        <y-upload-multiple :key="formData.sliderImage"
                           v-model="formData.sliderImage"></y-upload-multiple>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item label="视频">
        <a-input
          v-model="formData.videoLink"
          placeholder="请输入商视频链接"
          allowClear
        />
      </a-form-model-item>
<<<<<<< HEAD
      <a-form-model-item label="商品名">
        <a-input
          v-model="formData.name"
          placeholder="请输入商品名"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商品简介">
        <a-input
          v-model="formData.title"
          placeholder="请输入商品简介"
          allowClear
        />
=======
      <a-form-model-item ref="name" label="商品名" prop="name">
        <a-input v-model="formData.name" placeholder="请输入商品名" allowClear/>
      </a-form-model-item>
      <a-form-model-item ref="title" label="商品简介" prop="title">
        <a-input v-model="formData.title" placeholder="请输入商品简介" allowClear/>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item label="关键字">
        <a-input
          v-model="formData.keyword"
          placeholder="请输入关键字"
          allowClear
        />
      </a-form-model-item>
<<<<<<< HEAD
      <a-form-model-item label="单位">
        <a-input
          v-model="formData.unitName"
          placeholder="请输入单位"
          allowClear
        />
=======
      <a-form-model-item ref="unitName" label="单位" prop="unitName">
        <a-input v-model="formData.unitName" placeholder="请输入单位" allowClear/>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item label="销量">
        <a-input-number v-model="formData.sales" :min="0" :max="999999" />
      </a-form-model-item>
      <a-form-model-item label="虚拟销量">
        <a-input-number v-model="formData.fictiSales" :min="0" :max="999999" />
      </a-form-model-item>
      <a-form-model-item label="商品二维码">
        <a-input v-model="formData.codePath" placeholder="商品二维码" />
      </a-form-model-item>
      <a-form-model-item label="平台排序">
        <a-input-number v-model="formData.sort" :min="0" :max="999999" />
        <!--        <a-input-number v-model="formData.tenantSort" :min="0" :max="999999" />-->
      </a-form-model-item>
      <a-form-model-item label="单独分佣">
        <a-radio-group v-model="formData.isSub">
          <a-radio :value="false">否</a-radio>
          <a-radio :value="true">是</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="商品属性名">
<<<<<<< HEAD
        <a-select
          v-model="formData.attrKey"
          label-in-value
          placeholder="请选择商品属性"
          @change="handleAttrValueChange"
        >
          <a-select-option
            v-for="(item, index) in forPramsData.productAttrKeyList"
            :key="index"
            :value="item.id"
          >
=======
        <a-select label-in-value v-model="formData.attrKey" mode="multiple" placeholder="请选择商品属性" @change="handleAttrValueChange">
          <a-select-option v-for="(item, index) in forPramsData.productAttrKeyList" :key="index" :value="item.id">
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
            {{ item.attrKey }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品属性值">
        <a-select
          v-model="formData.attrValue"
          label-in-value
          mode="multiple"
          placeholder="请选择商品属性"
        >
          <a-select-option
            v-for="(item, index) in forPramsData.productAttrValueList"
            :key="index"
            :value="item.id"
          >
            {{ item.attrValue }}
          </a-select-option>
        </a-select>
        <a-button type="primary" @click="handleSkuList"> 确认生成sku </a-button>
      </a-form-model-item>
      <a-form-model-item label="商品SKU列表">
        {{ formData.skuList }}
        <a-table v-if="formData.skuList"
                 :rowKey="
                    (record, index) => {
                      return index;
                    }
                  "
                 :columns="skuListColumns" :data-source="formData.skuList">
          <span slot="sku" slot-scope="record">{{record}}</span>
<!--          价格批量处理-因为都是input-->
          <template
            v-for="col in ['costPrice','crossedPrice','salePrice','stock']" :slot="col" slot-scope="text, record, index">
            <div :key="col">
              <a-input :value="text" @change="e => handleSKUChange(e.target.value, record.sku, col)" ></a-input>
            </div>
          </template>
<!--          SKU右侧操作按钮-->
          <template slot="operation" slot-scope="text, record, index">
            <a-button icon="delete" type="danger" shape="round" @click="handleSkuDelete(text, record, index)"></a-button>
          </template>
        </a-table>
      </a-form-model-item>
      <a-form-model-item label="商品详情">
<<<<<<< HEAD
        <a-input v-model="formData.goodsDesc"></a-input>
        <rich-editor
          v-model="formData.goodsDesc"
          :value="formData.goodsDesc"
        ></rich-editor>
=======
        <rich-editor v-if="!editId || formData.goodsDesc" v-model="formData.goodsDesc" :value="formData.goodsDesc" ></rich-editor>
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> {{editId?"编辑":"创建"}} </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
<<<<<<< HEAD
import {
  addProduct,
  editProduct,
  getProductDetail
} from '@/api/ptm/product.js';
import { listOfProductBrandByCid } from '@/api/ptm/productBrand.js';
import UploadSngle from '@/components/uploadSngle';
import richEditor from '../../../components/RichEditor/index.vue';
import { getProductAttrKeyList } from '@/api/ptm/productAttrKey';
import { getProductAttrValueList } from '../../../api/ptm/productAttrValue';
import { makeSkuTempList } from '../../../api/ptm/productSku';
=======
import {getShopList } from "@/api/spm/shop.js";
import {getProductGuaranteeList } from "@/api/ptm/productGuarantee.js";
import { getProductCategoryPlatList } from "@/api/ptm/productCategoryPlat.js"
import { getProductCategoryShopList } from "@/api/ptm/productCategoryShop.js"
import { addProduct, editProduct, getProductDetail } from '@/api/ptm/product.js';
import { listOfProductBrandByCid } from "@/api/ptm/productBrand.js"
import UploadSngle from '@/components/uploadSngle';
import richEditor from "../../../components/RichEditor/index.vue";
import {getProductAttrKeyList} from "@/api/ptm/productAttrKey";
import {getProductAttrValueList} from "../../../api/ptm/productAttrValue";
import {makeSkuTempList} from "../../../api/ptm/productSku";
import {columns, enumsMap} from './pageConfig.js';
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
export default {
  name: 'EditProduct',
  components: { UploadSngle, richEditor },
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
<<<<<<< HEAD
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
=======
  data(){
    return{
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
      formData: {
        tenantId: null, // 商户id
        platCategoryIds: null, // 平台分类id
        shopCategoryIds: null, // 商户分类id
        brandId: null, // 品牌
        guaranteeIds: null, // 保障服务
        tempId: null, // 运费模版
        image: null, // 主图
        sliderImage: null, // 轮播图
        name: null, // 名称
        title: null, // 简介
        keyword: null, // 关键字
        unitName: null, // 单位名称
        sales: 0, // 实际销量
        fictiSales: 0, // 虚拟销量
        tenantSort: 0, // 商户排序
        sort: 0, // 平台排序
        isSub: 0, // 分佣模式 是否单独分佣0=否|1=是
        goodsDesc: null, // 商品富文本描述
        // codePath: null,           // 商品二维码/小程序码
        videoLink: null, // 视频连接
        attrKey: [], // 临时用到的属性名 不当作参数
        attrValue: [], // 临时用到的属性值 不当作参数
        skuList: [
          {
            updateUser: null,
            sku: null,
<<<<<<< HEAD
            salePrice: 0, // 售价
            id: null,
            costPrice: 0, // 成本价
            stock: 0,
            tenantId: 0,
            crossedPrice: 0, // 划线价
            isShow: true // 上下架状态
=======
            salePrice: 0,       // 售价
            id: null,
            costPrice: 0,       // 成本价
            stock: 0,
            tenantId: 0,
            crossedPrice: 0,    // 划线价
            isShow: true        // 上下架状态
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
          }
        ]
      },
      rules:{ // 表单验证
        tenantId: [ { required: true, message: '请选择对应商户', trigger: 'blur' } ],
        platCategoryIds: [ { required: true, message: '请选择平台分类', trigger: 'blur' } ],
        shopCategoryIds: [ { required: true, message: '请选择商户分类', trigger: 'blur' } ],
        brandId: [ { required: true, message: '请选择品牌', trigger: 'blur' } ],
        tempId: [ { required: true, message: '请选择运费模版', trigger: 'blur' } ],
        image: [ { required: true, message: '请上传产品主图', trigger: 'blur' } ],
        sliderImage: [ { required: true, message: '请上传轮播图', trigger: 'blur' } ],
        name: [ { required: true, message: '商品名称不能为空', trigger: 'blur' } ],
        title: [ { required: true, message: '商品简介不能为空', trigger: 'blur' } ],
        unitName: [ { required: true, message: '单位不能为空', trigger: 'blur' } ],
      },
      tenantIdApiConfig:{   // 商户列表
        apiFun: getShopList,
        parms: {},
        objMap: {value: 'id', label: 'shopName'}
      },
      guaranteeIdsApiConfig:{  // 服务条款
        apiFun: getProductGuaranteeList,
        parms: {},
        objMap: {value: 'id', label: 'name'}
      },
      platCategoryIdsApiConfig:{    // 平台分类
        apiFun: getProductCategoryPlatList,
        parms: {},
        objMap: {value: 'id', label: 'name'}
      },
      tenantCategoryIdsApiConfig:{  // 店铺分类
        apiFun: getProductCategoryShopList,
        parms: { },
        objMap: {value: 'id', label: 'name'}
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },

      forPramsData: {
        productCateList: [],
        tenantId: null, // 此处为选择商户后的id
        productAttrKeyList: [], // 商品属性key列表
        productAttrValueList: [], // 商品属性Value列表
<<<<<<< HEAD
        brandIdList: [] // 商品品牌集合
      }
    };
=======
        brandIdList:[], // 商品品牌集合
      },
      // SKU 列表 label
      skuListColumns:[
        // {
        //   dataIndex:'id',
        //   key:'id',
        //   title:'ID'
        // },
        {
          dataIndex:'sku',
          key:'sku',
          title:'SKU',
          width: 160,
          scopedSlots: { customRender: 'sku' },
        },
        {
          dataIndex:'costPrice',
          key:'costPrice',
          title:'成本价',
          width: 80,
          scopedSlots: { customRender: 'costPrice' },
        },
        {
          dataIndex:'crossedPrice',
          key:'crossedPrice',
          title:'划线价',
          width: 80,
          scopedSlots: { customRender: 'crossedPrice' },
        },
        // {
        //   dataIndex:'isShow',
        //   key:'isShow',
        //   title:'isShow'
        // },
        // {
        //   dataIndex:'ptmProductId',
        //   key:'ptmProductId',
        //   title:'平台ID'
        // },
        {
          dataIndex:'salePrice',
          key:'salePrice',
          title:'售价',
          width: 80,
          scopedSlots: { customRender: 'salePrice' },
        },
        {
          dataIndex:'stock',
          key:'stock',
          title:'库存',
          width: 80,
          scopedSlots: { customRender: 'stock' },
        },
        // {
        //   dataIndex:'createTime',
        //   key:'createTime',
        //   title:'创建时间'
        // },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ]
    }
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
  },
  created() {
    this.initProductEditData();
    this.tenantIdChange(this.formData.tenantId); // 根据商户加载对应属性key和value
  },
<<<<<<< HEAD
  methods: {
    async initProductEditData() {
      console.log('this.editId:', this.editId);
      if (this.editId) {
        const editData = await getProductDetail(this.editId);
        this.formData = { ...editData };
        this.formData.goodsDesc = '1111111';
        console.log('this.edit:', editData);
      }
    },
    // 商品维护表单提交方法，编辑和创建
    async onSubmitHandle() {
      if (this.editId) {
        await editProduct(this.formData, this.formData.id);
        this.$emit('onSubmitHandleSuccess');
      } else {
        await addProduct(this.formData);
        this.$emit('onSubmitHandleSuccess');
      }
=======
  methods:{
    async initProductEditData(){
      if(this.editId){
        const editData = await getProductDetail(this.editId);
        this.$nextTick(()=>{ // TODO For 渲染问题
          this.formData = {...editData};
          console.log("formData.tenantId:", this.formData.tenantId);
        });
      }
    },
    // 商品维护表单提交方法，编辑和创建
    async onSubmitHandle(){
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          if (this.editId) {
            await editProduct(this.formData, this.formData.id);
            this.$emit('onSubmitHandleSuccess');
          } else {
            await addProduct(this.formData);
            this.$emit('onSubmitHandleSuccess');
          }
        } else {
          return false;
        }
      });
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
    },
    async tenantIdChange(tenantId) {
      this.forPramsData.tenantId = tenantId;
      // 根据当前商户获取对应属性名称
<<<<<<< HEAD
      this.handleAttrKeyChange({ tenantId: this.forPramsData.tenantId });
=======
      await this.handleAttrKeyChange({tenantId:this.forPramsData.tenantId});
      // 设置商户id获取商户分类
      this.tenantCategoryIdsApiConfig.parms = { tenantId:this.forPramsData.tenantId };
      // 或者商户对应的服务条款
      this.guaranteeIdsApiConfig.parms = { tenantId:this.forPramsData.tenantId };
      // 切换商户后所有商户相关的基础属性手动清空
      this.formData.shopCategoryIds = '';
      this.formData.brandId = '';
      this.formData.guaranteeIds = '';
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
    },
    cateIdChange(cid) {
      this.formData.platCategoryIds = cid;
      this.getProductBrandListByCid();
    },
    // 根据分类id获取品牌
    async getProductBrandListByCid() {
      this.formData.shopCategoryIds = null;
      this.forPramsData.brandIdList = await listOfProductBrandByCid(
        this.formData.platCategoryIds
      );
      console.log(
        'this.forPramsData.brandIdList:',
        this.forPramsData.brandIdList
      );
    },
    UploadSngle(fileUrl, item) {
      console.log('item:', item);
      item.image = fileUrl;
    },
    // 选择属性key
    async handleAttrKeyChange(params) {
      this.forPramsData.productAttrKeyList = await getProductAttrKeyList(
        params
      );
    },
    // 根据选择的attrKeyID加载AttrValue
    async handleAttrValueChange(selectedAttrKey) {
      console.log('selectedAttrKey:', selectedAttrKey);
      this.forPramsData.productAttrValueList = await getProductAttrValueList({
        ptmProductAttrKeyId: selectedAttrKey.key
      });
    },
    async handleSkuList() {
      let attrKey = [this.formData.attrKey.label.trim()];
<<<<<<< HEAD
      let attrValue = [this.formData.attrValue.map((obj) => obj.label.trim())];
      this.formData.skuList = await makeSkuTempList({
        attrKeyList: attrKey,
        attrValList: attrValue
      });
=======
      let attrValue =[this.formData.attrValue.map(obj => obj.label.trim())];
      this.formData.skuList = await makeSkuTempList({attrKeyList:attrKey, attrValList:attrValue});
    },
    handleSkuDelete(text, record, index){
      this.formData.skuList = this.formData.skuList.filter(item => item.id !== record.id);
    },
    handleSKUChange (value, sku, column) {
      const newData = [...this.formData.skuList];
      const target = newData.find(item => sku === item.sku);
      if (target) {
        target[column] = value;
        this.formData.skuList = newData;
      }
>>>>>>> b3435e7cf411550fc4ad4b1d3fe84fc8abb1ab31
    }
  }
};
</script>

<style scoped lang="less"></style>
