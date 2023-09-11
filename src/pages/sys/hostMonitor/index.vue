<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-border-box-11
        title="服务器监控面板"
        :titleWidth="300"
        style="height: auto; width: 100%"
      >
        <div style="width: 96%; height: auto; margin: 0 auto; margin-top: 58px">
          <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts ref="avgMemoryUsage" :props="avgMemoryUsage" />
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts ref="avgDiskUsage" :props="avgDiskUsage" />
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts ref="avgCpuUsage" :props="avgCpuUsage" />
              </div>
            </a-col>

            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts
                  ref="totalNetworkUsage"
                  :props="totalNetworkUsage"
                />
              </div>
            </a-col>

            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350 px">
                <LineAreaCharts
                  ref="totalProcessCount"
                  :props="totalProcessCount"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </dv-border-box-11>
    </dv-full-screen-container>
  </div>
</template>

<script>
import moment from 'moment';
import { geHostMonitorQueryCount } from '@/api/sys/hostMonitor';
import LineAreaCharts from '@/components/charts/LineAreaCharts.vue';

export default {
  name: 'DataView',
  components: {
    // TopLeftCmp,
    LineAreaCharts
  },
  data() {
    return {
      //统计内存平均使用率 单位百分比
      avgMemoryUsage: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgMemoryUsage',
        title: {
          text: '内存平均使用率',
          show: false
        },
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            data: []
          }
        ]
      },
      //统计磁盘平均使用率，单位百分比
      avgDiskUsage: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgDiskUsage',
        title: {
          text: '磁盘平均使用率',
          show: false
        },
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            data: []
          }
        ]
      },
      avgCpuUsage: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgCpuUsage',
        title: {
          text: 'CPU平均使用率',
          show: false
        },
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            data: []
          }
        ]
      },
      totalNetworkUsage: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'totalNetworkUsage',
        title: {
          text: '网络流量',
          show: false
        },
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            data: []
          }
        ]
      },
      totalProcessCount: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'totalProcessCount',
        title: {
          text: '进程数',
          show: false
        },
        xAxis: [
          {
            data: []
          }
        ],
        series: [
          {
            data: []
          }
        ]
      }
    };
  },
  created() {
    this.geHostMonitorQueryCount();
  },
  methods: {
    async geHostMonitorQueryCount() {
      console.log('geHostMonitorQueryCount.resp', this.$route.query);
      let vm = this;
      let resp = await geHostMonitorQueryCount({
        hostId: this.$route.query.id,
        particle: '1',
        createTimeStart: '2023-07-05 09:00:00',
        createTimeEnd: '2023-08-20 16:00:00'
      });

      resp.forEach((item) => {
        //YYYY-MM-DD HH:mm:ss
        //vm.avgMemoryUsage.xAxis.push(moment(item.time).format('HH:mm'));
        // vm.avgDiskUsage.xAxis = vm.avgMemoryUsage.xAxis;
        // vm.avgCpuUsage.xAxis = vm.avgMemoryUsage.xAxis;
        // vm.totalNetworkUsage.xAxis = vm.avgMemoryUsage.xAxis;
        // vm.totalProcessCount.xAxis = vm.avgMemoryUsage.xAxis;
        //
        vm.avgMemoryUsage.series[0].data.push(item.avgMemoryUsage);
        vm.avgMemoryUsage.xAxis[0].data.push(moment(item.time).format('HH:mm'));
        vm.$refs.avgMemoryUsage.resetCharts();

        vm.avgDiskUsage.series[0].data.push(item.avgDiskUsage);
        vm.avgDiskUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.$refs.avgDiskUsage.resetCharts();

        vm.avgCpuUsage.series[0].data.push(item.avgCpuUsage);
        vm.avgCpuUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.$refs.avgCpuUsage.resetCharts();

        vm.totalNetworkUsage.series[0].data.push(
          (item.totalNetworkUsage / 1000000000).toFixed(0)
        );
        vm.totalNetworkUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.$refs.totalNetworkUsage.resetCharts();

        vm.totalProcessCount.series[0].data.push(item.totalProcessCount);
        vm.totalProcessCount.xAxis = vm.avgMemoryUsage.xAxis;
        vm.$refs.totalProcessCount.resetCharts();
        // vm.avgDiskUsage.seriesData.push(item.avgDiskUsage);
        // vm.avgCpuUsage.seriesData.push(item.avgCpuUsage);

        // vm.totalNetworkUsage.seriesData.push(
        //   item.totalNetworkUsage / 1000000000
        // );
        // vm.totalProcessCount.seriesData.push(item.totalProcessCount);
      });
      console.log('geHostMonitorQueryCount.resp', resp);
    }
  }
};
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: auto;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100% !important;
    transform: none !important;
    overflow: auto !important;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1, 134, 187);

      a:visited {
        color: rgb(1, 134, 187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left,
    .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~'100% - 80px');

    .mc-top,
    .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }

    .mc-top {
      height: 40%;
    }

    .mc-bottom {
      height: 60%;
    }

    .top-left-cmp,
    .bottom-left-container {
      width: 32%;
    }

    .top-middle-cmp,
    .top-right-cmp {
      width: 34%;
    }

    .bottom-left-container {
      position: relative;

      .border-box-content {
        display: flex;
      }

      .mcb-decoration-1,
      .mcb-decoration-2 {
        position: absolute;
        left: 50%;
        margin-left: -2px;
      }

      .mcb-decoration-1 {
        top: 5%;
        transform: rotate(180deg);
      }

      .mcb-decoration-2 {
        top: 50%;
      }

      .bottom-left-chart-1,
      .bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }

    .bottom-right-container {
      width: 68%;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
    }
  }
}
</style>
