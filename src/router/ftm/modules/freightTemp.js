const freightTemp = {
  path: 'freightTemp',
  name: 'freightTemp',
  component: () => import( '@/pages/ftm/freightTemp/index.vue'),
  meta: {
    title: '物流模板管理',
    keepAlive: true,
    permissions: 'ftm:freightTemp',
    sort: 0
  }
}
export default freightTemp;
