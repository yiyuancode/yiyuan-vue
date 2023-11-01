<template>
  <div class="manage-container">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="地址" prop="sysAreaId">
        <!-- <a-input
          v-model="formData.name"
          placeholder="请选择店铺地址"
          allowClear
        /> -->
        <yAreaSelect></yAreaSelect>
      </a-form-model-item>
      <a-form-model-item label="店铺详细地址" prop="shopAddress">
        <a-input
          v-model="formData.shopAddress"
          placeholder="请输入店铺地址"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户名称" prop="merchantName">
        <a-input
          v-model="formData.merchantName"
          placeholder="请输入商户名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户邮箱" prop="merchantEmail">
        <a-input
          v-model="formData.merchantEmail"
          placeholder="请输入商户邮箱"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户手机号" prop="merchantPhone">
        <a-input
          v-model="formData.merchantPhone"
          placeholder="请输入商户手机号"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户法人" prop="merchantLegalRepresentative">
        <a-input
          v-model="formData.merchantLegalRepresentative"
          placeholder="请输入商户法人"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户分类" prop="merchantCategory">
        <a-input
          v-model="formData.merchantCategory"
          placeholder="请输入商户分类"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户类别" prop="merchantType">
        <a-input
          v-model="formData.merchantType"
          placeholder="请输入商户类别"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户手续费" prop="merchantFee">
        <a-input
          v-model="formData.merchantFee"
          placeholder="请输入商户手续费"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商户星级" prop="merchantRating">
        <a-input
          v-model="formData.merchantRating"
          placeholder="请输入商户星级"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="资质图片" prop="qualificationImages">
        <a-input
          v-model="formData.qualificationImages"
          placeholder="请输入资质图片"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺名称" prop="shopName">
        <a-input
          v-model="formData.shopName"
          placeholder="请输入店铺名称"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺背景图" prop="shopBackgroundImage">
        <a-input
          v-model="formData.shopBackgroundImage"
          placeholder="请输入店铺背景图"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item
        label="推荐店铺背景图"
        prop="recommendedShopBackgroundImage"
      >
        <a-input
          v-model="formData.recommendedShopBackgroundImage"
          placeholder="请输入推荐店铺背景图"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺封面图" prop="shopCover">
        <a-input
          v-model="formData.shopCover"
          placeholder="请输入店铺封面图"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺logo" prop="shopLogo">
        <a-input
          v-model="formData.shopLogo"
          placeholder="请输入店铺logo"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺简介" prop="shopDescription">
        <!-- <a-input
          v-model="formData.shopDescription"
          placeholder="请输入店铺简介"
          allowClear
        /> -->
        <a-textarea
          placeholder="请输入店铺简介"
          v-model="formData.shopDescription"
          allow-clear
        />
      </a-form-model-item>
      <a-form-model-item label="店铺类型" prop="shopType">
        <!-- <a-input
          v-model="formData.shopType"
          placeholder="请输入店铺类型"
          allowClear
        /> -->
        <yShopSelect v-model="formData.shopType" />
      </a-form-model-item>
      <a-form-model-item label="库存告警阈值" prop="inventoryAlert">
        <a-input
          v-model="formData.inventoryAlert"
          placeholder="请输入库存告警阈值"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="是否支持自提" prop="isSupportsSelfPickup">
        <a-radio-group v-model="formData.isSupportsSelfPickup">
          <a-radio :value="true"> 是 </a-radio>
          <a-radio :value="false"> 否 </a-radio>
        </a-radio-group>
      </a-form-model-item>

      <a-form-model-item label="结算类型" prop="settlementType">
        <a-radio-group v-model="formData.settlementType">
          <a-radio :value="1"> 银行卡 </a-radio>
          <a-radio :value="2"> 微信 </a-radio>
          <a-radio :value="3"> 支付宝 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="收款人" prop="bankPayee">
        <a-input
          v-model="formData.bankPayee"
          placeholder="请输入收款人"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="开户银行" prop="bankNumber">
        <a-input
          v-model="formData.bankNumber"
          placeholder="请输入开户银行"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="开户行地址" prop="bankAddress">
        <a-input
          v-model="formData.bankAddress"
          placeholder="请输入开户行地址"
          allowClear
        />
      </a-form-model-item>

      <a-form-model-item label="真实姓名" prop="wechatRealName">
        <a-input
          v-model="formData.wechatRealName"
          placeholder="请输入真实姓名"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="微信号" prop="wechatAccount">
        <a-input
          v-model="formData.wechatAccount"
          placeholder="请输入微信号"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="收款二维码" prop="wechatQrCode">
        <a-input
          v-model="formData.wechatQrCode"
          placeholder="请输入收款二维码"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="真实姓名" prop="alipayRealName">
        <a-input
          v-model="formData.alipayRealName"
          placeholder="请输入真实姓名"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="支付宝二维码" prop="alipayAccount">
        <a-input
          v-model="formData.alipayAccount"
          placeholder="请输入支付宝二维码"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="是否加入审核" prop="isAudit">
        <a-radio-group v-model="formData.isAudit">
          <a-radio :value="false"> 否 </a-radio>
          <a-radio :value="true"> 是 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="排序" prop="sort">
        <a-input
          v-model="formData.sort"
          placeholder="请输入排序值"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="状态" prop="isShow">
        <a-radio-group v-model="formData.isShow">
          <a-radio :value="false"> 不显示 </a-radio>
          <a-radio :value="true"> 显示 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <a-button style="margin-left: 10px" @click="resetForm"> 重置 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getShopDetail, shopTypeList, editShop, addShop } from '@/api/spm/shop';
