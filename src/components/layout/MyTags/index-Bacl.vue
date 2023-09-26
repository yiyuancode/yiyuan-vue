<template>
  <div class="MyTags">
    <template v-for="(item,index) in $store.getters.myTags">
      <el-popover v-model="item.show" class="my-el-popover" placement="top-start" title=""
                  :width="90"
                  :append-to-body="false" trigger="manual" :key="index">
        <div class="tags-item" @click="refresh(item,index)">刷新</div>
        <div class="tags-item" @click="cloeClick(item,index)">删除</div>
        <div class="tags-item" @click="cloeOtherClick(item,index)">关闭其他</div>
        <div class="tags-item" @click="cloeAllClick(item,index)">关闭所有</div>
        <el-tag slot="reference" key="1" closable effect="plain" :class="{'myTags':item.choose}"
                :color="item.choose?'#42B983':'#FFFFFF'" type="info" @close="cloeClick(item)">

					<span :style="{cursor:'pointer',color:item.choose?'#FFFFFF':'#000000'}"
                @click="changeClik(item)" @contextmenu.prevent="rightClck(item)"
          >{{item.mate.title}}</span>
        </el-tag>
      </el-popover>
    </template>
  </div>
</template>

<script>
  export default {
    name: "MyTags",
    data() {
      return {
        show: false
      }
    },
    created() {
      console.log("MyTags。created执行了")
    },
    methods: {
      rightClck(item) {
        this.$store.commit("rightClick", item)
        // this.$store.getters.myTags.forEach((item2, index2) => {
        // 	if (item.name == item2.name) {
        // 		item2.show = !item2.show
        // 	} else {
        // 		item2.show = false;
        // 	}
        // })

      },
      cloeClick(item) {
        // this.$store.dispatch("deleteMyTags", item)
        this.$store.commit("deleteCurMyTag", item)

      },
      refresh(item) {
        // let $this = this;
        console.log("refresh.item", item)
        // Nprogress.start()
        this.$store.commit("refreshMyTags", item)

      },
      changeClik(item) {
        // let $this = this;
        this.$store.commit("changeMyTags", item)


      },
      cloeOtherClick(item) {
        this.$store.commit("deleteOtherMyTags", item)
      },
      cloeAllClick() {
        this.$store.commit("deleteAllMyTags")
      }

    }
  }
</script>

<style lang="less" scoped>
  .MyTags {
    display: flex;
    // flex-wrap: nowrap;
    overflow-x: scroll !important;
    overflow-y: hidden;
    width: 100%;
    cursor: pointer;

    .my-el-popover {
      margin-right: 8px;

      /deep/ .el-popover {
        min-width: 0px !important;

        .tags-item {
          background-color: #FFFFFF;
          cursor: pointer;
          margin-top: 5px;
        }

        .tags-item:hover {
          background-color: #EEEEEE;
        }


      }

      .myTags {
        /deep/ .el-icon-close {
          color: #FFFFFF;
        }
      }

    }
  }

  .MyTags::-webkit-scrollbar {
    display: block !important;
    // background-color: red;
    width: 20px;
    height: 3px;
    cursor: pointer;
    margin-top: 5px;
  }


  // !*定义滑块 内阴影+圆角*!
  .MyTags::-webkit-scrollbar-thumb {
    // background: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: skyblue;
  }

  // !*定义滚动条轨道 内阴影+圆角*!
  .MyTags::-webkit-scrollbar-track {
    border-radius: 5px;
    background: #eee;
  }
</style>
