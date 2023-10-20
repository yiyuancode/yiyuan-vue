<template>
  <a-table :columns="columns" :data-source="data">
    <a slot="name" slot-scope="text">{{ text }}</a>

    <div slot="age" slot-scope="text">
      <div style="display: flex;">
        <a-button type="primary" >
          Primary
        </a-button>
        <a-button type="primary" >
          Primary
        </a-button>
      </div>

    </div>
  </a-table>
</template>
<script>
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: {customRender: 'name'},
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 80,
      scopedSlots: {customRender: 'age'},
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address 1',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column Long Column',
      dataIndex: 'address',
      key: 'address 2',
      ellipsis: true,
    },
    {
      title: 'Long Column Long Column',
      dataIndex: 'address',
      key: 'address 3',
      ellipsis: true,
    },
    {
      title: 'Long Column',
      dataIndex: 'address',
      key: 'address 4',
      ellipsis: true,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  export default {
    data() {
      return {
        data,
        columns,
      };
    },
  };
</script>
<style lang="less" scoped>


  /*/deep/ .ant-table-thead > tr > th {*/
  /*  padding: 10px 12px !important;*/
  /*  !*line-height: 0px!important;*!*/
  /*}*/

  /*/deep/ .ant-table-tbody > tr > td {*/
  /*  padding: 10px 12px !important;*/

  /*}*/


</style>
