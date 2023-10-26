# ySearch

该组件是查询表单，可以和yTable配合使用



## 何时使用

在需要用到查询的业务的时候可以使用改组件



# API

## 属性列表

| 参数        | 说明                                         | 类型 | 默认值/实例 | 是否必填 |
| ----------- | -------------------------------------------- | ---- | ----------- | -------- |
| scopedSlots |                                              |      | 0           | 否       |
| columns     | 数据列配置（table的columns配置，需要有一个） |      | []          | 否       |
| loading     |                                              |      | false       | 否       |



## 事件列表

| 事件名称 | 说明 | 回调参数      |
| -------- | ---- | ------------- |
| search   | 查询 | searchFormObj |



### 查询表单的参数 searchFormObj（）

```js
searchFormObj:{
    prop : [columns.dataIndex]
}
```



# 组件作者

一源团队-花和尚


