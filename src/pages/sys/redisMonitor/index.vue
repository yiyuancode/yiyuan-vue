<template>
  <div id="data-view">
    <dv-full-screen-container>
      <dv-border-box-11
        title="Redis监控面板"
        :titleWidth="300"
        style="height: auto; width: 100%"
      >
        <div style="width: 96%; height: auto; margin: 0 auto; margin-top: 58px">
          <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts
                  ref="avgConnectedClients"
                  :props="avgConnectedClients"
                />
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts
                  ref="avgTotalCommandsProcessed"
                  :props="avgTotalCommandsProcessed"
                />
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts ref="avgUsedMemory" :props="avgUsedMemory" />
              </div>
            </a-col>

            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="gutter-box" style="height: 350px">
                <LineAreaCharts
                  ref="avgTotalKeyCount"
                  :props="avgTotalKeyCount"
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
import { geReidsMonitorQueryCount } from '@/api/sys/redisMonitor';
import LineAreaCharts from '@/components/charts/LineAreaCharts.vue';

export default {
  name: 'DataView',
  components: {
    // TopLeftCmp,
    LineAreaCharts
  },
  data() {
    return {
      //统计平均已连接客户端数 单位个
      avgConnectedClients: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgConnectedClients',
        title: {
          text: '平均已连接客户端数',
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
      //统计平均处理命令总数，单位个
      avgTotalCommandsProcessed: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgDiskUsage',
        title: {
          text: '平均处理命令总数',
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
      //统计 平均已使用内存量
      avgUsedMemory: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgUsedMemory',
        title: {
          text: '平均已使用内存量',
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
      //统计 平均键总数
      avgTotalKeyCount: {
        dvBox: {
          type: 11,
          color: ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 1)']
        },
        ref: 'avgTotalKeyCount',
        title: {
          text: '平均键总数',
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
    this.geReidsMonitorQueryCount();
  },
  methods: {
    async geReidsMonitorQueryCount() {
      console.log('geReidsMonitorQueryCount.resp', this.$route.query);
      let vm = this;
      let resp = await geReidsMonitorQueryCount({
        redisId: this.$route.query.id,
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
        vm.avgConnectedClients.series[0].data.push(item.avgConnectedClients);
        vm.avgConnectedClients.xAxis[0].data.push(
          moment(item.time).format('HH:mm')
        );
        vm.$refs.avgConnectedClients.resetCharts();

        vm.avgTotalCommandsProcessed.series[0].data.push(
          item.avgTotalCommandsProcessed
        );
        vm.avgTotalCommandsProcessed.xAxis = vm.avgConnectedClients.xAxis;
        vm.$refs.avgTotalCommandsProcessed.resetCharts();

        vm.avgUsedMemory.series[0].data.push(
          (item.avgUsedMemory / 1000000).toFixed(2)
        );
        vm.avgUsedMemory.xAxis = vm.avgConnectedClients.xAxis;
        vm.$refs.avgUsedMemory.resetCharts();

        vm.avgTotalKeyCount.series[0].data.push(item.avgTotalKeyCount);
        vm.avgTotalKeyCount.xAxis = vm.avgConnectedClients.xAxis;
        vm.$refs.avgTotalKeyCount.resetCharts();
      });
      console.log('geReidsMonitorQueryCount.resp', resp);
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
