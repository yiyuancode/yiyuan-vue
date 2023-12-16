import {getEnumsMap} from "@/utils/enumsUtils.js";
const columns = [
  {
    title: '主键',
    dataIndex: 'id',
    key: 'id',
    width: 70,
    fixed: 'left',
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
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    width: 130,
    scopedSlots: { customRender: 'operation' },
    fixed: 'right'
  }
];
const enumsMap = getEnumsMap(columns);
export { columns, enumsMap };
