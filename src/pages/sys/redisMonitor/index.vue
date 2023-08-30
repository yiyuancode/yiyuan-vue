<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-left"></div>
        <div class="mh-middle">主机监控面板</div>
        <div class="mh-right">
          <dv-border-box-2
            style="
              width: 120px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              margin-left: 200px;
            "
          >
            设置
          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <div class="mc-top">
          <Top-Middle-Cmp
            v-if="avgMemoryUsage.xAxis.length != 0"
            :props="avgMemoryUsage"
          />
          <Top-Middle-Cmp
            v-if="avgMemoryUsage.xAxis.length != 0"
            :props="avgDiskUsage"
          />
          <Top-Middle-Cmp
            v-if="avgCpuUsage.xAxis.length != 0"
            :props="avgCpuUsage"
          />
        </div>
        <div class="mc-top">
          <Top-Middle-Cmp
            v-if="totalNetworkUsage.xAxis.length != 0"
            :props="totalNetworkUsage"
          />
          <Top-Middle-Cmp
            v-if="totalProcessCount.xAxis.length != 0"
            :props="totalProcessCount"
          />
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import moment from 'moment';
import { geHostMonitorQueryCount } from '@/api/sys/hostMonitor';
import TopMiddleCmp from './TopMiddleCmp';

export default {
  name: 'redisMonitor',
  components: {
    // TopLeftCmp,
    TopMiddleCmp
  },
  data() {
    return {
      //统计内存平均使用率 单位百分比
      avgMemoryUsage: {
        legendData: ['内存平均使用率(单位百分比)'],
        xAxis: [],
        seriesData: [],
        title: '内存平均使用率'
      },
      //统计磁盘平均使用率，单位百分比
      avgDiskUsage: {
        legendData: ['磁盘平均使用率(单位百分比)'],
        xAxis: [],
        seriesData: [],
        title: '磁盘平均使用率'
      },
      avgCpuUsage: {
        legendData: ['CPU平均使用率(单位百分比)'],
        xAxis: [],
        seriesData: [],
        title: 'CPU平均使用率'
      },
      totalNetworkUsage: {
        legendData: ['服务器网络流量(单位GB)'],
        xAxis: [],
        seriesData: [],
        title: '服务器网络流量'
      },
      totalProcessCount: {
        legendData: ['服务器进程数(单位个)'],
        xAxis: [],
        seriesData: [],
        title: '服务器进程数'
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
        createTimeStart: '2023-08-05 09:00:00',
        createTimeEnd: '2023-08-05 16:00:00'
      });
      resp.forEach((item) => {
        //YYYY-MM-DD HH:mm:ss
        vm.avgMemoryUsage.xAxis.push(moment(item.time).format('HH:mm'));
        vm.avgDiskUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.avgCpuUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.totalNetworkUsage.xAxis = vm.avgMemoryUsage.xAxis;
        vm.totalProcessCount.xAxis = vm.avgMemoryUsage.xAxis;

        vm.avgMemoryUsage.seriesData.push(item.avgMemoryUsage);
        vm.avgDiskUsage.seriesData.push(item.avgDiskUsage);
        vm.avgCpuUsage.seriesData.push(item.avgCpuUsage);

        vm.totalNetworkUsage.seriesData.push(
          item.totalNetworkUsage / 1000000000
        );
        vm.totalProcessCount.seriesData.push(item.totalProcessCount);
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
