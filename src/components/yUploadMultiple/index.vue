<template>
  <div class="clearfix">
    <!--    :show-upload-list="false"-->
    <a-upload
      list-type="picture-card"
      @preview="handlePreview"
      @change="handleChange"
      :file-list="fileList"
      :action="uploadUrl"
      :headers="{ satoken: myToken }"
    >
      <div>
        <div v-if="fileList.length < max">
          <a-icon type="plus"/>
          <div class="ant-upload-text">
            上传
          </div>
        </div>
      </div>

    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage"/>
    </a-modal>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex';

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  export default {
    computed: {
      ...mapGetters({
        myToken: 'user/myToken'
      }),
    },
    props: {
      //控制显示与隐藏
      value: {
        type: String,
        default: function () {
          return null;
        }
      },
      max: {
        type: Number,
        default: function () {
          return 8;
        }
      },

    },
    created() {
      if (this.value) {
        this.fileIdList = this.value.split(",");
        this.fileIdList.forEach((item) => {
          this.fileList.push({
            uid: item,
            name: item,
            status: 'done',
            url: this.globalConfig.imgBaseUrl + item,
            response: {
              data: item
            }
          })
        })
        console.log("this.fileList", this.fileList)
      }
    },
    data() {
      return {
        uploadUrl: process.env.VUE_APP_API_BASE_URL + '/file/upload',
        previewVisible: false,
        previewImage: '',
        fileList: [],
        fileIdList: [],

      };
    },
    methods: {
      handleCancel() {
        this.previewVisible = false;
      },
      handlePreview(file) {
        this.previewImage = this.globalConfig.imgBaseUrl + file.response.data
        this.previewVisible = true;
      },
      handleChange({file, fileList, event}) {
        this.fileList = fileList;
        if (file.status == 'removed') {
          this.fileIdList = fileList.map(function (item) {
            return item.response ? item.response.data : item.uid;
          });

        }
        if (file.status == 'done') {
          if (file.response.code == 200) {
            this.fileIdList = fileList.map(function (item) {
              return item.response.data;
            });
            // this.fileIdList.forEach((item) => {
            //   this.fileList.push({
            //     uid: item,
            //     name: item,
            //     status: 'done',
            //     url: this.globalConfig.imgBaseUrl + item,
            //   })
            // })
          }
        }
        this.$emit("input", this.fileIdList.join(","))
        this.$emit("change", this.fileIdList.join(","))
        console.log("imgs", this.fileIdList.join(","))
      },
    },
  };
</script>
<style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
