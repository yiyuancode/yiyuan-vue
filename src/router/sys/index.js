import { gertRouterArray } from '@/utils/autoRouterUtil.js';

const modules = gertRouterArray(require.context('./modules', false, /\.js$/));

const sys = {
  path: '/sys',
  name: 'sys',
  component: () => import('@/components/layout/Layout/index'),
  //只有存放在meta信息里面的其他字段才能被this.$route获取到,不能和path平级
  meta: {
    title: '系统管理',
    permissions: 'sys',
    sort: 2
  },
  children: modules
};
export default sys;
