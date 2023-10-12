<template>
  <!--  <dv-border-box-11>-->

  <!--  </dv-border-box-11>-->

  <component
    :is="getBoxType()"
    :color="props.dvBox.color ? props.dvBox.color : ''"
    :title="option.title.text"
    style="height: 100%; width: 100%"
  >
    <div :id="props.ref" class="main"></div>
  </component>
</template>

<script>
import * as echarts from 'echarts';
import _ from 'lodash';

export default {
  name: 'LineAreaCharts',
  props: {
    props: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  data() {
    //
    return {
      echarts: null,
      option: {
        title: {
          text: 'Stacked Area Chart',
          show: false
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.props.title.text,
          left: 'center',
          // y: "-20px"
          bottom: 0,
          textStyle: {
            color: 'rgba(55, 162, 218)'
          }
          // padding: [-10, 10]
        },
        toolbox: {
          // feature: {
          //   saveAsImage: {}
          // }
          show: false
        },
        grid: {
          left: '3%',
          right: '4%',
          //可以控制图例和图形的间距
          bottom: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: this.props.title.text,
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(55, 162, 218, 0.6)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(55, 162, 218, 0)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      }
    };
  },
  created() {
    let vm = this;
    this.$nextTick(() => {
      setTimeout(() => {
        vm.resetCharts();
      }, 100);
      // 加载图表后进行监听重新加载图表
      window.addEventListener('resize', () => {
        setTimeout(() => {
          vm.echarts.resize();
        }, 100);
      });
    });
  },
  methods: {
    getBoxType() {
      return 'dv-border-box-' + this.props.dvBox.type;
    },
    resetCharts() {
      let chartDom = document.getElementById(this.props.ref);
      // let myChart = echarts.init(chartDom, 'dark');
      this.echarts = echarts.init(chartDom);
      let optionTemp = _.merge(this.option, this.props);
      //
      this.echarts.setOption(optionTemp);
    }
  }
};
</script>

<style lang="less">
.main {
  width: 98%;
  height: 98%;
  padding: 10px;
}

.top-middle-cmp {
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;

  .chart-name {
    position: absolute;
    right: 70px;
    text-align: right;
    font-size: 20px;
    top: 10px;
  }
}
</style>
