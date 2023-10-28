<template>
  <div>
    <img
      class="yImg"
      :style="{
        width: width ? width + 'px' : '100%',
        height: width ? width + 'px' : '100%'
      }"
      :src="src"
      @error="dealErr($event)"
      @click="previewImg(src)"
    />
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: ['src', 'width'],
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        ]
      };
    },
    created() {
      // if (this.src.indexOf("undefined")!=-1) {
      //   this.src = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      // }
      // this.html = this.value;
    },
    methods: {
      dealErr(e) {
        e.target.src = this.url;
      },
      previewImg(src) {
        this.$hevueImgPreview(src);
      }
    }
  };
</script>
<style lang="less">
  .yImg {
    width: 100%;
    height: 100%;
  }
</style>
