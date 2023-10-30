const columns = [

  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 160,
  },

  {
    title: '平台类型',
    dataIndex: 'platform',
    key: 'platform',
    width: 160,
    scopedSlots: {
      customRender: 'platform'
    }
  },

  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    noEdit: true,
    noAdd: true
  },

  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true
  },

  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    // width: 160,
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true,
    fixed: 'right',
    scopedSlots: {
      customRender: 'operation'
    }
  }
];

export { columns };
