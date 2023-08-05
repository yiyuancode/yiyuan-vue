<template>
    <div class="menu-form-container">
        <span class="menu-form-title">
            <a-divider orientation="left">
                基本设置
            </a-divider>
        </span>

        <a-form-model ref="menuForm" :model="model" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-form-model-item ref="type" label="类型" prop="type">
                <a-radio-group v-model="model.type">
                    <a-radio-button v-for="(item, index) in menuTypeList" :key="index" :value="item.val">
                        {{ item.name }}
                    </a-radio-button>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item ref="parentId" :label="menuTypeLabelInfo.parentMenuLabel" prop="parentId">
                <a-tree-select v-model="model.parentId" style="width: 100%"
                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData" placeholder="请选择"
                    tree-default-expand-all allow-clear>
                </a-tree-select>
            </a-form-model-item>


            <div class="menu-form-item">
                <a-form-model-item ref="name" :label="menuTypeLabelInfo.menuNameLabel" prop="name" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-input v-model="model.name" placeholder="目录名称" />
                </a-form-model-item>

                <a-form-model-item ref="icon" :label="menuTypeLabelInfo.menuIconLabel" prop="icon" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-input v-model="model.icon" placeholder="目录图标" />
                </a-form-model-item>

            </div>

            <div v-if="model.type !== 2" class="menu-form-item">
                <a-form-model-item ref="routePath" label="路由地址" prop="routePath" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-input v-model="model.routePath" placeholder="路由地址" />
                </a-form-model-item>

                <a-form-model-item ref="routeName" label="路由名称" prop="routeName" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-input v-model="model.routeName" placeholder="路由名称" />
                </a-form-model-item>
            </div>


            <template>
                <div v-if="model.type !== 2" class="menu-form-item">
                    <a-form-model-item ref="routeRedirect" label="默认路由" prop="routeRedirect" :label-col="{ span: 12 }"
                        :wrapper-col="{ span: 12 }">
                        <a-input v-model="model.routeRedirect" placeholder="路由重定向地址" />
                    </a-form-model-item>

                    <a-form-model-item ref="sort" label="显示排序" prop="sort" :label-col="{ span: 12 }"
                        :wrapper-col="{ span: 12 }">
                        <a-input-number v-model="model.sort" :min="0" placeholder="显示排序" />
                    </a-form-model-item>
                </div>

                <a-form-model-item v-else ref="sort" label="显示排序" prop="sort">
                    <a-input-number v-model="model.sort" :min="0" placeholder="显示排序" />
                </a-form-model-item>
            </template>


            <a-form-model-item v-if="model.type !== 2" ref="permission" label="权限表达式" prop="permission">
                <a-input v-model="model.permission" placeholder="权限表达式" />
            </a-form-model-item>

            <a-form-model-item v-if="model.type !== 2" ref="routeComponent" label="组件路径" prop="routeComponent">
                <a-input v-model="model.routeComponent" placeholder="路由对应组件路径" />
            </a-form-model-item>

            <span class="menu-form-title">
                <a-divider orientation="left">
                    功能设置
                </a-divider>
            </span>

            <template>
                <div v-if="model.type !== 2" class="menu-form-item">
                    <a-form-model-item ref="status" label="目录状态" prop="status" :label-col="{ span: 12 }"
                        :wrapper-col="{ span: 12 }">
                        <a-radio-group v-model="model.status">
                            <a-radio-button v-for="(item, index) in menuStatusList" :key="index" :value="item.val">
                                {{ item.name }}
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-model-item>

                    <a-form-model-item ref="isAffix" label="多页签" prop="isAffix" :label-col="{ span: 12 }"
                        :wrapper-col="{ span: 12 }">
                        <a-switch v-model="model.isAffix" default-checked />
                    </a-form-model-item>
                </div>

                <a-form-model-item v-else ref="status" :label="menuTypeLabelInfo.menuStautsLabel" prop="status">
                    <a-radio-group v-model="model.status">
                        <a-radio-button v-for="(item, index) in menuStatusList" :key="index" :value="item.val">
                            {{ item.name }}
                        </a-radio-button>
                    </a-radio-group>
                </a-form-model-item>
            </template>

            <div v-if="model.type !== 2" class="menu-form-item">
                <a-form-model-item ref="isFrame" label="是否外链" prop="isFrame" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-radio-group v-model="model.isFrame">
                        <a-radio-button :value="1">
                            是
                        </a-radio-button>
                        <a-radio-button :value="0">
                            否
                        </a-radio-button>
                    </a-radio-group>
                </a-form-model-item>

                <a-form-model-item ref="isAlwaysShow" label="简化路由" prop="isAlwaysShow" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-switch v-model="model.isAlwaysShow" default-checked />
                </a-form-model-item>


            </div>

            <div v-if="model.type !== 2" class="menu-form-item">
                <a-form-model-item ref="openType" label="打开方式" prop="openType" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-select v-model="model.openType">
                        <a-select-option :value="0">
                            当前窗口
                        </a-select-option>
                        <a-select-option :value="1">
                            新窗口
                        </a-select-option>
                    </a-select>
                </a-form-model-item>

                <a-form-model-item ref="isCache" label="是否缓存" prop="isCache" :label-col="{ span: 12 }"
                    :wrapper-col="{ span: 12 }">
                    <a-switch v-model="model.isCache" default-checked />
                </a-form-model-item>
            </div>

            <a-form-model-item v-if="mode === 'edit'" :wrapper-col="{ span: 14, offset: 4 }">
                <a-button type="primary" @click="saveClickHandle">
                    保存修改
                </a-button>
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
// 菜单类型
const menuTypeList = [{
    name: "目录",
    val: 0
}, {
    name: "菜单",
    val: 1,
}, {
    name: "按钮",
    val: 2
}]

