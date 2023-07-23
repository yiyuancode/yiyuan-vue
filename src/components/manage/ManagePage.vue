<template>
    <div>

        <!-- 管理容器 -->
        <div class="manage-container">

            <!-- 查询操作容器 -->
            <div class="search-container">
                <searchForm :searchFormList="searchFormList">

                </searchForm>
            </div>

            <!-- 主体内容区域  -->
            <div class="content-container">

                <div class="operate-btn-container">
                    <!-- 添加 -->
                    <a-button v-if="uRenderObj.addBtn.isOpen" type="primary" @click="addHandle">
                        {{ uRenderObj.addBtn.text }}
                    </a-button>

                    <!-- 导入 -->
                    <a-button v-if="uRenderObj.importBtn.isOpen" type="primary" @click="importHandle">
                        {{ uRenderObj.importBtn.text }}
                    </a-button>

                    <!-- 导出 -->
                    <a-button v-if="uRenderObj.exportBtn.isOpen" type="primary" @click="exportHandle">
                        {{ uRenderObj.exportBtn.text }}
                    </a-button>

                    <a-popconfirm title="是否要批量删除这些信息?" ok-text="确认" cancel-text="取消" @confirm="batchDeleteHandle">
                        <a-button v-if="uRenderObj.batchDeleteBtn.isOpen" type="primary">
                            {{ uRenderObj.batchDeleteBtn.text }}
                        </a-button>
                    </a-popconfirm>
                    <!-- 批量删除 -->


                    <!-- 代表的是全局的一个操作，和添加并列 -->
                    <slot name="otherOperationsGOContainer">

                    </slot>
                </div>

                <!-- 列表容器 -->
                <div class="list-container">
                    <a-table style="margin-bottom: 10px;" :columns="uTheadData" :data-source="data" :pagination="false"
                        :loading="uRenderObj.isLoading" :rowKey="(record, index) => { return index }"
                        :row-selection="rowSelection">

                        <!-- 进行一个自定义插槽的遍历 -->
                        <template v-for="(item, index) in tdColumnData" :slot="item.scopedSlots?.customRender"
                            slot-scope="text,record">
                            <!-- {{ record }} -->
                            <slot :name="'table-' + item.scopedSlots?.customRender" v-bind="{ text, record }"></slot>
                        </template>

                        <span slot="action" slot-scope="text, record">
                            <div v-if="uRenderObj.operateMode === 1" class="operate-btn-container">
                                <a-button v-if="uRenderObj.editBtn.isOpen" type="primary" @click="editHandle(record.id)">{{
                                    uRenderObj.editBtn.text }}</a-button>

                                <!-- 删除 -->
                                <a-popconfirm title="是否要删除这条信息?" ok-text="确认" cancel-text="取消"
                                    @confirm="confirmDeleteHandle(record.id)">
                                    <a-button v-if="uRenderObj.deleteBtn.isOpen" type="primary">删除</a-button>
                                </a-popconfirm>

                                <!-- 针对单个其他操作容器的添加 -->
                                <slot name="otherOperationsContainer" :data="record">
                                </slot>
                            </div>
                        </span>
                    </a-table>

                    <!-- 分页容器 -->
                    <div class="page-container">
                        <a-pagination show-quick-jumper show-size-changer :total="pageInfo.total"
                            :show-total="total => `共${total}条`" :current="pageInfo.pageNum" />
                    </div>
                </div>
            </div>

            <slot></slot>
        </div>

        <Modal :modalTitle="submitModalTitle" :modalVisible="modalVisble" :submitLoading="submitLoading"
            @submitHandle="submitHandle" @closeModalHandle="modalVisble = false" @resetHandle="resetHandle" >
            <slot ref="submitModal" name="submitModal" :opType="submitOpType"></slot>
        </Modal>
    </div>
</template>

<script>
import Modal from "@/components/modal/Modal";
import searchForm from "@/components/search/searchForm"
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
    batchDeleteBtn: {
        isOpen: true,
        text: "批量删除",
    },
    operateMode: 1,   // 操作按钮的显示模式，可以做几种显示模式，目前两种，一种是直接按钮铺开，一种是按钮组，下拉菜单(1表示按钮铺开，2表示按钮组下拉菜单)
    loading: false, //加载
    isOpenSelectCheckbox: true,
    idProp: "id", //需要批量操作使用的data的id属性值
}
/**
 * 管理页面的插件
 */
