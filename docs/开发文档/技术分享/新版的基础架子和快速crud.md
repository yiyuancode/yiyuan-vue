## 前端快速crud进阶玩法（新版）

前两步可以查看旧版的步骤，和旧版的一致



## 第三步

> 这一步有所改动，pageConfig的配置有变化



**columns新增可以配置项**

```js
noAdd : true, //代表不加入添加表单
noEdit : true, //代表不加入编辑表单
noShow : true, //代表不加入表单列表
noSearch : true, //不加入查询列表
listSort : Number, //列表的排序
formSort : Number, //添加编辑表单的排序
rules : Array, //规则
```

也就是说添加编辑那些不需要再写其他的配置，默认都会出现，可以通过这些配置关闭一些不用的配置



