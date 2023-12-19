<template>
  <div>
    <span v-if="value">是</span>
    <span v-if="!value">否</span>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less">
.yImg {
  width: 100%;
  height: 100%;
}
</style>
