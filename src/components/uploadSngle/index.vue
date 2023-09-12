<template>
  <a-upload
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="uploadUrl"
    :headers="{ satoken: myToken }"
    @change="handleChange"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="avatar"
      style="width: 120px; height: 120px; object-fit: cover"
    />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
import { mapGetters } from 'vuex';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  computed: {
    ...mapGetters({
      myToken: 'account/myToken'
    })
  },
  props: {
    //控制显示与隐藏
    value: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      loading: false,
      imageUrl: '',
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/file/upload'
    };
  },
  methods: {
    handleChange(info) {
      let vm = this;
      console.log('upload.handleChange', info);
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (imageUrl) => {
          vm.imageUrl = imageUrl;
          vm.loading = false;
          vm.$emit('input', info.file.response.message);
          vm.$emit('UploadSngle', info.file.response.message);
        });
      }
    }
  }
};
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
