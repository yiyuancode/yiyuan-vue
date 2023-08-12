<template>
    <div class="search-form-container">
        <a-row>
            <a-col :xxl="{ span: 20 }" :xl="{ span: 18 }" :lg="{ span: 24 }">
                <a-row class="search-form-row">
                    <a-col v-for="(searchItem, index) in uSearchFormList" :key="index" :lg="{ span: 8 }" :md="{ span: 12 }">
                        <div v-if="isExpand || index <= 2" class="search-form-item">
                            <label>{{ searchItem.labelText }} {{ searchItem.value }}</label>
                            <FormItem v-model="searchItem.value" :formType="searchItem.formType"
                                :props="searchItem.props" />
                        </div>

                    </a-col>
                </a-row>
            </a-col>
            <a-col :xxl="{ span: 4 }" :xl="{ span: 6 }" :lg="{ span: 24 }">
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
import FormItem from "../tool/FormItem";
import moment from "moment";
export default {
    components: {
        FormItem
    },
    props: {
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
            this.uSearchFormList = this.searchFormList.map(searchItem => {
                const {
                    formType,
                    labelText,
                    title,
                    options,
                    key,
                } = searchItem;

                let format = "";
                let showTime = "";
                let placeholder = title;

                // 进行一些初始化配置
                if (formType === 'datePicker' || formType === "rangePicker") {
                    format = "YYYY-MM-DD HH:mm:ss";
                    placeholder = undefined;
                    showTime = {
                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
                    }
                }

                const newSearchFormObj = {
                    key,
                    formType,
                    labelText: labelText || title,
                    props: {
                        format,
                        options,
                        placeholder,
                        showTime,
                        style: { width: '100%' }
                    }
                };

                return newSearchFormObj;
            });
        },
        // 查询表单
        searchForm() {
            const searchFormInfoObj = {};

            // 每次进行一个提交的时候对数据进行一个处理
            this.uSearchFormList.forEach(searchFormItem => {
                const {
                    formType,
                    key,
                    value,
                } = searchFormItem;

                let tempValue = value;
                if (Object.prototype.toString.call(value) === '[object Object]') {
                    tempValue = { ...value }
                } else if (Object.prototype.toString.call(value) === '[object Array]') {
                    tempValue = [...value]
                }

                // 时间和时间范围
                if (formType === 'rangePicker') {
                    if (tempValue && tempValue.length) {
                        for (let i = 0; i < tempValue.length; i++) {
                            tempValue[i] = tempValue[i].format('YYYY-MM-DD HH:mm:ss');
                            let tempKey;
                            if (i === 0) {
                                tempKey = `${key}Start`;
                            } else {
                                tempKey = `${key}End`;
                            }

                            searchFormInfoObj[tempKey] = tempValue[i];
                        }
                    }

                } else if (formType === 'datePicker') {
                    if (tempValue !== '' && tempValue !== undefined) {
                        searchFormInfoObj[key] = tempValue.format('YYYY-MM-DD HH:mm:ss');
                    }
                }

                if (tempValue !== '' && tempValue !== undefined) {
                    if (formType !== 'rangePicker') {
                        searchFormInfoObj[key] = tempValue;
                    }
                }

            });

            this.$emit('onSearch', searchFormInfoObj);
        },
        // 重置表单
        resetForm() {
            this.uSearchFormList.forEach(searchFormItem => {
                searchFormItem.value = undefined;
            });

            this.$emit('onReset');
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

    /deep/ .ant-calendar-picker {
        width: 100%;
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