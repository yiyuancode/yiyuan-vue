# ManagePage 管理页面

用于管理页面配置，该组件是基于ant-design-vue 1.x版本来进行开发的



## 何时使用

有需要管理页面的场景可以使用，比如基本的项目会使用到的菜单管理，用户管理，角色管理，xxx管理等等，只要需要使用到CRUD的场景都可以使用这个组件



## 代码演示











## API

### 属性列表

| 参数      | 说明                                                 | 类型   | 默认值/实例                | 是否必填 | 版本 |
| --------- | ---------------------------------------------------- | ------ | -------------------------- | -------- | ---- |
| renderObj | 管理页面的渲染对象配置                               | Object | [crtl点击查看](#renderObj) | 否       |      |
| theadData | 管理页面的表头配置                                   | Array  | [ctrl点击查看](#theadData) | 是       |      |
| pageInfo  | 管理页面的分页配置                                   | Object | [ctrl点击查看](#pageInfo)  |          |      |
| data      | 管理页面的表格数据内容,这里的数据的key会和表头的匹配 | Array  |                            |          |      |
| formRules | 管理页面添加和编辑时候的表单规则                     | Object | [ctrl点击查看](#formRules) |          |      |
| formModel | 管理页面添加和编辑时候的表单对象                     | Object | [ctrl点击查看](#formModel) |          |      |





### 事件列表

| 事件名称 | 说明                                     | 参数值                       | 场景 |
| -------- | ---------------------------------------- | ---------------------------- | ---- |
| onSave   | 点击添加和编辑按钮会触发的回调           | 暂无                         |      |
| onDelete | 点击删除按钮，以及批量删除会触发的回调   | [ctrl点击查看](#onDelParams) |      |
| onSubmit | 当点击了对具体某个管理页面表单的提交按钮 | [ctrl点击查看](#onSubParams) |      |





<span id = "onDelParams">**onDelete参数**</span>

（opType，ids）

- opType  操作类型，batchdelete | delete，用来判断删除的类型是批量还是单个
- ids  id的一个字符串，批量删除的话id会通过,分隔，单个删除只有一个id
- Tips：这个基本不需要动





<span id = "onSubParams">**onSubmit参数**</span>

（opType，id，回调函数）

- opType  操作类型，add|edit 后续可能会新增一些类型
- id，如果edit的话就有id
- Tips：这个基本不需要改



### 插槽

#### 具名插槽

**submitModal**

这个插槽目前是专门用来存放form-model-item的，因为目前这边的一个crud组件，会变动的只有里面表单的内容，不过ant-design-vue提供了两个表单，formModel，以及form，后续会把form也加入进来



**otherOperationsGOContainer**

其他操作全局的容器，目前这个插槽主要是放在我们的添加，导入，导出，批量删除按钮的右边的，比如有一些管理页面需要自定义的一个按钮，我们就可以在这边进行一个配置（目前这个模块还没有做完善）



**otherOperationsContainer**

这里就是每一行右边的操作栏的其他按钮的追加，会追加到我们编辑删除的后面



**列表a-table的插槽**

这里需要注意，我们管理页面的列表的每一行的每一列的具体的详情，我们可以通过插槽来进行配置，根据我们columns里面定义的一个属性

```
scopedSlots:{
	customRender : 'xxx'
}
```

然后我们要是用这个插槽的时候，只需要这么写

```vue
<span slot="table-xxx" slot-scope="{text,record}"></span> 这里的text就是指具体的值，record就是这一行的值
```





<span id = "renderObj">**renderObj默认值**</span>

```js
//主要是针对一些按钮是否开启（默认会都是开启的）
addBtn: {
    isOpen: true,
    text: "添加",
},
editBtn: {
    isOpen: true,
    text: "编辑",
},
deleteBtn: {
    isOpen: true,
    text: "删除"
},
importBtn: {
    isOpen: true,
    text: "导入",
},
exportBtn: {
    isOpen: true,
    text: "导出",
},
batchDeleteBtn: {
    isOpen: true,
    text: "批量删除",
},
operateMode: 1,   // 操作按钮的显示模式，可以做几种显示模式，目前两种，一种是直接按钮铺开，一种是按钮组，下拉菜单(1表示按钮铺开，2表示按钮组下拉菜单)
loading: false, //表格的加载效果
isOpenSelectCheckbox: true, //是否开启选择下拉框（这个），这个可以用这个来控制
idProp: "id", //需要批量操作使用的data的id属性值，删除和编辑会用的到
submitLoading: false, //表单提交按钮loading
```



<span id = "theadData">**theadData示例**</span>

```js
//需要传递的是一个数组，这个数组的对象里面的属性
{
    title, 
    dataIndex,
    key,
   //上面三个都是ant-design-vue的a-table组件里面的columns数组提供的，目前这个组件只使用了这三个，如果想拓展a-table的功能具体可以参阅它的一个官网，地址	为：https://1x.antdv.com/components/table-cn#Column
   //下面就是我们自己的一个自定义的字段
   isSearch :true, //这个就代表加入搜索的字段列表
   searchObj : { //搜索字段列表的具体配置信息，具体请查看SearchForm组件   
		
   }
}
const columns = [
    {
        title: '租户名称', 
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
    },
    {
        title: "开始时间",
        dataIndex: "startTime",
        key: "startTime",
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
];


```





<span id = "pageInfo">**pageInfo示例**</span>

```js
{
    pageSize: 10, //每个显示的条数
 	pageNum: 1, //当前页
	total: 0, //总页数
}
不过这个正常情况下默认就可以了
```





<span id = "formRules">**formRules示例**</span>

```js
//这里有this的部分都需要写到data()里面,这里的规则实际上是根据我们的表单对象来的
const validateStartTime = (rule, value, callback) => {
     if (!this.form.endTime) {
         callback();
     } else {
         const endTime = this.form.endTime.format('YYYY-MM-DD hh:mm:ss');
         const startTime = value.format('YYYY-MM-DD mm:ss');
         if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
             callback('开始日期不能超过结束日期');
         } else {
             callback();
         }
     }
 };

const validateEndTime = (rule, value, callback) => {
    if (!this.form.startTime) {
        callback();
    } else {
        const startTime = this.form.startTime.format('YYYY-MM-DD hh:mm:ss');
        const endTime = value.format('YYYY-MM-DD mm:ss');
        if (new Date(endTime).getTime() < new Date(startTime).getTime()) {
            callback('结束时间不能低于开始日期');
        } else {
            callback();
        }
    }
};

// 表单规则配置
const formRules = {
    code: [
        { required: true, message: '请输入租户编码', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入租户名称', trigger: 'blur' },
    ],
    startTime: [
        { required: true, message: '请选择日期时间', trigger: 'change' },
        { validator: validateStartTime, trigger: 'change' }
    ],
    endTime: [
        { required: true, message: '请选择日期时间', trigger: 'change' },
        { validator: validateEndTime, trigger: 'change' }
    ]
};
```





<span id = "formModel">**formModel示例**</span>

```js
// 其实就是一个对象，就是记录表单需要提交的一些信息
const form = {
    code: '', //租户代码
    name: '', //租户名称
    startTime: null, //开始时间 
    endTime: null, //结束时间
    status: 0, //启用
}
```





## 版本

目前的第一版的内容如下，下一版可能会加上的内容



后续版本会新增的内容：

- formItem/form（两种模式的表单插槽）

- 操作按钮的几种模式（需要讨论）

- 行编辑（可能点击添加和编辑不是弹出框或者弹出抽屉的形式）

- 左边列表，右边内容（这个和行编辑有些类型）