export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          globalConfig: {
            imgBaseUrl: process.env.VUE_APP_IMG_BASE_URL
          }
          // cjImgBaseUrl: "http://116.63.167.31:40009/mallgoods-dev",
          // imgBaseUrl: "https://h5.haomeiwei.top",
          // //ossUploadUrl: "http://localhost:8081/mall-api/admin/minio/upload",
          // ossUploadUrl: "https://h5.haomeiwei.top/mall-api-dev/mall-api/admin/minio/upload",
        };
      },
      computed: {},
      methods: {}
    });
  }
};