// 菜单状态
const menuStatusList = [{
    name: "正常",
    val: 1,
}, {
    name: "停用",
    val: 0
}]

export default {
    props: {
        mode: {
            type: String,
            default: "edit"
        },
        model: {
            type: Object,
            required: true,
        },
        rules: {
            type: Object,
        },
        treeData: {
            type: Array,
            require: true
        },
        formRef: {
            type: String,
            require: true
        }
    },

    data() {
        return {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            menuStatusList,
            menuTypeList
        }
    },
    computed: {
        menuTypeLabelInfo() {
            let labelInfo = {};
            switch (this.model.type) {
                case 0:
                    labelInfo.parentMenuLabel = "上级目录";
                    labelInfo.menuNameLabel = "目录名称";
                    labelInfo.menuIconLabel = "目录图标";
                    labelInfo.menuStautsLabel = "目录状态";
                    break;
                case 1:
                    labelInfo.parentMenuLabel = "上级菜单";
                    labelInfo.menuNameLabel = "菜单名称";
                    labelInfo.menuIconLabel = "菜单图标";
                    labelInfo.menuStautsLabel = "菜单状态";
                    break;
                case 2:
                    labelInfo.parentMenuLabel = "按钮对应菜单";
                    labelInfo.menuNameLabel = "按钮名称";
                    labelInfo.menuIconLabel = "按钮图标";
                    labelInfo.menuStautsLabel = "按钮状态";
                    break;
            }
            return labelInfo;
        }
    },
    methods: {
        saveClickHandle() {
            this.$emit("onSave");
        }
    }
}
</script>

<style lang="less" scoped>
// 菜单表单容器
.menu-form-container {

    // 菜单表单标题
    .menu-form-title {
        .ant-divider {
            padding-left: 5%;
        }
    }

    // 菜单表单项
    .menu-form-item {
        display: flex;

        .ant-form-item {
            flex: 1 1 50%;
        }
    }

    .ant-input-number {
        width: 100%;
    }
}
</style>