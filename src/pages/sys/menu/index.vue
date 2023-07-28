<template>
    <!-- 菜单管理容器 -->
    <div class="menu-container">
        <a-row type="flex" justify="space-between">
            <!-- lx屏屏幕尺寸下6份  lg撑满-->
            <a-col :xl="{ span: 6 }" :lg="{ span: 24 }" class="menu-left">
                <div class="menu-show-container">
                    <!-- 菜单操作按钮容器 -->
                    <div class="menu-operation-btn-container">
                        <a-button type="primary">
                            添加菜单
                        </a-button>

                        <a-button type="primary" @click="toggleExpandMenuHandle">
                            {{ isExpandAll ? '全部收起' : '全部展开' }}
                        </a-button>
                    </div>
                    <a-divider style="margin:15px 0" />

                    <div class="menu-list-container">
                        <a-input-search placeholder="输入菜单名称进行搜索" />

                        <a-tree :tree-data="treeData" :expanded-keys="expandedKeys" @select="selectMenuHandle"
                            @expand="onExpand" />
                    </div>
                </div>
            </a-col>

            <!-- lx屏屏幕尺寸下18份  lg撑满 -->
            <a-col :xl="{ span: 17 }" :lg="{ span: 24 }" class="menu-right">
                <div class="menu-detail-container">
                    <p>
                        <span class="edit-menu-title">编辑目录</span>
                        <a-divider type="vertical" style="margin : 0 20px" />
                        <span>从左侧列表选择一项后，进行编辑</span>
                    </p>
                    <a-divider />

                    <a-row>
                        <a-col :xl="{span : 20}" :lg="{ span: 16 }">
                            <div class="menu-form-container">
                                <span class="menu-form-title">
                                    <a-divider orientation="left">
                                        基本设置
                                    </a-divider>
                                </span>

                                <a-form-model ref="menuForm" :model="menuForm" :rules="menuRules" :label-col="labelCol"
                                    :wrapper-col="wrapperCol">
                                    <a-form-model-item ref="type" label="类型" prop="type">
                                        <a-radio-group v-model="menuForm.type">
                                            <a-radio-button v-for="(item, index) in menuTypeList" :key="index"
                                                :value="item.val">
                                                {{ item.name }}
                                            </a-radio-button>
                                        </a-radio-group>
                                    </a-form-model-item>
                                    <a-form-model-item ref="parentId" :label="menuTypeLabelInfo.parentMenuLabel"
                                        prop="parentId">
                                        <a-tree-select v-model="menuForm.parentId" style="width: 100%"
                                            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" :tree-data="treeData"
                                            placeholder="请选择" tree-default-expand-all allow-clear>
                                        </a-tree-select>
                                    </a-form-model-item>


                                    <div class="menu-form-item">
                                        <a-form-model-item ref="name" :label="menuTypeLabelInfo.menuNameLabel" prop="name"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-input v-model="menuForm.name" placeholder="目录名称" />
                                        </a-form-model-item>

                                        <a-form-model-item ref="icon" label="目录图标" prop="icon" :label-col="{ span: 12 }"
                                            :wrapper-col="{ span: 12 }">
                                            <a-input v-model="menuForm.icon" placeholder="目录图标" />
                                        </a-form-model-item>
                                    </div>

                                    <div class="menu-form-item">
                                        <a-form-model-item ref="routePath" label="路由地址" prop="routePath"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-input v-model="menuForm.routePath" placeholder="路由地址" />
                                        </a-form-model-item>

                                        <a-form-model-item ref="routeName" label="路由名称" prop="routeName"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-input v-model="menuForm.routeName" placeholder="路由名称" />
                                        </a-form-model-item>
                                    </div>

                                    <div class="menu-form-item">
                                        <a-form-model-item ref="routeRedirect" label="默认路由" prop="routeRedirect"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-input v-model="menuForm.routeRedirect" placeholder="路由重定向地址" />
                                        </a-form-model-item>

                                        <a-form-model-item ref="sort" label="显示排序" prop="sort" :label-col="{ span: 12 }"
                                            :wrapper-col="{ span: 12 }">
                                            <a-input-number v-model="menuForm.sort" :min="0" placeholder="显示排序" />
                                        </a-form-model-item>
                                    </div>

                                    <a-form-model-item ref="routeComponent" label="组件路径" prop="routeComponent">
                                        <a-input v-model="menuForm.routeComponent" placeholder="路由对应组件路径" />
                                    </a-form-model-item>

                                    <span class="menu-form-title">
                                        <a-divider orientation="left">
                                            功能设置
                                        </a-divider>
                                    </span>

                                    <div class="menu-form-item">
                                        <a-form-model-item ref="status" label="目录状态" prop="status" :label-col="{ span: 12 }"
                                            :wrapper-col="{ span: 12 }">
                                            <a-radio-group v-model="menuForm.status">
                                                <a-radio-button v-for="(item, index) in menuStatusList" :key="index"
                                                    :value="item.val">
                                                    {{ item.name }}
                                                </a-radio-button>
                                            </a-radio-group>
                                        </a-form-model-item>

                                        <a-form-model-item ref="isAffix" label="多页签" prop="isAffix"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-switch v-model="menuForm.isAffix" default-checked />
                                        </a-form-model-item>
                                    </div>

                                    <!-- <div class="menu-form-item">
                                <a-form-model-item ref="routePath" label="显示状态" prop="routePath" :label-col="{ span: 12 }"
                                    :wrapper-col="{ span: 12 }">
                                </a-form-model-item>

                                <a-form-model-item ref="routeName" label="是否缓存" prop="routeName" :label-col="{ span: 12 }"
                                    :wrapper-col="{ span: 12 }">
                                </a-form-model-item>
                            </div> -->

                                    <div class="menu-form-item">
                                        <a-form-model-item ref="isFrame" label="是否外链" prop="isFrame"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-radio-group v-model="menuForm.isFrame">
                                                <a-radio-button :value="1">
                                                    是
                                                </a-radio-button>
                                                <a-radio-button :value="0">
                                                    否
                                                </a-radio-button>
                                            </a-radio-group>
                                        </a-form-model-item>

                                        <a-form-model-item ref="isAlwaysShow" label="简化路由" prop="isAlwaysShow"
                                            :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }">
                                            <a-switch v-model="menuForm.isAlwaysShow" default-checked />
                                        </a-form-model-item>
                                    </div>

                                </a-form-model>
                            </div>
                        </a-col>
                    </a-row>

                </div>
            </a-col>
        </a-row>
        <!-- 左侧的操作以及菜单列表显示 -->


        <!-- 右侧的菜单详情显示 -->
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

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            treeData: [], //树列表
            treeKeyData: [], //所有的树key列表
            expandedKeys: [], //展开的列表
            isExpandAll: false, //是否展开全部
            menuForm: {
                type: 0, //菜单类型
                parentId: null,  //上级目录/上级菜单
                icon: "", //菜单图标
                routeName: "", //路由名称
                routePath: "", //路由地址
                sort: 0, //显示排序
                routeRedirect: "", //路由重定向地址
                routeComponent: "", //路由对应组件路径
                status: 1, //菜单状态
                isAffix: false, //是否固定多页签
                isAlwaysShow: false, //是否简化路由
                isFrame: 0, //是否外链
            },
            menuRules: {},
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
            menuTypeList, //菜单类型
            menuStatusList,  //菜单状态
        }
    },
    computed: {
        ...mapGetters('account', ['menuTreeList']),
        menuTypeLabelInfo() {
            let labelInfo = {};
            if (this.menuForm.type === 0) {
                labelInfo.parentMenuLabel = "上级目录";
                labelInfo.menuNameLabel = "目录名称";
            } else if (this.menuForm.type === 1) {
                labelInfo.parentMenuLabel = "上级菜单";
                labelInfo.menuNameLabel = "菜单名称";
            } else if (this.menuForm.type === 2) {
                labelInfo.parentMenuLabel = "按钮对应菜单";
                labelInfo.menuNameLabel = "按钮名称";
            }

            return labelInfo;
        }
    },
    async created() {
        const menuList = this.menuTreeList;
        const { treeData, treeKeyData } = this.getTreeData(menuList);
        this.treeData = treeData;
        this.treeKeyData = treeKeyData;
    },

    methods: {
        // 根据获取的菜单拿到所有的数级数据
        getTreeData(menuList, treeKeyData = []) {
            const treeData = [];
            for (let i = 0; i < menuList.length; i++) {
                const { name, children, id } = menuList[i];

                const treeDataObj = {
                    title: name,
                    key: id,
                    value: id,
                }
                treeKeyData.push(id);
                if (children && children.length) {
                    const newChildren = this.getTreeData(children, treeKeyData);
                    treeDataObj.children = newChildren.treeData;
                }

                treeData.push(treeDataObj);
            }
            return { treeData, treeKeyData };
        },
        onExpand(expandedKeys) {
            this.expandedKeys = expandedKeys;
            // if(JSON.stringify())
        },
        // 切换展开菜单
        toggleExpandMenuHandle() {
            if (!this.isExpandAll) {
                this.expandedKeys = this.treeKeyData;
            } else {
                this.expandedKeys = [];
            }
            this.isExpandAll = !this.isExpandAll;
        },
        // 选择菜单类型处理
        // selectMenuTypeHandle(){
        //     this.
        // },
        // 选择
        selectMenuHandle() {
        },

    },

}
</script>

<style lang="less" scoped>
// 菜单容器
.menu-container {
    margin-top: 20px;
}


// 菜单左边内容和菜单右边内容的公共样式
.menu-left,
.menu-right {
    background-color: #fff;
    // margin-right: 20px;
    padding: 10px 15px;
}


// 编辑菜单的文字
.edit-menu-title {
    font-size: 16px;
}

// 菜单操作按钮的容器
.menu-operation-btn-container {
    display: flex;

    .ant-btn {
        margin-right: 12px;
    }
}

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

    .ant-input-number{
        width: 100%;
    }
}
</style>