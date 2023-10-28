# FormItem 表单项

主要用于表单项的一个配置



## 何时使用

在管理页面的时候的新增修改表单或者其他的一些表单都可以使用到





## API

### 属性列表

| 参数     | 说明             | 类型   | 默认值/实例 | 是否必填 |
| -------- | ---------------- | ------ | ----------- | -------- |
| formType | 表单项类型       | String | input       | 是       |
| props    | 表单的自定义属性 | Object |             | 否       |



formType所有可填写值

| 值           | 含义（对应ant-design-vue的哪个表单组件） |
| ------------ | ---------------------------------------- |
| autoComplete | AutoComplete                             |
| cascader     | Cascader                                 |
| checkbox     | Checkbox                                 |
| datePicker   | DatePicker                               |
| monthPicker  | MonthPicker                              |
| rangePicker  | MonthPicker                              |
| weekPicker   | WeekPicker                               |
| timePicker   | TimePicker                               |
| input        | Input                                    |
| searchInput  | inputSearch                              |
| textarea     | TextArea                                 |
| inputGroup   | InputGroup                               |
| inputNumber  | InputNumber                              |
| radio        | Radio                                    |
| radioGroup   | RadioGroup                               |
| rate         | Rate                                     |
| select       | Select                                   |
| treeSelect   | TreeSelect                               |
| slider       | Slider                                   |
| switch       | ASwitch                                  |
| upload       | Upload                                   |

