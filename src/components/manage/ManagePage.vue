<template>
    <div>
        <div class="manage-container">
            <!-- 查询操作 -->
            <div class="search-container">
                <a-input-search style="width: 300px;" placeholder="请输入角色名称" enter-button />
            </div>

            <!-- 主体内容区域  -->
            <div class="content-container">
                <div class="operate-btn-container">
                    <!-- <slot name=""></slot> -->
                    <a-button v-if="uRenderObj.addBtn.isOpen" type="primary" @click="addHandle">
                        {{ uRenderObj.addBtn.text }}
                    </a-button>

                    <slot name="otherOperationList">

                    </slot>
                    <!-- <a-button type="primary">分配权限</a-button> -->
                </div>

                <!-- 列表容器 -->
                <div class="list-container">
                    <a-table :columns="theadDataArr" :data-source="data" :pagination="false" style="margin-bottom: 10px;"
                        :loading="uRenderObj.isLoading" :rowKey="(record, index) => { return index }">
                        <span slot="action" slot-scope="text, record">
                            <div v-if="uRenderObj.operateMode === 1" class="operate-btn-container">
                                <a-button v-if="uRenderObj.editBtn.isOpen" type="primary" @click="editHandle(record.id)">{{
                                    uRenderObj.editBtn.text }}</a-button>

                                <!-- 删除 -->
                                <a-popconfirm title="是否要删除这条信息?" ok-text="确认" cancel-text="取消"
                                    @confirm="confirmDeleteHandle(record.id)">
                                    <a-button v-if="uRenderObj.deleteBtn.isOpen" type="primary">删除</a-button>
                                </a-popconfirm>

                                <slot name="otherOpContainer" :data="record"></slot>
                            </div>
                        </span>
                    </a-table>

                    <div class="page-container">
                        <a-pagination show-quick-jumper show-size-changer :total="total" :show-total="total => `共${total}条`"
                            :current="pageNum" />

                    </div>
                </div>
            </div>

            <slot></slot>
        </div>

        <Modal :modalTitle="submitModalTitle" :modalVisible="addModalVisble" :submitLoading="submitLoading"
            @submitHandle="submitAddHandle" @closeModalHandle="addModalVisble = false" @resetHandle="resetHandle">
            <slot ref="addModal" name="addModal"></slot>
        </Modal>
    </div>
</template>

<script>
import Modal from "@/components/modal/Modal";
// 默认的渲染对象配置
const defaultRenderobj = {
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
    otherOperateList: [], //其他操作列表
    operateMode: 1,   // 操作按钮的显示模式，可以做几种显示模式，目前两种，一种是直接按钮铺开，一种是按钮组，下拉菜单(1表示按钮铺开，2表示按钮组下拉菜单)
    loading: false,
}
/**
 * 管理页面的插件
 */
export default {
    components: {
        Modal
    },
    props: {
        renderObj: {
            type: Object,
            default: () => {
                return defaultRenderobj
            },
        },
        modalManageObj: {
            type: Object,
        },
        //表头数据数组
        theadDataArr: {
            type: Array,
            required: true,
            default: () => [],
        },
        // 表格数据
        data: {
            type: Array,
            required: true
        },
        pageNum: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        total: {
            type: Number,
            default: 0
        },
    },

    data() {
        return {
            addModalVisble: false,
            submitOpType: "", //提交的操作类型
            submitModalTitle: "",
            submitLoading: false,
            currentId: null
        }
    },
    computed: {
        uRenderObj() {
            return Object.assign(defaultRenderobj, this.renderObj);
        }
    },
    methods: {
        // 显示添加模态框的处理
        addHandle() {
            this.addModalVisble = true;
            this.submitOpType = "add";
            this.$emit("addHandle", (form, formRef) => {
                for (let prop in form) {
                    form[prop] = '';
                }
                formRef.resetFields();
            });
            this.submitModalTitle = "添加";
        },
        // 关闭添加模态框
        closeAddModalHandle() {
            this.addModalVisble = false;
        },
        // 编辑的处理
        editHandle(id) {
            this.addModalVisble = true;
            this.submitOpType = "edit";
            this.$emit("editHandle", id, (formRef) => {
                formRef.resetFields();
            });
            this.currentId = id;
            this.submitModalTitle = "编辑";
        },
        // 确认删除的处理函数
        confirmDeleteHandle(id) {
            this.$emit('confirmDeleteHandle', id);
        },
        // 提交添加的一个处理函数
        submitAddHandle() {
            this.submitLoading = true;
            this.$emit('submitAddHandle', this.submitOpType, this.currentId, () => {
                // this.addModalVisble = false;
                this.submitLoading = false;
            });
        },
        // 重置处理
        resetHandle() {
            this.$emit("resetHandle", (formRef) => {
                formRef.resetFields();
                this.$message.success("重置信息成功!!");
            });
        }
    }

}   
</script>

<style lang="less" scoped>
.search-container,
.content-container {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
}

.list-container {
    margin-top: 10px
}

.page-container {
    display: flex;
    justify-content: flex-end;
}

// 操作按钮容器
.operate-btn-container {
    display: flex;

    .ant-btn {
        margin-right: 10px;
    }
}
</style>