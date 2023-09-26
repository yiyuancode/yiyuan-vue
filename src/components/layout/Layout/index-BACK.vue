<template>
  <div style="width: 100%;height: 100%;">
    <div style="width: 100%;height: 100%;">
      <el-container style="width: 100%;height: 100%;">
        <el-header style="padding: 0;">
          <!-- <el-menu mode="horizontal" text-color="#fff" active-text-color="#ffd04b"
            style="width: 100%;height: 100%;">
            <el-menu-item>首页</el-menu-item>
            <el-menu-item>工作台</el-menu-item>
          </el-menu> -->
          <div style="height: 25px;width: 100%;">
            <MyTags></MyTags>
          </div>
        </el-header>
        <el-container>
          <el-aside width="230px" style="background-color: #FFFFFF;" class="noScrollbar">
            <el-row class="tac">
              <el-col>
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64"
                         text-color="#fff" active-text-color="#ffd04b">


                  <MyMenu v-for="(item) in dynamicRoutes" :item="item"  :key="item.name">
                  </MyMenu>

                </el-menu>


              </el-col>
              <el-col :span="12"></el-col>
            </el-row>

          </el-aside>
          <!-- 	{{
            $store.getters.myTagsArray.join(`,`)
          }} -->

          <el-main style="height: 100%;width: 100%; padding: 0;line-height: normal;">
            <!-- keep-alive必须和单个的router-view配合使用v-if -->
            <!--  v-if="$store.getters.myTagsArray.join(`,`).indexOf($route.name)!=-1" -->
            <!-- 	{{$store.getters.myTagsArray.join(`,`).indexOf($route.name)!=-1}}
            {{$route.fullPath}} -->
            <keep-alive :include="$store.getters.myTagsArray">
              <router-view v-if="$store.getters.myTagsArray.join(`,`).indexOf($route.name)!=-1"/>
            </keep-alive>


            <!-- <router-view   v-if="$store.getters.myTagsArray.join(`,`).indexOf($route.name)!=-1"/>
 -->
            <!-- 						<router-view  v-if="$store.getters.myTagsArray.join(`,`).indexOf($route.name)==-1"/>
 -->
            <!-- <router-view  v-if="$store.getters.myTagsArray.join(`,`).indexOf($route.name)==-1" /> -->

          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  import MyTags from "@/components/layout/MyTags"
  import MyMenu from "@/components/layout/MyMenu"
  import {dynamicRoutes} from '@/router'
  // import store from '@/store'
  export default {
    components: {
      MyMenu,
      MyTags
    },
    data() {
      return {
        dynamicRoutes,
        menuArray: [],
        value1: '',
        value2: '',
        defaultOpeneds: [],
        defaultActive: "",
        show: false
      };
    },
    created() {
      let $this = this

      console.log("$this.$route", $this.$route)
      let routePathArray = $this.$route.path.split("/");
      // $this.defaultOpeneds.push($this.$route.path.split("/")[1])
      // $this.defaultActive=$this.$route.path.split("/")[2]
      $this.defaultOpeneds.push(routePathArray[1])
      $this.defaultActive = routePathArray[2]
      // $this.defaultOpeneds.push()

      // $this.getData()


    },
    methods: {
      // getData() {
      // 	let $this = this
      // 	// axios.get("http://106.54.87.159:50015/school-api/SysUser/getPermissionList", {
      // 	// }).then((res) => {
      // 	// 	$this.menuArray = res.data.data
      // 	// })
      // 	$this.menuArray = JSON.parse(localStorage.getItem("menuData"))
      // },


      itemClick(item, item1) {
        let $this = this
        // console.log('item', item)
        $this.$router.push({
          path: item.path + '/' + item1.path
        })
      },
      rightClck() {
        this.show = !this.show
      }
    }
  }
</script>

<style lang="less" scoped>
  ::-webkit-scrollbar {
    display: none;
  }
</style>
