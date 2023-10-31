import { gertRouterArray } from '@/utils/autoRouterUtil.js';

const modules = gertRouterArray(require.context('./modules', false, /\.js$/));

const spm = {
  path: '/spm',
  name: 'spm',
  component: () => import('@/components/layout/Layout/index.vue'),

  meta: {
    title: '商户管理',
    permissions: 'spm',
    sort: 0
  },
  children: modules
};
export default spm;
