# ySearch

该组件是查询表单，可以和yTable配合使用



## 何时使用

在需要用到查询的业务的时候可以使用改组件



# API

## 属性列表

| 参数        | 说明                                         | 类型    | 默认值/实例 | 是否必填 |
| ----------- | -------------------------------------------- | ------- | ----------- | -------- |
| scopedSlots | 配置查询表单项的数组（对应columns）          | Array   | []          | 否       |
| columns     | 数据列配置（table的columns配置，需要有一个） | Array   | []          | 否       |
| loading     | 加载中                                       | Boolean | false       | 否       |



## columns

| 参数      | 说明                       | 类型    | 默认值/实例 | 是否必填 |
| --------- | -------------------------- | ------- | ----------- | -------- |
| dataIndex | 列数据在数据项中对应的 key | string  | ""          | 否       |
| formType  | 对应表单类型               | string  | ''"         | 否       |
| noSearch  | 设置是否加入查询           | boolean | /           | 否       |
| title     | 列标签                     | string  | ""          | 是       |



## 事件列表

| 事件名称 | 说明 | 回调参数      |
| -------- | ---- | ------------- |
| search   | 查询 | searchFormObj |



```
searchFormObj:{
	formType,
	dataIndex,
	`${dataIndex}Start`,
	`${dataIndex}End`,
}
```





# 组件作者

一源团队-花和尚