export default {
    components: {
        Modal,
        searchForm,
    },
    props: {
        renderObj: {
            type: Object,
            default: () => {
                return defaultRenderobj
            },
        },
        //表头数据数组
        theadData: {
            type: Array,
            required: true,
        },
        // 分页相关数据
        pageInfo: {
            type: Object,
            default: () => ({
                pageSize: 10,
                pageNum: 1,
                total: 0,
            })
        },
        // 表格数据
        data: {
            type: Array,
            required: true
        },
        // 表单的规则
        formRules:{
            type : Object,
        },
        formModel:{
            type : Object,
        }
    },

    data() {
        return {
            modalVisble: false,
            submitOpType: "", //提交的操作类型
            submitModalTitle: "",
            submitLoading: false,
            currentId: null,
            selectedRows: [],
            searchFormList: [],
        }
    },

    computed: {
        // 渲染对象和默认渲染对象进行一个混合
        uRenderObj() {
            return Object.assign(defaultRenderobj, this.renderObj);
        },

        // 表头进行处理，增加操作
        uTheadData() {
            return [...this.theadData, {
                title: '操作',
                key: 'action',
                scopedSlots: { customRender: 'action' },
                fixed: 'right',
            }];
        },
        // 插槽
        tdColumnData() {
            return this.uTheadData.filter(ut => {
                return ut.scopedSlots && ut.scopedSlots?.customRender !== 'action';
            });
        },
        // 表格复选框的一个显示配置
        rowSelection() {
            const defaultRowSelection = {
                onSelect: (record, selected, selectedRows) => {
                    this.selectedRows = selectedRows;
                },
                onSelectAll: (selected, selectedRows) => {
                    this.selectedRows = selectedRows;
                }
            }
            if (this.uRenderObj.isOpenSelectCheckbox) {
                return defaultRowSelection;
            } else {
                return null;
            }
        }
    },
    created() {
        // 将theadData里面带isSearch进行一个处理，处理成searchForm需要的数据 
        this.getSearchFormList();
    },
    methods: {
        getSearchFormList() {
            const searchFormList = [];
            this.theadData.forEach(theadItem => {
                if (typeof theadItem === "object") {
                    const {
                        key,
                        title,
                        isSearch,
                        searchObj, //查询的配置对象
                    } = theadItem;

                    // 是否可以搜索
                    if (isSearch) {
                        const searchFormObj = {
                            key,
                            title,
                            isSearch,
                        }

                        if (searchObj) {
                            for(let prop in searchObj){
                                searchFormObj[prop] = searchObj[prop];
                            }
                        }

                        searchFormList.push(searchFormObj);
                    }
                }
                else {
                    Promise.reject("theadData里面的每一项必须是对象");
                    return;
                }
            });
            this.searchFormList = searchFormList;
        },
        // 显示添加模态框的处理
        async addHandle() {
            this.modalVisble = true;
            this.submitOpType = "add";
            this.submitModalTitle = "添加";
            await this.$emit("modalShow");
            this.$nextTick(()=>{
                console.log(this.$refs);
            })
        },
        importHandle() {
            this.noDeveloped();
        },
        exportHandle() {
            this.noDeveloped();
        },
        // 批量删除
        batchDeleteHandle() {
            const idProp = this.uRenderObj.idProp;
            const ids = this.selectedRows.map(selRow => {
                return selRow[idProp];
            }).join(",");
            // 判断当前是否选择了
            if (!ids) {
                this.$message.error("请至少选择一项");
                return;
            }

            this.$emit("batchDeleteHandle", ids, () => {
                this.selectedRows = [];
            });
        },
        // 编辑的处理
        editHandle(id) {
            this.modalVisble = true;
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
        submitHandle() {
            this.submitLoading = true;
            this.$emit('submitHandle', this.submitOpType, this.currentId, (flag, formRef) => {
                this.submitLoading = false;

                // 添加
                if (this.submitOpType === "add") {
                    if (flag) {
                        this.$message.success("添加成功");
                        formRef.resetFields();
                    }
                }
                // 编辑
                else if (this.submitOpType === "edit") {
                    if (flag) {
                        this.$message.success("修改成功")
                    }
                }
            });
        },
        // 重置处理
        resetHandle() {
            this.$emit("resetHandle", (formRef) => {
                formRef.resetFields();
                this.$message.success("重置信息成功!!");
            });
        },
        noDeveloped() {
            this.$message.warning("该功能还没有开发..");
        }
    },


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

    margin-top: 10px;

    /deep/ .ant-table {
        tr {

            td,
            th {
                min-width: 60px;
            }
        }
    }
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