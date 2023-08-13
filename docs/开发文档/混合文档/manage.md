# 管理页面的一个crud混合

## 传递的参数

### opts，主要是管理页面的一些基础配置

```js
//一个默认的选项配置 
const defaultOpts = {
     submitData: null, //提交表单的数据
     moduleName: '', //模块名称，主要用于提示
     pagination: {  //默认分页
         pageSize: 10,
         current: 1,
         total: 0,
     },
     data: [], //数据
     renderObj: { //渲染对象
         isLoading: false
     },
     submitLoading: false, //提交的loading
 }

//组合成一个新配置
 const newOpts = {
     ...defaultOpts,
     ...opts
 }
```



## 混合提供的方法

| 方法名            | 参数         | 含义                     |
| ----------------- | ------------ | ------------------------ |
| handleSubmitData  | model        | 处理提交的数据           |
| handleRecord      | 列表的每一项 | 处理返回的data的每一项值 |
| handleDetailModel | id           | 数据回写的方法           |





**handleSubmitData这个方法需要返回值，返回的值就是新的提交的数据**

**handleRecord不需要返回值，只需要把传递过来的形参进行一个修改调整就可以**

**handleDetailModel不需要返回值，和handleRecord类型，只需要改传递过来的形参**

