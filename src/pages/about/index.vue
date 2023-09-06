<template>
  <div class="about-container">
    <div class="about-header">
      <span class="about-title">关于我们</span>
      <span class="about-desc"
        >yiyuan-vue是一个基于vue-ant-admin开发的中后台解决方案，它可以帮助您快速搭建企业级中后台，提供现成的开箱解决方案及丰富的示例</span
      >
    </div>
    <div class="about-content">
      <div class="about-info project-info">
        <span class="about-title">项目信息</span>

        <div class="about-info-table-con">
          <table class="about-info-table">
            <tr>
              <td class="about-label">版本</td>
              <td>{{ packageJson.version }}</td>
              <td class="about-label">最后编译时间</td>
              <td></td>
              <td class="about-label">文档地址</td>
              <td><a href="#">文档地址</a></td>
            </tr>
            <tr>
              <td class="about-label">预览地址</td>
              <td><a href="#">预览地址</a></td>
              <td class="about-label">Github</td>
              <td><a href="#">Github</a></td>
              <td class="about-label">浏览器支持</td>
              <td>{{ browsersStr }}</td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 生产环境依赖 -->
      <div class="about-info prod-env-dependencies">
        <span class="about-title">生产环境依赖</span>

        <div class="about-info-table-con">
          <table class="about-info-table">
            <tr v-for="(depList, depIndex) in dependencies" :key="depIndex">
              <template v-for="(dep, index) in depList">
                <td :key="index" class="about-label">{{ dep.prop }}</td>
                <td>{{ dep.value }}</td>
              </template>
            </tr>
          </table>
        </div>
      </div>

      <!-- 开发环境依赖 -->
      <div class="about-info dev-env-dependencies">
        <span class="about-title">开发环境依赖</span>

        <div class="about-info-table-con">
          <table class="about-info-table">
            <tr v-for="(depList, depIndex) in devDependencies" :key="depIndex">
              <template v-for="(dep, index) in depList">
                <td :key="index" class="about-label">{{ dep.prop }}</td>
                <td>{{ dep.value }}</td>
              </template>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { packageJson } from './index.js';
const { browserslist } = packageJson;
const browsersStr = browserslist.join(',');
export default {
  data() {
    return {
      packageJson,
      browsersStr
    };
  },
  computed: {
    dependencies() {
      const dependencies = [];
      const keys = Object.keys(this.packageJson.dependencies);

      for (let i = 0; i < keys.length; i += 3) {
        const chunk = keys.slice(i, i + 3).map((key) => ({
          prop: key,
          value: this.packageJson.dependencies[key]
        }));
        dependencies.push(chunk);
      }

      return dependencies;
      // for (let prop in this.packageJson.dependencies) {
      //     index++;
      //     tempArr.push({
      //         prop,
      //         value: this.packageJson.dependencies[prop],
      //     })
      //     if (index === 3) {
      //         dependencies.push(tempArr);
      //         index = 0;
      //     }
      // }
      // return dependencies
    },
    devDependencies() {
      const dependencies = [];
      const keys = Object.keys(this.packageJson.devDependencies);

      for (let i = 0; i < keys.length; i += 3) {
        const chunk = keys.slice(i, i + 3).map((key) => ({
          prop: key,
          value: this.packageJson.devDependencies[key]
        }));
        dependencies.push(chunk);
      }

      return dependencies;
    }
  }
};
</script>

<style lang="less" scoped>
.about-container {
  margin-top: 20px;
  overflow: auto;
}

.about-header,
.about-content {
  line-height: 28px;
  font-size: 16px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;

  .about-title {
    padding: 0 10px;
    display: block;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
}

.about-info {
  margin-bottom: 10px;
}

.about-info-table-con {
  padding: 10px;
}

.about-label {
  background: #f5f7fa;
  font-weight: bold;
}

.about-info-table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  td {
    border: 1px solid #ccc;
    padding: 5px 10px;
  }
}
</style>
