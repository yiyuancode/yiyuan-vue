# 管理页面的一个crud混合

## 传递的参数

### opts

```js
//一个默认的选项配置 
const defaultOpts = {
     submitData: null, //提交表单的数据
     moduleName: '', //模块名称，主要用于提示
     pageInfo: {  //默认分页
         pageSize: 10,
         pageNum: 1,
         total: 0,
     },
     data: [], //数据
     renderObj: { //渲染对象
         isLoading: false
     },
     submitLoading: false, //提交的loading
     form : {},
 }

//组合成一个新配置
 const newOpts = {
     ...defaultOpts,
     ...opts
 }
```



## 混合里面的属性

### data

关于这个data直接就是newOpts



### created

组件实例化开始之后，会执行getData



### methods

具体的方法

#### submitHandle(opType,id,done)

> 进行提交按钮的回调

在我们要是是用这个混合的页面可以传递一个handleSubmitData，然后将我们提交的数据进行一个处理，因为这个数据正常是在我们使用混合的页面存在的，如果不传递，默认的一个提交的数据就是传递过来的form



这里会根据opType来进行接口的调用，所以在我们的使用的一个页面可以配置一个moduleConfig，关于这个的所有详细配置参考

```js
// 模块配置
const moduleConfig = {
    module: admin,
    moduleAdd: "addAdmin",
    moduleEdit: "editAdmin",
    moduleDelete: "deleteAdmin",
    moduleGetList : "getAdminPageList",
    moduleGetDetail : "getAdminDetail",
    moduleName : "用户",
}
```



#### deleteHandle

> 删除及批量删除的回调





#### getData

> 获取表格的数据

这里在我们使用混合的页面可以传递一个methods，handleRecords，这个methods的函数有一个参数，records，可以对这个records进行一个处理



#### saveHandle

> 添加或编辑的一个回调处理

一般都是进行一个表单的回填



#### getDetail

> 获取数据详情

这个函数一般可以直接给使用混合的页面调用，拿到具体详情的数据，来进行一个表单回填