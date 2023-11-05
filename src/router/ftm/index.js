import {gertRouterArray} from "@/utils/autoRouterUtil.js";

const modules = gertRouterArray(require.context('./modules', false, /\.js$/))

const ftm = {
  path: '/ftm',
  name: 'ftm',
  component: () => import( '@/components/layout/Layout/index.vue'),

  meta: {
    title: '物流管理',
    permissions: 'ftm',
    sort: 0
  },
  children: modules
}
export default ftm;

