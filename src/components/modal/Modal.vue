<template>
    <a-drawer :title="modalTitle" :closable="true" :width="450" :visible="modalVisible" @close="closeModalHandle">

        <!-- 默认插槽 -->
        <slot ref="modalContent"></slot>


        <div class="modal-footer">
            <a-button :style="{ marginRight: '8px' }" @click="resetHandle">
                重置
            </a-button>
            <a-button type="primary" :loading="submitLoading" @click="submitHandle">
                确认
            </a-button>
        </div>

    </a-drawer>
</template>

<script>
export default {
    props: {
        modalTitle: {
            type: String,
            required: true,
        },
        modalWidth: {
            type: Number,
            default: 450
        },
        modalVisible: {
            type: Boolean,
            default: true
        },
        submitLoading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 进行重置
        resetHandle() {
            this.$emit("onReset");
        },
        // 进行确认
        submitHandle() {
            this.$emit("onSubmit");
        },
        closeModalHandle(){
            this.$emit("onCloseModal");
        }
    }
}
</script>

<style lang="less" scoped>
.modal-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #e9e9e9;
    padding: 10px 16px;
    background: #fff;
    text-align: right;
    z-index: 1;
}
</style>