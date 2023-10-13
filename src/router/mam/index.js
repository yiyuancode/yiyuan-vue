import { gertRouterArray } from '@/utils/autoRouterUtil.js';

const modules = gertRouterArray(require.context('./modules', false, /\.js$/));

const mam = {
  path: '/mam',
  name: 'mam',
  component: () => import('@/components/layout/Layout/index.vue'),

  meta: {
    title: '营销管理',
    permissions: 'mam',
    sort: 0
  },
  children: modules
};
export default mam;
