# 前端快速crud进阶玩法

## 第一步

> 网络请求接口编写

我们首先要写crud，就得把项目中src的api文件夹下的一个网络请求接口信息补充完整，我们要写一个新的界面，如果变动不大，可以直接复制某一个的来进行修改



## 第二步

> 配置路由，创建页面

在我们里面router.map.js配置新路由，这个之前的文档讲过，配置完成之后，创建对应的一个页面，然后我们开始进行一个编写



## 第三步

> 引入管理页面和管理页面mixin，进行pageConfig配置

我们把一些公共的配置抽到一个js文件上，在页面把这个js进行引入，再把这个js导出的对象进行一个解构使用

我们就拿项目的tenantList来举例好了，tenantList这个文件夹下，有一个index.vue，和一个pageConfig

pageConfig的一个简单解释

```js
//我们可以把一些公共的配置到这里，比如网络请求api
//我们进行引入
import * as tenant from "@/api/sys/tenant";

//然后写模块配置，这里的模块配置，我们就按照这种形式，
//moduleAdd，moduleEdit，moduleDelete，moduleGetList等等分别代表着这个tenant的所有网络请求的导出的方法，在我们的manage的mixin会使用到
const moduleConfig = {
    module: tenant,
    moduleAdd: "addTenant",
    moduleEdit: "editTenant",
    moduleDelete: "deleteTenant",
    moduleGetList : "getTenantPageList",
    moduleGetDetail : "getTenantDetail",
    moduleName : "租户",
}

//以及我们的字段配置，这个字段配置就是展现我们的一个列表数据
const columns = [
    {
        title: '租户名称',
        dataIndex: 'name',
        key: 'name',
        isSearch: true,
    },
    {
        title: '租户代码',
        dataIndex: 'code',
        key: 'code',
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
    {
        title: '结束时间',
        key: 'endTime',
        dataIndex: 'endTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: "创建时间",
        key: "createTime",
        dataIndex: 'createTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    },
    {
        title: "修改时间",
        key: "updateTime",
        dataIndex: 'updateTime',
        isSearch: true,
        searchObj: {
            type: "rangePicker"
        }
    }
];

// 添加，编辑的一个表单
const form = {
    code: '', //租户代码
    name: '', //租户名称
    startTime: null, //开始时间 
    endTime: null, //结束时间
    status: 0, //启用
}

// 这里也可以加一些其他数据配置，如果希望index.vue里面的其他数据也抽到这里来看的话就可以这么写
const otherDataConfig = {
    statusList: [{
        name: "正常",
        val: 0
    }, {
        name: "冻结",
        val: 1
    }],
}


export  {
    columns,
    form,
    moduleConfig,
    otherDataConfig
};
```



## 第四步

> 页面的视图，使用ManagePage组件

```vue
<ManagePage :theadData="columns" :data="data" :pageInfo="pageInfo" :renderObj="renderObj" :formRules="rules"
        :formModel="form" @onSave="saveHandle" @onSubmit="submitHandle" @onDelete="deleteHandle">
            
 </ManagePage>
```

这个可以直接复制，我们的这些函数其实上在manage的mixin里面是存在的

然后我们可以加上我们所需要的数据插槽，根据ManagePage文档

这里有一个需要注意的地方，关于表单的规则

```js
//如果表单的规则，我们使用的是回调函数的形式，不通过它默认提供的一些规则，也就是我们要是用到data的一些值，那我们的这个表单验证函数必须放在data里面才可以生效
```



正常情况下，我们配置好第三步之后，只需要写一个表单回填的函数

```js
// 租户表单信息回填
async formBackFill(id) {
    const tenantDetailInfo = await this.getDetail(id);
    const {
        code,
        name,
        startTime,
        endTime,
        status
    } = tenantDetailInfo;

    const newForm = {
        code,
        name,
        startTime: moment(startTime),
        endTime: moment(endTime),
        status: status.value
    };

    this.form = newForm;
},
```



可能有时候需要再写处理提交的数据

```js
handleSubmitData() {
    const startTime = this.form.startTime.format('YYYY-MM-DD hh:mm:ss');
    const endTime = this.form.endTime.format('YYYY-MM-DD hh:mm:ss');

    const tenantInfo = {
        ...this.form,
        startTime,
        endTime
    }
    this.submitData = tenantInfo;
},
```



然后其他基本上就不需要动了，因为大部分的方法都在manage的mixins混合里做完了



前端的小伙伴可以看看目前的所有的一个页面的代码