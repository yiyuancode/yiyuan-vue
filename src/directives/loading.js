// import { Spin } from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import "./loading.less";
// import Vue from "vue";

// const LoadingDirective = {
//   // 指令的定义
//   directiveName: 'loading',
//   // 指令的生命周期钩子函数
//   inserted(el, binding) {
//     // 创建Spin组件的子类
//     const SpinComponent = Vue.extend(Spin);
//     // 创建Spin组件的实例
//     const spin = new SpinComponent({
//       el: document.createElement('div'),
//       propsData: {
//         spinning: binding.value === true,
//         delay: 300,
//       },
//     });
//     // 将Spin组件的DOM添加到el中
//     // spin.$el.classList.add('loading');
//     el.appendChild(spin.$el);
//     // 保存Spin实例引用，方便后续移除
//     el.__spin__ = spin;
//     // 设置元素的position为relative，以便Spin组件可以正确定位
//     el.style.position = 'relative';
//   },
//   // 指令与元素解绑时
// //   unbind(el) {
// //     // 销毁Spin实例
// //     el.__spin__.$destroy();
// //     // 清空元素的position属性
// //     el.style.position = '';
// //   },
// };

// export default LoadingDirective;
