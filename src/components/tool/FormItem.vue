<template>
    <component :is="getComponentType()" :value="value" v-bind="props" @input="handleInput" @change="handleChange" 
        @blur="handleBlur">
    </component>
</template>

<script>

import {
    AutoComplete,
    Cascader,
    Checkbox,
    DatePicker,
    TimePicker,
    Input,
    InputNumber,
    Radio,
    Rate,
    Select,
    TreeSelect,
    Slider,
    Switch,
    Upload
} from "ant-design-vue";

const {
    Group: CheckboxGroup
} = Checkbox;

const {
    MonthPicker,
    RangePicker,
    WeekPicker
} = DatePicker;

const {
    Search: InputSearch,
    TextArea,
    Group: InputGroup,
} = Input;

const {
    Group: RadioGroup,
    Button: RadioButton
} = Radio;


export default {
    name : "FormItem",
    components: {
        AutoComplete,
        Cascader,
        Checkbox,
        CheckboxGroup,
        DatePicker,
        MonthPicker,
        RangePicker,
        WeekPicker,
        TimePicker,
        Input,
        InputSearch,
        TextArea,
        InputGroup,
        InputNumber,
        Radio,
        RadioGroup,
        RadioButton,
        Rate,
        Select,
        TreeSelect,
        Slider,
        ASwitch: Switch,
        Upload
    },
    props: {
        formType: {
            type: String,
            default: "input"
        },
        props: {
            type: Object,
            default: () => { }
        },
        value: [String, Number, Boolean, Array, Object],
    },

    data() {
        return {
            internalValue: this.value
        }
    },
    watch: {
        value(newValue) {
            // 监听外部传入的 value 值变化，同步更新内部的值
            this.internalValue = newValue;
        },
        internalValue(newValue) {
            // 监听内部值的变化，同步更新外部传入的 value 值
            this.$emit('input', newValue);
            this.$emit('change', newValue);
        },
    },
    methods: {
        // 获取组件的类型
        getComponentType() {
            // 根据 formItem.type 返回对应的组件名称
            // 这里可以根据需求添加更多的表单元素类型
            switch (this.formType) {
                case 'autoComplete':
                    return 'AutoComplete';
                case 'cascader':
                    return 'Cascader';
                case 'checkbox':
                    return 'Checkbox';
                case 'checkboxGroup':
                    return 'CheckboxGroup';
                case 'datePicker':
                    return 'DatePicker';
                case 'monthPicker':
                    return 'MonthPicker';
                case 'rangePicker':
                    return 'RangePicker';
                case 'weekPicker':
                    return 'WeekPicker';
                case 'timePicker':
                    return 'TimePicker';
                case 'input':
                    return 'Input';
                case 'searchInput':
                    return 'inputSearch';
                case 'textarea':
                    return 'TextArea';
                case 'inputGroup':
                    return 'InputGroup';
                case 'inputNumber':
                    return 'InputNumber';
                case 'radio':
                    return 'Radio';
                case 'radioGroup':
                    return 'RadioGroup';
                case 'rate':
                    return 'Rate';
                case 'select':
                    return 'Select';
                case 'treeSelect':
                    return 'TreeSelect';
                case 'slider':
                    return 'Slider';
                case 'switch':
                    return 'ASwitch';
                case 'upload':
                    return 'Upload';
                default:
                    return 'Input';
            }
        },

        handleInput(newValue) {
            if (this.formType !== 'radioGroup') {
                newValue = newValue.target.value;
            }
            this.internalValue = newValue;
        },

        handleChange(newValue) {
            if (this.formType === "radioGroup" || this.formType === 'textarea' || this.formType === 'input') {
                newValue = newValue.target.value;
            }
            this.internalValue = newValue;
            // 对于支持 change 事件的表单组件，触发 change 事件
            // this.$emit("change");
        },

        // 失去焦点的事件
        handleBlur() {
            this.$emit('blur');
        }
    }
}
</script>

<style lang="less" scoped></style>