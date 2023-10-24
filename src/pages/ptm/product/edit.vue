<template>
  <div class="manage-container">
    <a-form-model
      :model="formData"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="商品分类">
        <a-cascader
          v-model="formData.productCateId"
          :options="forPramsData.productCateList"
          placeholder="请选择商品分类"
        />
      </a-form-model-item>
      <a-form-model-item label="属性名">
        <a-input v-model="formData.attrKey" placeholder="请输入属性名" allowClear/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmitHandle"> 创建 </a-button>
        <a-button style="margin-left: 10px"> 取消 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { makeSkuTempList } from '@/api/ptm/productSku'
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
        tenantCategoryId: null,   // 平台分类id TODO 字段名称待优化
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
        sales: 0,                 // 实际销量
        fictiSales: 0,            // 虚拟销量
        // browse: 0,             // 浏览量
        tenantSort: 0,            // 排序
        isSub: true,              // 分佣模式
        // isAudit: true,
        // auditStatus: ,
        goodsDesc: null,          // 商品富文本描述
        codePath: null,           // 商品二维码/小程序码
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
        productCateList: []
      }
    }
  },
  created(){

  },
  methods:{
    // 商品维护表单提交方法，编辑和创建
    onSubmitHandle(){

    }
  }
}
</script>

<style scoped lang="less">

</style>
