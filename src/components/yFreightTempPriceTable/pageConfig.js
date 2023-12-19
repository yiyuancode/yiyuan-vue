/**
 * 物流模板价格页面组件配置配置
 *
 * @author  一源团队-花和尚
 * @date 2023-11-05
 */
import * as freightTempPrice from '@/api/ftm/freightTempPrice';

const columns = [
  {
    title: '城市',
    dataIndex: 'sysAreaIds',
    key: 'sysAreaIds',
    width: 200,
    scopedSlots: { customRender: 'sysAreaIds' }
  },

  {
    title: '首件',
    dataIndex: 'firstNum',
    key: 'firstNum',
    width: 100,
    scopedSlots: { customRender: 'firstNum' }
  },
  {
    title: '运费',
    dataIndex: 'firstPrice',
    key: 'firstPrice',
    width: 100,
    scopedSlots: { customRender: 'firstPrice' }
  },

  {
    title: '续件',
    dataIndex: 'nextNum',
    key: 'nextNum',
    width: 100,
    scopedSlots: { customRender: 'nextNum' }
  },
  {
    title: '续费',
    dataIndex: 'nextPrice',
    key: 'nextPrice',
    width: 100,
    scopedSlots: { customRender: 'nextPrice' }
  },
  {
    title: '满件包邮',
    dataIndex: 'fullPackageNum',
    key: 'fullPackageNum',
    width: 120,
    scopedSlots: { customRender: 'fullPackageNum' }
  },

  {
    title: '满价包邮',
    dataIndex: 'fullPackagePrice',
    key: 'fullPackagePrice',
    width: 120,
    scopedSlots: { customRender: 'fullPackagePrice' }
  },
  {
    title: '操作',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
  // {
  //   title: '是否包邮',
  //   dataIndex: 'isPackage',
  //   key: 'isPackage',
  //   width: 160,
  //   formType: "radioGroup",
  //   props: {
  //     options: [
  //       {
  //         label: '否',
  //         value: 0,
  //       },
  //       {
  //         label: '是',
  //         value: 1,
  //       },
  //     ],
  //     style:
  //       {
  //         width: '100%'
  //       }
  //   },
  //   scopedSlots: {customRender: 'isPackage'},
  //
  // },
];

// 模块配置
const moduleConfig = {
  module: freightTempPrice,
  moduleAdd: 'addFreightTempPrice',
  moduleEdit: 'editFreightTempPrice',
  moduleDelete: 'deleteFreightTempPrice',
  moduleGetList: 'getFreightTempPricePageList',
  moduleGetDetail: 'getFreightTempPriceDetail',
  moduleName: '物流模板价格'
};

// 权限对象
const permissionObj = {
  id: 'ftm:freightTempPrice',
  addBtn: 'ftm:freightTempPrice:add',
  editBtn: 'ftm:freightTempPrice:edit',
  deleteBtn: 'ftm:freightTempPrice:delete'
};

export { columns, moduleConfig, permissionObj };
