# SearchForm 查询表单容器

主要用于生成一个查询表单的容器，可以存在多个字段的查询，默认只展示一行，可以进行展开和收起，重置等功能



## 何时使用

可以应用于很多的场景的查询以及管理页面





## 代码演示





## API

### 属性列表

| 参数           | 说明                   | 类型  | 默认值/实例                     | 是否必填 | 版本 |
| -------------- | ---------------------- | ----- | ------------------------------- | -------- | ---- |
| searchFormList | 查询表单的一个配置列表 | Array | [crtl点击查看](#searchFormList) | 是       |      |





### 事件列表

| 事件名称 | 说明         | 参数值                          | 场景 |
| -------- | ------------ | ------------------------------- | ---- |
| onSearch | 点击查询按钮 | [crtl点击查看](#onSearchParams) |      |









<span id = "onSearchParams">**onSearch参数**</span>

（uSearchFormList）

```js
uSearchFormList : [{
    key : "", //传递过来的searchFormList的key
    value : "", //这个key的一个查询表单项对应的查询的query值
}]
```





<span id = "searchFormList">**searchFormList示例**</span>

```js
searchFormList : [{
	type, //默认值是input  'input' | 'inputSearch' | 'datePicker' | 'rangePicker' | 'select'   
    /*
    	input         <a-input />    普通搜索框
    	inputSearch   <a-input-search />  带查询图标的搜索框
    	datePicker    <a-date-picker />  format 格式化显示，YYYY-MM-DD HH:MM:SS 日期选择器
    	rangePicker   <a-range-picker /> format placeholder = [] 日期的范围选择器
    	select        <a-select ></a-select> 
    */
    title, //'默认值为'' 查询字段名称',
    format, //默认值: YYYY-MM-DD HH:mm:ss  类型为datePicker的时候
    options, //默认值: [] 类型为select的时候
    labelText, //默认值是title label显示的字段文字
}]
```