export default {
  props: {
    editId: {
      // 待编辑数据
      type: String,
      require: false
    }
  },
  data() {
    return {
      formData: {
        spmShopTypeId: null, //店铺类型id
        sysAreaId: null, //地址id
        shopAddress: '', //店铺详细地址
        merchantName: null, //商户名称
        merchantEmail: null, //商户邮箱
        merchantPhone: '', //商户手机号
        merchantLegalRepresentative: null, //商户法人
        merchantCategory: '', //商户分类
        merchantType: '', //商户类别
        merchantFee: '', //商户手续费
        merchantRating: '', //商户星级
        qualificationImages: '', //资质图片
        shopName: '', //店铺名称
        shopOwnerAvatar: '', //店铺主头像
        shopBackgroundImage: '', //店铺背景图
        recommendedShopBackgroundImage: '', //推荐店铺背景图
        shopCover: '', //店铺封面图
        shopLogo: '', //店铺logo
        shopDescription: '', //店铺简介
        shopType: '', //店铺类型
        inventoryAlert: 0, //库存告警阈值
        isSupportsSelfPickup: false, //是否支持自提
        settlementType: 2, //结算类型#1=银行卡|2=微信|3=支付宝
        bankPayee: '', //银行卡结算-收款人
        bankNumber: '', //银行卡结算-开户银行
        bankAddress: '', //银行卡结算-开户行地址
        wechatRealName: '', //微信结算-真实姓名
        wechatAccount: '', //微信结算-微信号
        wechatQrCode: '', //微信结算-收款二维码
        alipayRealName: '', //支付宝结算-真实姓名
        alipayAccount: '', //支付宝结算-微信号
        alipayQrCode: '', //支付宝结算-收款二维码
        isAudit: false, //是否加入审核
        sort: 0, //排序
        isShow: false //显示状态
      },
      shopType:[],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules: {
        sysAreaId: [
          { required: true, message: '请选择店铺地址', trigger: 'blur' }
        ],
        shopAddress: [
          { required: true, message: '请输入店铺详细地址', trigger: 'blur' }
        ],
        merchantName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        merchantPhone: [
          { required: true, message: '请输入商户手机号', trigger: 'blur' }
        ],
        merchantLegalRepresentative: [
          { required: true, message: '请输入商户法人', trigger: 'blur' }
        ],
        merchantCategory: [
          { required: true, message: '请输入商户分类', trigger: 'blur' }
        ],
        merchantFee: [
          { required: true, message: '请输入商户手续费', trigger: 'blur' }
        ],
        merchantRating: [
          { required: true, message: '请输入商户星级', trigger: 'blur' }
        ],
        qualificationImages: [
          { required: true, message: '请输入商户资质图片', trigger: 'blur' }
        ],
        shopName: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        shopOwnerAvatar: [
          { required: true, message: '请输入店铺主头像', trigger: 'blur' }
        ],
        shopBackgroundImage: [
          { required: true, message: '请输入店铺背景图', trigger: 'blur' }
        ],
        recommendedShopBackgroundImage: [
          { required: true, message: '请输入推荐店铺背景图', trigger: 'blur' }
        ],
        shopCover: [
          { required: true, message: '请输入店铺封面图', trigger: 'blur' }
        ],
        shopLogo: [
          { required: true, message: '请输入店铺Logo', trigger: 'blur' }
        ],
        shopDescription: [
          { required: true, message: '请输入店铺简介', trigger: 'blur' }
        ],
        shopType: [
          { required: true, message: '请输入店铺类型', trigger: 'blur' }
        ],
        inventoryAlert: [
          { required: true, message: '请输入库存告警阈值', trigger: 'blur' }
        ],
        isSupportsSelfPickup: [
          { required: true, message: '请选择是否支持自提', trigger: 'blur' }
        ],
        settlementType: [
          { required: true, message: '请选择店铺结算类型', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    if (this.editId) {
      this.getDetail();
    }
    this.getShopTypeList();
  },
  methods: {
    async getDetail() {
      let data = await getShopDetail(this.editId);
      this.formData = data;
    },
    // 提交表单
    onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.editId) {
            // 修改
            await editShop(this.formData, this.editId);
            this.$message.success('修改成功');
            this.$emit('onSaveSubmit');
          } else {
            // 添加
            await addShop(this.formData);
            this.$message.success('添加成功');
            this.$emit('onSaveSubmit');
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 店铺类别
    async getShopTypeList() {
      let response = await shopTypeList();
      this.shopType = response;
    }
  }
};
</script>
<style lang="scss" scoped>
.manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
