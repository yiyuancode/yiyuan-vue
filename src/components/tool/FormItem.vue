<template>
    <!-- 自动完成 -->
    <a-auto-complete v-if="formItem.type === 'autoComplete'" v-model="formItem.value"></a-auto-complete>

    <!-- 级联选择 -->
    <a-cascader v-else-if="formItem.type === 'cascader'" v-model="formItem.value"></a-cascader>

    <!-- 多选框 -->
    <a-checkbox v-else-if="formItem.type === 'checkbox'" v-model="formItem.value"></a-checkbox>

    <!-- 多选框组 -->
    <a-checkbox-group v-else-if="formItem.type === 'checkboxGroup'" v-model="formItem.value" />


    <!-- 日期选择器 -->
    <a-date-picker v-else-if="formItem.type === 'datePicker'" v-model="formItem.value" :placeholder="formItem.placeholder"
        :format="formItem.format" />

    <!-- 月份选择器 -->
    <a-month-picker v-else-if="formItem.type === 'monthPicker'" v-model="formItem.value" />

    <!-- 日期范围选择器 -->
    <a-range-picker v-else-if="formItem.type === 'rangePicker'" v-model="formItem.value" format="YYYY-MM-DD HH:mm:ss"
        :show-time="showTime" />

    <!-- 星期选择器 -->
    <a-week-picker v-else-if="formItem.type === 'weekPicker'" v-model="formItem.value" />

    <!-- 时间选择框 -->
    <a-time-picker v-else-if="formItem.type === 'timePicker'" v-model="formItem.value" />

    <!-- 输入框 -->
    <a-input v-else-if="formItem.type === 'input'" v-model="formItem.value" :placeholder="formItem.placeholder" />

    <!-- 带搜索按钮的输入框 -->
    <a-input-search v-else-if="formItem.type === 'searchInput'" v-model="formItem.value"
        :placeholder="formItem.placeholder" />


    <!-- 输入框组 -->
    <a-input-group v-else-if="formItem.type === 'inputGroup'"></a-input-group>

    <!-- 文本域 -->
    <a-textarea v-else-if="formItem.type === 'textarea'" v-model="formItem.value"></a-textarea>


    <!-- 数字输入框 -->
    <a-input-number v-else-if="formItem.type === 'inputNumber'" v-model="formItem.value"></a-input-number>

    <!-- 单选框 -->
    <a-radio v-else-if="formItem.type === 'radio'" v-model="formItem.value"></a-radio>

    <!-- 单选框组 -->
    <a-radio-group v-else-if="formItem.type === 'radioGroup'" v-model="formItem.value"></a-radio-group>

    <!-- 评分 -->
    <a-rate v-else-if="formItem.type === 'rate'" v-model="formItem.value" />

    <!-- 选择器 -->
    <a-select v-else-if="formItem.type === 'select'" v-model="formItem.value" style="width: 100%;"
        :placeholder="formItem.placeholder">
        <a-select-option v-for="(opItem, opIndex) in formItem.options" :key="opIndex" :value="opItem.value">
            {{ opItem.name }}
        </a-select-option>
    </a-select>

    <!-- 树选择 -->
    <a-tree-select v-else-if="formItem.type === 'treeSelect'" v-model="formItem.value">

    </a-tree-select>

    <!-- 滑动输入条 -->
    <a-slider v-else-if="formItem.type === 'slider'" v-model="formItem.value" />

    <!-- 开关 -->
    <a-switch v-else-if="formItem.type === 'switch'" v-model="formItem.value" />

    <!-- 上传 -->
    <a-upload v-else-if="formItem.type === 'upload'" v-model="formItem.value"></a-upload>
</template>

<script>
import moment from "moment";
export default {
    props: {
        formItem: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            moment,
            showTime: {
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
            }
        }
    },
}
</script>

<style lang="less" scoped></style>