# yTable 

该组件可以用于基本的crud模块，也就是管理页面模块

组件内置功能：

- 查询表单

- 刷新页面
- 密度（设置表单的间距）默认|中等|紧凑
- 列设置的功能
  - 列设置可以进行拖拽列来控制列的位置
  - 控制列的显示隐藏
- 批量删除的功能（没有选择会禁用，选择了一个会开启）
- 编辑的功能
- 删除的功能
- 分页的功能（点击页码跳转）



## 何时使用

在需要使用到通用的管理页面，需要进行查询，添加，编辑，批量操作，分页，列设置等等功能可以进行使用





# API

## 属性列表

| 参数         | 说明                                                         | 类型             | 默认值/实例 | 是否必填 |
| ------------ | ------------------------------------------------------------ | ---------------- | ----------- | -------- |
| rowKey       | 表格行 key 的取值，可以是字符串或一个函数（对应ant-design-vue的a-table组件的rowKey属性） | String\|Function | ''""        | 否       |
| columns      | 表格列配置（对应ant-design-vue的a-table组件的columns属性），具体的配置请查看地址https://1x.antdv.com/components/table-cn/#Column | Array            | []          | 否       |
| records      | 数据数组（对应ant-design-vue的a-table组件的dataSource）      | Array            | []          | 否       |
| pagination   | 分页器，参考[配置项](https://1x.antdv.com/components/table-cn/#pagination)或 [pagination](https://1x.antdv.com/components/pagination-cn/)文档，设为 false 时不展示和进行分页 | object           | {}          | 否       |
| rowSelection | 列表项是否可选择（对应ant-design-vue的a-table组件的rowSelection），详细配置参考 | object           | {}          | 否       |
| loading      | 页面是否加载中（对应ant-design-vue的a-table组件的loading）   | boolean\|object  | false       | 否       |



### pagination

默认对象

```js
{
    pageNum: 1,//当前页
    pageSize: 10,//每页显示条数
    total: 0,//总页数
    pageSizeOptions: ['10', '20', '30', '40'],//指定每页可以显示多少条
    showSizeChanger: true,//是否可以改变 pageSize
    showTotal: (total) => `共 ${total} 条` // 显示总条数和当前数据范围
}
```



## 事件列表

| 事件名称 | 说明                       | 回调参数  |
| -------- | -------------------------- | --------- |
| change   | 分页、排序、筛选变化时触发 | changeObj |



### 表格变化的参数 changeObj

```js
//参数
{
      pageNum: pagination.current, //当前页
      pageSize: pagination.pageSize, //每页显示条数
      total: pagination.total, //总页数
      pageSizeOptions: pagination.pageSizeOptions, //指定每页可以显示多少条
      showSizeChanger: pagination.showSizeChanger, //是否可以改变 pageSize	
      showTotal: pagination.showTotal // 显示总条数和当前数据范围
}
```



## 插槽

| 插槽名称                          | 插槽含义                     | 插槽提供的参数                                               |
| --------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| operations                        | 操作                         | 暂无参数                                                     |
| columns的scopedSlots.customRender | 管理页面的表格中的某一列配置 | 参数和columns的scopedSlots.customRender插槽一致https://1x.antdv.com/components/table-cn/#Column，column的scopedSlots属性 |



columns的scopedSlots.customRender

```vue
<template>
	<y-table columns="columns">
    	<span slot="operation" slot-scope="{ text, record }">
            <a-tag>{{ text }}</a-tag> 
    	</span>
    </y-table>
</template>

<script>
	export default {
        data(){
            return {
                columns : [{
                    prop : "name",
                    title : "姓名"
                },{
                    prop : "role",
                    title : "角色",
                    scopedSlots : {customRender : "role"}
                }]
            }
        }
    }
</script>
```





# 问题记录

## 2023.10.25

1. 列设置发现问题，弹出的位置不对（应该弹出在列设置的位置）12:25

![](https://z1.ax1x.com/2023/10/25/piVAQMt.md.jpg)



2.批量删除，当没有选择的时候也能点击，并且可以确认删除，删除之后提示删除成功，并且又报了一个错误

![](https://z1.ax1x.com/2023/10/28/pieZBe1.md.jpg)

# 组件作者

一源团队-花和尚