<template>
  <div style="border: 1px solid #ccc; margin-top: 10px;">
    <!-- 工具栏 -->
    <Toolbar :editor="editor"
             :defaultConfig="toolbarConfig"
             style="border-bottom: 1px solid #ccc"
    />
    <!-- 编辑器 -->
    <Editor v-model="html" :defaultConfig="editorConfig" style="height: 400px; overflow-y: hidden;"
            @onChange="onChange"
            @onCreated="onCreated"/>
  </div>
</template>

<script>
  import {Editor, Toolbar} from '@wangeditor/editor-for-vue';
  import {fileUpload} from "@/api/sys/file.js"
  // import {client,headers} from "@/utils/alioss.js";
  export default {
    name: "index",
    components: {
      Editor,
      Toolbar
    },
    props: {
      text: {
        type: String,
        default: ""
      },
    },
    data() {
      return {
        imgBaseUrl: process.env.VUE_APP_IMG_BASE_URL,
        editor: null,
        html: '',
        toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          // excludeKeys: [ /* 隐藏哪些菜单 */ ],
        },
        editorConfig: {
          MENU_CONF: {
            uploadImage: {
              withCredentials: false,
              // 超时时间，默认为 10 秒
              timeout: 5 * 1000, // 5 秒
              customUpload: this.customUpload,
              customInsert: this.customInsert
            }
          }
        },
      }
    },
    created() {
      let vm = this;
      // vm.html=vm.text
      setTimeout(() => {
        vm.$nextTick(() => {
          console.log(" vm.editor", vm.text)
          //vm.editor.dangerouslyInsertHtml(vm.text)
          vm.editor.setHtml(vm.text)
        })
      }, 1000)

    },
    methods: {
      async customUpload(file, insertFn) { //                    // JS 语法
        let resp = await fileUpload(file)
        console.log("customUpload.resp", resp)
        insertFn(this.imgBaseUrl + resp);
      },
      onCreated(editor) {
        this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
      },
      onChange(editor) {
        console.log('onChange.html -v-mode实时变化', editor.getHtml());
        this.$emit("input", editor.getHtml())
      },
    }
  }
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>

<style scoped>

</style>
