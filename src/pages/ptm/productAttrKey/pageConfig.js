const columns = [
  {
    title: '主键',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    ellipsis: true
  },
  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 110,
    ellipsis: true
  },
  {
    title: '商品分类',
    dataIndex: 'ptmProductCategoryId',
    key: 'ptmProductCategoryId',
    width: 100,
    ellipsis: true
  },
  {
    title: '属性',
    key: 'attrKey',
    dataIndex: 'attrKey',
    width: 200
  },
  {
    title: '显示',
    key: 'isShow',
    dataIndex: 'isShow',
    width: 70,
    scopedSlots: { customRender: 'isShow' }
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 180
  },
  {
    title: '修改时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    width: 180
  },
  {
    title: '创建人',
    key: 'createUser',
    dataIndex: 'createUser',
    width: 160,
    ellipsis: true
  },
  {
    title: '修改人',
    key: 'updateUser',
    dataIndex: 'updateUser',
    width: 160,
    ellipsis: true
  },
  {
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    ellipsis: true
  }
];

export { columns };
