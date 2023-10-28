# ySearch

该组件是查询表单，可以和yTable配合使用



## 何时使用

在需要用到查询的业务的时候可以使用改组件



# API

## 属性列表

| 参数        | 说明                                           | 类型    | 默认值/实例 | 是否必填 |
| ----------- | ---------------------------------------------- | ------- | ----------- | -------- |
| scopedSlots | 配置查询表单项的数组（对应columns的dataIndex） | Array   | []          | 否       |
| columns     | 数据列配置（table的columns配置，需要有一个）   | Array   | []          | 否       |
| loading     | 加载中                                         | Boolean | false       | 否       |

**传递scopedSlots示例**

```vue
  <y-search
      :scopedSlots="['isShow', 'id']"
      :loading="table.loading"
      @search="search"
   ></y-search>
```

**对应的columns示例**

```js
//columns
const columns = [
  {
    title: '主键',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    ellipsis: true
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
    title: '操作',
    key: 'operation',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    ellipsis: true
  }
];
```





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



**searchFormObj**

这里的查询表单的对象，是根据columns的配置，默认都会加入查询列

如果formType类型是datePicker

​	那么这个dataIndex会处理成两个属性，${dataIndex}Start,${dataIndex}End

其他以及默认情况是searchFormObj里面的属性是columns里每一项的dataIndex，值对应y-search表单项的值

## 插槽列表

配置的scopedSlots数组的每一项都是一个插槽



**插槽用法示例**

使用a-form-model-item组件，来传递插槽，并且把插槽提供的对象的form属性里面对应的column列配置的dataIndex进行一个v-model绑定

```vue
<y-search
      :scopedSlots="['isShow', 'id']"
      :loading="table.loading"
      @search="search"
   >
    <a-form-model-item slot="isShow" slot-scope="{ form }" label="状态">
        <a-select v-model="form.isShow" allowClear placeholder="选择显示状态">
            <a-select-option :value="0"> 不显示</a-select-option>
            <a-select-option :value="1"> 显示</a-select-option>
        </a-select>
    </a-form-model-item>
</y-search>

```



# 组件作者

一源团队-花和尚

