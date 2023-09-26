<template>
  <div class="common-layout">
    <div class="content">
      <slot></slot>
    </div>
    <page-footer :link-list="footerLinks" :copyright="copyright"></page-footer>
  </div>
</template>

<script>
import PageFooter from '@/layouts/footer/PageFooter';

export default {
  name: 'CommonLayout',
  components: { PageFooter },
  data() {
    return {
      footerLinks: [
        //页面底部链接，{link: '链接地址', name: '名称/显示文字', icon: '图标，支持 ant design vue 图标库'}
        { link: 'https://pro.ant.design', name: 'Pro首页' },
        { link: 'https://github.com/iczer/vue-antd-admin', icon: 'github' },
        { link: 'https://ant.design', name: 'Ant Design' }
      ],
      copyright: '2023 YIYUAN 工作室出品' //copyright
    };
  }
};
</script>

<style scoped lang="less">
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-color: @layout-body-background;
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 110px;
  background-size: 100%;

  .content {
    padding: 32px 0;
    flex: 1;
    @media (min-width: 768px) {
      padding: 112px 0 24px;
    }
  }
}
</style>
