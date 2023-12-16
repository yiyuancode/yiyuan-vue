import {getEnumsMap} from "@/utils/enumsUtils.js";
const columns = [
  {
    title: '主键',
    dataIndex: 'id',
    key: 'id',
    width: 70,
    ellipsis: true,
    scopedSlots: {customRender: 'id'},
  },
  {
    title: '商户id',
    dataIndex: 'tenantId',
    key: 'tenantId',
    width: 150,
    ellipsis: true,
    scopedSlots: {customRender: 'tenantId'},
  },
  {
    title: '平台分类',
    dataIndex: 'ptmProductCategoryId',
    key: 'ptmProductCategoryId',
    width: 100,
    ellipsis: true,
    scopedSlots: {customRender: 'ptmProductCategoryId'},
  },
  {
    title: '属性',
    key: 'attrKey',
    dataIndex: 'attrKey',
    width: 180
  },
  {
    title: '显示',
    key: 'isShow',
    dataIndex: 'isShow',
    width: 70,
    scopedSlots: { customRender: 'isShow' },
    props: {
      options: [
        {
          label: '隐藏',
          value: false
        },
        {
          label: '显示',
          value: true
        }
      ]
    },
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
const enumsMap = getEnumsMap(columns);
export { columns, enumsMap };
