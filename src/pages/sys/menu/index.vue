<template>
    <!-- 菜单管理容器 -->
    <div class="menu-container">
        <a-row type="flex" justify="space-between">
            <!-- lx屏屏幕尺寸下6份  lg撑满-->
            <a-col :xl="{ span: 6 }" :lg="{ span: 24 }" class="menu-left">
                <div class="menu-show-container">
                    <!-- 菜单操作按钮容器 -->
                    <div class="menu-operation-btn-container" style="margin-bottom:10px">
                        <a-button type="primary" @click="handleAddMenuClick">
                            添加菜单
                        </a-button>

                        <a-button type="primary" @click="toggleExpandMenuHandle">
                            {{ isExpandAll ? '全部收起' : '全部展开' }}
                        </a-button>

                        <a-popconfirm title="是否要删除这条信息?" ok-text="确认" cancel-text="取消" @confirm="deleteMenuHandle">
                            <a-button type="primary">删除</a-button>
                        </a-popconfirm>
                    </div>

                    <a-divider style="margin:15px 0" />

                    <div class="menu-list-container">
                        <a-input-search placeholder="输入菜单名称进行搜索" />

                        <div class="tree-container beauty-scroll">
                            <a-tree :tree-data="treeData" :expanded-keys="expandedKeys" @select="selectMenuHandle"
                                @expand="onExpand" />
                        </div>
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
                        <a-col :xl="{ span: 20 }" :lg="{ span: 16 }">
                            <menuForm ref="saveMenuFormCon" formRef="saveMenuForm" :model="menuModel" :rules="menuRules"
                                :treeData="treeData" @onSave="saveMenuHandle('edit')"></menuForm>
                        </a-col>
                    </a-row>
                </div>
            </a-col>
        </a-row>

        <Modal modalTitle="添加菜单" :modalWidth="600" :modalVisible="addMenuVisible" :submitLoading="addMenuLoading"
            @onCloseModal="addMenuVisible = false" @onReset="resetHandle" @onSubmit="saveMenuHandle('add')">
            <menuForm ref="addMenuFormCon" formRef="addMenuForm" :model="addMenuModel" :rules="addMenuRules"
                :treeData="treeData" mode="add"></menuForm>
        </Modal>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'
import { getMenuDetail, addMenu, editMenu, deleteMenu } from "@/api/sys/menu";
import { getUserInfo } from "@/api/login"
import menuForm from "./menuForm";
import Modal from "@/components/modal/Modal";
import _ from "lodash";

const defaultMenuModel = {
    name: "", //名称
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
    isCache: false,
    openType: 0, //当前窗口
    permission: "",
}

const menuModel = _.cloneDeep(defaultMenuModel);

const menuRules = {
    name: [
        { required: true, message: "请输入目录名称", trigger: 'blur' }
    ],
    routePath: [
        { required: true, message: "请输入路由地址", trigger: 'blur' }
    ],
    routeName: [
        { required: true, message: "请输入路由名称", trigger: 'blur' }
    ],
    routeComponent: [
        { required: true, message: "请输入组件路径", trigger: 'blur' }
    ],
    permission: [
        { required: true, message: "请输入权限表达式", trigger: 'blur' }
    ],
    frameSrc: [
        { required: true, message: "请输入外部链接地址", trigger: 'blur' }
    ]
};

const addMenuModel = _.cloneDeep(defaultMenuModel);
const addMenuRules = _.cloneDeep(menuRules);
const booleanPropArr = ["isAffix", "isAlwaysShow", "isCache"];
import { loadRoutes, getRoutes } from '@/utils/routerUtil';

