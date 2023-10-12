<template>
  <div>
    <RichEditor v-model="richHtml"></RichEditor>
  </div>
</template>

<script>
  import RichEditor from '@/components/RichEditor/index.vue';
  // import {columns, moduleConfig} from './pageConfig';

  export default {

    name: 'dept',
    components: {
      RichEditor
    },
    data() {
      return {
        richHtml:""
      };
    },
    created() {

    },
    methods: {

    }
  };
</script>

<style lang="less" scoped></style>
