import {gertRouterArray} from "@/utils/autoRouterUtil.js";

const modules = gertRouterArray(require.context('./modules', false, /\.js$/))


const ptm = {
  path: '/ptm',
  name: 'ptm',
  component: () => import('@/components/layout/Layout/index.vue'),
  //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
  meta: {
    title: '商品管理',
    permissions: 'ptm',
    sort: 1
  },
  children: modules
}
export default ptm;