export default {
    components: {
        menuForm,
        Modal,
    },
    data() {
        return {
            treeData: [], //树列表
            treeKeyData: [], //所有的树key列表
            expandedKeys: [], //展开的列表
            isExpandAll: false, //是否展开全部
            menuModel,
            menuRules,
            addMenuModel,
            addMenuRules,
            addMenuVisible: false,
            addMenuLoading: false,
            selectMenuId: undefined, //选择的菜单id
        }
    },
    computed: {
        ...mapGetters('account', ['menuTreeList']),
    },
    watch: {
        menuTreeList() {
            this.setTreeData();
        }
    },
    async created() {
        this.setTreeData();
    },

    methods: {
        ...mapMutations('account', ['setMenuTreeList']),

        setTreeData() {
            const menuList = this.menuTreeList;
            const { treeData, treeKeyData } = this.getTreeData(menuList);
            this.treeData = treeData;
            this.treeKeyData = treeKeyData;
        },
        // 处理添加菜单点击
        handleAddMenuClick() {
            this.addMenuVisible = true;
            this.$nextTick(() => {
                this.$refs.addMenuFormCon.$refs.menuForm.resetFields();
            });
        },
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
        // 选择
        async selectMenuHandle(selected) {
            const menuId = selected[0];
            if (menuId) {
                const menuInfo = await getMenuDetail(menuId);
                const newMenuInfo = this.handleMenuInfo(menuInfo);
                this.menuModel = newMenuInfo;
            }
            this.selectMenuId = menuId;
        },
        handleMenuInfo(menuInfo) {
            const objPropArr = ["isAffix", "isAlwaysShow", "isCache", "isFrame", "openType", "status", "type"];
            const newMenuInfo = {};

            for (let prop in menuInfo) {
                if (objPropArr.includes(prop)) {
                    newMenuInfo[prop] = menuInfo[prop].value;
                } else {
                    newMenuInfo[prop] = menuInfo[prop];
                }

                if (booleanPropArr.includes(prop)) {
                    newMenuInfo[prop] = newMenuInfo[prop] === 1 ? true : false;
                }
            }
            if (newMenuInfo.parentId === "0") {
                delete newMenuInfo.parentId;
            }

            return newMenuInfo;
        },
        // 保存菜单
        async saveMenuHandle(opType) {
            this.addMenuLoading = true;
            try {
                // 添加
                if (opType === "add") {
                    await this.$refs.addMenuFormCon.$refs.menuForm.validate();
                    // 处理提交的菜单信息
                    const submitMenuInfo = this.handleSubmitMenuInfo(this.addMenuModel);

                    await addMenu(submitMenuInfo);
                    this.$refs.addMenuFormCon.$refs.menuForm.resetFields();
                    this.$message.success("新增菜单成功!!");
                }
                // 编辑
                else if (opType === "edit") {
                    if (!this.selectMenuId) {
                        this.$message.error("请先选择一个菜单项再来进行编辑操作");
                        return;
                    }
                    await this.$refs.saveMenuFormCon.$refs.menuForm.validate();

                    const submitMenuInfo = this.handleSubmitMenuInfo(this.menuModel);
                    await editMenu(submitMenuInfo, this.selectMenuId);
                    this.$message.success("编辑菜单成功!!");
                }

                const userInfo = await getUserInfo();
                this.setMenuTreeList(userInfo.menuTreeList);

                let routes = getRoutes(userInfo.menuTreeList);
                routes = [{
                    router: "root",
                    children: routes
                }]

                // 获取路由信息 
                loadRoutes(routes);
            } catch (e) {
                Promise.reject(e);
            }
            this.addMenuLoading = false;
        },
        handleSubmitMenuInfo(menuInfo) {
            const submitMenuInfo = {
                ...menuInfo,
            }

            for (let prop in submitMenuInfo) {
                if (booleanPropArr.includes(prop)) {
                    submitMenuInfo[prop] = submitMenuInfo[prop] ? 1 : 0;
                }
            }

            submitMenuInfo.parentId = submitMenuInfo.parentId ? submitMenuInfo.parentId : "0"; //如果没有就是0
            return submitMenuInfo;
        },
        resetHandle() {
            this.$refs.addMenuFormCon.$refs.menuForm.resetFields();

            this.$message.success("重置成功!!");
        },
        async deleteMenuHandle() {
            if (!this.selectMenuId) {
                this.$message.error("请先选择一个菜单再进行删除");
                return;
            }

            await deleteMenu(this.selectMenuId);
            const userInfo = await getUserInfo();
            this.setMenuTreeList(userInfo.menuTreeList);
            this.$message.success("删除菜单信息成功!!");
        },
        async batchdeleteMenuHandle() {

        }
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
    // width: 100%;
}


// 编辑菜单的文字
.edit-menu-title {
    font-size: 16px;
}

// 菜单操作按钮的容器
.menu-operation-btn-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .ant-btn {
        margin-right: 12px;
        margin-bottom: 10px;
    }
}


.tree-container {
    max-height: 650px;
    overflow: auto;

    /deep/ li[role='treeitem'] {
        position: relative;

        &.ant-tree-treenode-selected {
            .ant-tree-node-selected {
                background-color: transparent;
            }

            >.ant-tree-checkbox {
                position: relative;
                z-index: 1;
            }

            >.ant-tree-node-content-wrapper {
                &::before {
                    background-color: @primary-color;
                }

                >.ant-tree-title {
                    color: white;
                }
            }
        }
    }

    /deep/ .ant-tree-switcher {
        z-index: 1;
    }

    /deep/ .ant-tree-node-content-wrapper {
        &::before {
            position: absolute;
            right: 0;
            left: 0;
            height: 24px;
            -webkit-transition: all 0.3s;
            transition: all 0.3s;
            content: '';
        }

        &:hover {
            background-color: transparent;

            &::before {
                background-color: @hover-bg-color;
            }
        }

        .ant-tree-title {
            position: relative;
            z-index: 1;
        }

    }
}
</style>