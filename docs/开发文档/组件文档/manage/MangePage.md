# ManagePage 管理页面

用于管理页面配置，该组件是基于ant-design-vue 1.x版本来进行开发的



## 何时使用

有需要管理页面的场景可以使用，比如基本的项目会使用到的菜单管理，用户管理，角色管理，xxx管理等等，只要需要使用到CRUD的场景都可以使用这个组件





## API

### 属性列表

| 参数      | 说明                                                 | 类型   | 默认值/实例                | 是否必填 |
| --------- | ---------------------------------------------------- | ------ | -------------------------- | -------- |
| renderObj | 管理页面的渲染对象配置                               | Object | [crtl点击查看](#renderObj) | 否       |
| columns | 管理页面的表头配置（和ant-design-vue的a-table组件的columns基本一致，多了一些新增的属性） | Array  | [ctrl点击查看](#columns) | 是       |
| pagination  | 管理页面的分页配置                                   | Object | [ctrl点击查看](#pagination)  |          |
| data      | 管理页面的表格数据内容,这里的数据的key会和表头的匹配 | Array  |                            |          |
| submitModalObj | 提交表单的一些信息配置{labelCol: { span: 8 },wrapperCol: { span: 16 },modalWidth : 450} | Object |                             |          |





### 事件列表

| 事件名称 | 说明                                     | 参数值                       | 场景 |
| -------- | ---------------------------------------- | ---------------------------- | ---- |
| onSave   | 点击添加和编辑按钮会触发的回调           | 暂无                         |      |
| onDelete | 点击删除按钮，以及批量删除会触发的回调   | [ctrl点击查看](#onDelParams) |      |
| onSubmit | 当点击了对具体某个管理页面表单的提交按钮 | [ctrl点击查看](#onSubParams) |      |





<span id = "onDelParams">**onDelete参数**</span>

| 参数   | 类型   | 含义            |
| ------ | ------ | --------------- |
| opType | String | 操作类型        |
| ids    | String | 删除所需要的ids |

**opType返回值**

| 值          | 含义                 |
| ----------- | -------------------- |
| batchdelete | 删除的类型是批量删除 |
| delete      | 删除的类型是单个删除 |



<span id = "onSubParams">**onSubmit参数**</span>

| 参数   | 类型   | 含义                           |
| ------ | ------ | ------------------------------ |
| opType | String | 操作类型                       |
| id     | String | 如果是edit就存在id，否则不存在 |

**opType返回值**

| 值   | 含义             |
| ---- | ---------------- |
| add  | 保存的类型是添加 |
| edit | 保存的类型是编辑 |



### 插槽

| 插槽名称                                      | 插槽含义                                               | 插槽提供的参数                                        |
| --------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- |
| **otherOperationsGOContainer**                | 管理页面的其他操作（如果存在某些公共操作可以加入这里） | 无                                                    |
| **otherOperationsContainer**                  | 管理页面的其他操作，在每一行的右边显示                 | 无                                                    |
| **table-{columns的scopedSlots.customRender}** | 管理页面的表格中的某一列配置                           | text,record，text代表这个列的值，record标识这一行的值 |

**table-{columns的scopedSlots.customRender}示例**

```js
columns = [{
    ...,
    {
       ...,
       scopedSlots:{
        customRender : "userRoles"
      }
    }
}]
```

```vue
<span slot="table-userRoles" slot-scope="{text,record}">{{text}}</span> 这里的text就是指具体的值，record就是这一行的值
```



<span id = "renderObj">**renderObj属性列表**</span>

| 属性                 | 属性值                                            | 含义                               |
| -------------------- | ------------------------------------------------- | ---------------------------------- |
| addBtn               | {isOpen:true,text:"添加"}                         | 添加按钮是否开启，以及文字配置     |
| editBtn              | {isOpen:true,text:"编辑"}                         | 编辑按钮是否开启，以及文字配置     |
| deleteBtn            | {isOpen:true,text:"删除"}                         | 删除按钮是否开启，以及文字配置     |
| importBtn            | {isOpen:true,text:"导入"}                         | 导入按钮是否开启，以及文字配置     |
| exportBtn            | {isOpen:true,text:"导出"}                         | 导出按钮是否开启，以及文字配置     |
| batchDeleteBtn       | {isOpen:true,text:"批量删除"}                     | 批量删除按钮是否开启，以及文字配置 |
| operateMode          | 默认1，枚举值(1表示按钮铺开，2表示按钮组下拉菜单) | 操作按钮的显示模式，目前只做了1    |
| loading              | 默认false，可传递boolean值                        | 表格的加载状态                     |
| isOpenSelectCheckbox | 默认true，可传递boolean值                         | 是否开启复选框                     |
| idProp               | 默认"id"，可传递String值                          | id的属性（用于编辑和删除以及回写） |
| submitLoading        | 默认false，可传递boolean值                        | 提交按钮的加载状态                 |





<span id = "columns">**columns属性列表**</span>

| 属性      | 属性值                                                       | 含义                   |
| --------- | ------------------------------------------------------------ | ---------------------- |
| noAdd     | true                                                         | 代表不出现在添加里面   |
| noEdit    | true                                                         | 代表不出现在编辑里面   |
| noSearch  | true                                                         | 代表不出现在查询里面   |
| formType  | 默认是input，具体查看formItem组件的这个属性                  | 代表表单的属性配置     |
| listSort  | number数字                                                   | 代表列表的排序         |
| formSort  | number数字                                                   | 代表表单的排序         |
| searchObj | 查询的对象                                                   | 代表查询表单的一些配置 |
| props     | 和formType配合使用的，标识可以添加给表单元素的任意属性，具体查看ant-design-vue文档 | 代表表单元素的属性对象 |
| rules     | 这里的规则配置和ant-design-vue的a-form-item的一致            |                        |
| noShow    | true                                                         | 代表不加入显示的表单   |



**searchObj**

**属性列表**

| 属性     | 属性值                                                       | 含义                       |
| -------- | ------------------------------------------------------------ | -------------------------- |
| formType | 默认是input，具体查看formItem组件的这个属性                  | 代表查询表单的属性配置     |
| options  | 和formType配合使用的，如果type是select的话就可以配置这个属性 | 代表查询表单元素的属性对象 |

**Tips：这里单独使用options而不是使用props里面对象写属性的形式，主要是查询用不到太多的组件，所以所需要的参数不多，这里就直接给几个属性，也方便理解**



<span id = "pagination">**pagination属性列表**</span>

| 属性     | 属性值                 | 含义           |
| -------- | ---------------------- | -------------- |
| pageSize | 默认10，可填写number值 | 代表每页条数   |
| pageNum  | 默认1，可填写number值  | 代表当前页     |
| total    | 默认0，可填写number值  | 代表每页总页数 |





## 版本

目前的第一版的内容如下，下一版可能会加上的内容



后续版本会新增的内容：

- formItem/form（两种模式的表单插槽）

- 操作按钮的几种模式（需要讨论）

- 行编辑（可能点击添加和编辑不是弹出框或者弹出抽屉的形式）

- 左边列表，右边内容（这个和行编辑有些类型）