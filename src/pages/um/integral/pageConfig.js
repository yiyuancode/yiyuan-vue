/**
 * 积分页面组件配置配置
 *
 * @author  spring
 * @date 2023-12-19
 */
import * as integral from '@/api/um/integral';
import { getEnumsMap } from '@/utils/enumsUtils.js';

const columns = [
  {
    title: '',
    dataIndex: 'id',
    key: 'id',
    width: 160,
    ellipsis: true,
    rules: [{ required: true, message: '请输入', trigger: 'blur' }],
    noEdit: true,
    noAdd: true,
    noSearch: true,
    noShow: true,
    noTable: true
  },

  {
    title: '用户id',
    dataIndex: 'uid',
    key: 'uid',
    width: 160,
    ellipsis: true
  },

  {
    title: '积分',
    dataIndex: 'integral',
    key: 'integral',
    width: 160,
    noSearch: true,

    ellipsis: true
  },

  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: 160,
    scopedSlots: {
      customRender: 'type'
    }
  },
  {
    title: '时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 160,
    ellipsis: true,

    props: {
      showTime: true,
      style: { width: '100%' }
    },
    formType: 'datePicker',
    rules: function () {
      return [{ required: true, message: '请选择', trigger: 'change' }];
    },
    noEdit: true,
    noAdd: true
  },


];

// 模块配置
const moduleConfig = {
  module: integral,
  moduleAdd: 'addIntegral',
  moduleEdit: 'editIntegral',
  moduleDelete: 'deleteIntegral',
  moduleGetList: 'getIntegralPageList',
  moduleGetDetail: 'getIntegralDetail',
  moduleName: '积分'
};

// 权限对象
const permissionObj = {
  id: 'um:integral',
  addBtn: 'um:integral:add',
  editBtn: 'um:integral:edit',
  deleteBtn: 'um:integral:delete'
};
//转化map
const enumsMap = getEnumsMap(columns);
export { columns, moduleConfig, permissionObj, enumsMap };
