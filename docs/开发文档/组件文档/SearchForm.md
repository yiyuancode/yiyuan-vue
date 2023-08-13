# SearchForm 查询表单容器

主要用于生成一个查询表单的容器，可以存在多个字段的查询，默认只展示一行，可以进行展开和收起，重置等功能



## 何时使用

可以应用于很多的场景的查询以及管理页面







## API

### 属性列表

| 参数           | 说明                   | 类型  | 默认值/实例                     | 是否必填 | 版本 |
| -------------- | ---------------------- | ----- | ------------------------------- | -------- | ---- |
| searchFormList | 查询表单的一个配置列表 | Array | [crtl点击查看](#searchFormList) | 是       |      |





### 事件列表

| 事件名称 | 说明         | 参数值                          | 场景 |
| -------- | ------------ | ------------------------------- | ---- |
| onSearch | 点击查询按钮 | [crtl点击查看](#onSearchParams) |      |





<span id = "onSearchParams">**onSearch参数列表**</span>

| 值                          | 含义           |
| --------------------------- | -------------- |
| uSearchFormList，每一个item | 查询的表单列表 |



**uSearchFormList的Item**

| 值    | 含义                                  |
| ----- | ------------------------------------- |
| key   | 代表查询的key，也就是columns配置的key |
| value | 代表查询的值                          |





<span id = "searchFormList">**searchFormList属性列表**</span>

| 属性     | 类型   | 默认值              | 含义                                         |
| -------- | ------ | ------------------- | -------------------------------------------- |
| formType | String | input               | 查询的表单类型                               |
| title    | String | ''                  | 查询时的label以及placeholder                 |
| format   | String | YYYY-MM-DD HH:mm:ss | 类型为datePicker，它所需要的属性，时间格式化 |
| options  | Array  | []                  | 类型为select，它的options，下拉菜单选项      |



