import { gertRouterArray } from '@/utils/autoRouterUtil.js';

const modules = gertRouterArray(require.context('./modules', false, /\.js$/));

const ptm = {
  path: '/ptm',
  name: 'ptm',
  component: () => import('@/components/layout/Layout/index.vue'),

  meta: {
    title: '商品管理',
    permissions: 'ptm',
    sort: 0
  },
  children: modules
};
export default ptm;
