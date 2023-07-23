<template>
    <div class="search-form-container">
        <a-row>
            <a-col :xl="{ span: 16 }" :lg="{ span: 24 }" :xxl="{ span: 22 }">
                <a-row class="search-form-row">
                    <a-col v-for="(searchItem, index) in uSearchFormList" :key="index" :lg="{ span: 8 }" :md="{ span: 12 }">
                        <div v-if="isExpand || (!isExpand && searchItem.currentMdSpan <= 24)" class="search-form-item">
                            <label>{{ searchItem.labelText }}</label>
                            <!-- 普通的文本框 -->
                            <a-input v-if="searchItem.type === 'input'" v-model="searchItem.value"
                                :placeholder="searchItem.placeholder" />
                            <!-- 带搜索的文本框 -->
                            <a-input-search v-else-if="searchItem.type === 'inputSearch'" v-model="searchItem.value"
                                :placeholder="searchItem.placeholder" />
                            <!-- 日期选择器 -->
                            <a-date-picker v-else-if="searchItem.type === 'datePicker'" v-model="searchItem.value"
                                :placeholder="searchItem.placeholder" :format="searchItem.format" />
                            <!-- 日期范围选择器 -->
                            <a-range-picker v-else-if="searchItem.type === 'rangePicker'" v-model="searchItem.value"
                                :format="searchItem.format" />

                            <!-- 选择器 -->
                            <a-select v-else-if="searchItem.type === 'select'" v-model="searchItem.value"
                                style="width: 100%;">
                                <a-select-option v-for="(optionItem, optionIndex) in searchItem.options" :key="optionIndex"
                                    :value="optionItem.value">
                                    {{ optionItem.name }}
                                </a-select-option>
                            </a-select>

                        </div>

                    </a-col>
                </a-row>
            </a-col>
            <a-col :xl="{ span: 8 }" :lg="{ span: 24 }" :xxl="{ span: 2 }">
                <div class="search-btn-container">
                    <a-button type="primary" @click="searchForm">查询</a-button>
                    <a-button type="primary" @click="resetForm">重置</a-button>
                    <a class="toggle-expand-btn" @click="toggleExpandStatus">
                        {{ isExpand ? '收起' : '展开' }}
                        <a-icon :type="isExpand ? 'up' : 'down'" />
                    </a>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {
    props: {
        // 既然使用到了这个组件，这个属性就是必须传递的
        /**
         * [{
         *      type : "", 类型
         *            input         <a-input />   placeholder 普通搜索框
         *            inputSearch   <a-input-search /> placeholder 带查询图标的搜索框
         *            datePicker    <a-date-picker />  format 格式化显示，YYYY-MM-DD HH:MM:SS 日期选择器
         *            rangePicker   <a-range-picker /> format placeholder = [] 日期的范围选择器
         *            select        <a-select ></a-select> 
         *            
         * }]
         */
        searchFormList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            uSearchFormList: [], //处理完成的searchFormList
            isExpand: false, //是否展开
        }
    },
    created() {
        this.getUSearchFormList();
    },
    methods: {
        /**
         * 将searchFormList进行一个处理
         * 大概做几件事情
         *  默认给placeholder，设置datepicker的默认格式，以及select默认options[]放置没有传递undefined的情况
         */
        getUSearchFormList() {
            let currentMdSpan = 0;
            this.uSearchFormList = this.searchFormList.map(searchItem => {
                let type = searchItem.type || 'input'; //默认是input
                let placeholder = '';
                let value = '';

                if (!searchItem.title) {
                    placeholder = "请输入"
                } else {
                    placeholder = searchItem.title;
                }

                let mdSpan = 8;
                if (type === 'datePicker') {
                    searchItem.format = "YYYY-MM-DD HH:mm:ss";
                } else if (type === 'select') {
                    searchItem.options = searchItem.options || [];
                } else if (type === 'rangePicker') {
                    // mdSpan = 12;
                    placeholder = placeholder || [];
                    value = value || null;
                }
                currentMdSpan += mdSpan;

                let labelText = searchItem.labelText || searchItem.title;

                const newSearchFormObj = {
                    type,
                    ...searchItem,
                    placeholder,
                    labelText,
                    value,
                    mdSpan,
                    currentMdSpan
                };

                return newSearchFormObj;
            });
        },
        // 查询表单
        searchForm() {
            // const searchFormInfoList = [];
            // 每次进行一个提交的时候对数据进行一个处理
            this.uSearchFormList.forEach(searchFormItem => {
                const {
                    type,
                    key,
                    value
                } = searchFormItem;

                const searchFormInfoObj = {
                    key,
                    value
                };

                // 时间和时间范围
                if (type === 'rangePicker') {
                    searchFormInfoObj
                } else if (type === 'datePicker') {
                    searchFormInfoObj
                }
            });
            this.$emit('searchForm', this.uSearchFormList);
        },
        // 重置表单
        resetForm() {
            this.uSearchFormList.forEach(searchFormItem => {
                if (searchFormItem.type === 'rangePicker' || searchFormItem.type === 'datePicker') {
                    searchFormItem.value = null;
                } else {
                    searchFormItem.value = '';
                }
            });
            this.$message.success("重置查询表单成功");
        },
        // 切换展开状态
        toggleExpandStatus() {
            this.isExpand = !this.isExpand;
        }
    }
}
</script>

<style lang="less" scoped>
.search-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;

    label {
        white-space: nowrap;
        padding-right: 12px;
    }
}


.search-btn-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    /deep/ .ant-btn {
        margin-right: 10px;
    }

    .toggle-expand-btn {
        white-space: nowrap;
    }
}
</style>