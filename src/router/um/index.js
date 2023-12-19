import { gertRouterArray } from '@/utils/autoRouterUtil.js';

const modules = gertRouterArray(require.context('./modules', false, /\.js$/));

const um = {
  path: '/um',
  name: 'um',
  component: () => import('@/components/layout/Layout/index.vue'),

  meta: {
    title: '积分管理',
    permissions: 'um',
    sort: 0
  },
  children: modules
};
export default um;
