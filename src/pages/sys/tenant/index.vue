<template>
  <a-card>
    <SearchForm :props="columns" :key="Math.random()" @onSearch="onSearch"/>
    <AddForm ref="addForm" :key="Math.random()" :props="addFormProps"></AddForm>

    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button>批量操作</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="audit">审批</a-menu-item>
          </a-menu>
          <a-button>
            更多操作
            <a-icon type="down"/>
          </a-button>
        </a-dropdown>
      </a-space>
      <a-table :columns="columns" :dataSource="dataSource" rowKey="id"
               :row-selection="{ selectedRowKeys: selectedRowKeys }"

               :scroll="{ x: 1500, y: 300 }">
        <a slot="action" slot-scope="{record}">
          <a style="margin-right: 8px;">
            <a-icon type="plus"/>
            新增
          </a>
          <a style="margin-right: 8px;">
            <a-icon type="edit"/>
            编辑
          </a>
          <a @click="deleteRecord(record.id)">
            <a-icon type="delete"/>
            删除
          </a>
        </a>
      </a-table>
    </div>
  </a-card>
</template>

<script>
  import {columns} from './pageConfig';
  import {deleteTenant, getTenantPageList} from '@/api/sys/tenant';
  import SearchForm from '@/components/searchForm/index.vue';
  import AddForm from '@/components/addForm/AddForm.vue';
  import axios from 'axios';

  export default {
    components: {
      SearchForm,
      AddForm
    },
    name: 'QueryList',
    data() {
      return {
        columns: columns,
        dataSource: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        selectedRowKeys: [],
        addFormProps: {
          groupSize: 2,
          title: "新增",
          show: false,
          loading: false,
          columns: columns,
          record: {}
        },

      }
    },
    authorize: {
      deleteRecord: 'delete'
    },
    mounted() {
      this.getData()
    },
    methods: {
      onSearch() {
        this.getData()
      },
      onPageChange(page, pageSize) {
        this.pagination.current = page
        this.pagination.pageSize = pageSize
        this.getData()
      },
      async getData() {
        try {
          let resp = await getTenantPageList({
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.current
          })
          this.dataSource = resp.records;
          console.log("resp.records", resp.records)
          this.pagination.current = resp.current;
          this.pagination.pageSize = resp.size;
          this.pagination.total = resp.total;
        } catch (e) {
          console.log("err", e)
        }

      },
      async deleteRecord(id) {
        try {
          let resp = await deleteTenant(id)
          console.log("resp.records", resp)
          this.getData();
        } catch (e) {
          console.log("err", e)
        }
      },

      async remove() {
        try {
          let resp = await deleteTenant(this.selectedRows.join(","))
          console.log("resp.records", resp)
          this.getData();
        } catch (e) {
          console.log("err", e)
        }

      },
      onChange() {
        this.$message.info('表格状态改变了')
      },
      async addNew() {
        let req = axios.create();
        const operator = '帅龍之龍' // 操作人员
        req.get(
          `/api/exportFile`,
          {
            params: {
              'operator': operator
            },
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Auth-Token': '5201314'
            },
            responseType: 'blob'
          }
        )
          .then((res) => {
            try {
              console.log('响应信息 =>', res)

              if (res.data.size > 0) {
                // 响应头信息
                const headers = res.headers

                // attachment;filename=%E5%B8%85%E9%BE%8D%E4%B9%8B%E9%BE%8D-%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E6%88%98%E7%BB%A9.xlsx
                const contentDisposition = headers['content-disposition']
                console.log('contentDisposition =>', contentDisposition)

                // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8
                const contentType = headers['content-type']
                console.log('contentType =>', contentType)

                let fileName = contentDisposition.split(`=`)[1]
                console.log('解析前文件名 =>', fileName) // 解析前文件名：%E5%B8%85%E9%BE%8D%E4%B9%8B%E9%BE%8D-%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80%E6%88%98%E7%BB%A9.xlsx

                fileName = decodeURIComponent(fileName)
                console.log('解析后文件名 =>', fileName) // 解析后文件名：帅龍之龍-王者荣耀战绩.xlsx

                // this.exportFileToExcel(contentType, res.data, fileName)

                const url = window.URL.createObjectURL(
                  new Blob(
                    [res.data],
                    {
                      type: contentType
                    }
                  )
                )
                const link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                link.setAttribute('download', `${fileName}` || 'template.xlsx')
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)


              } else {
                this.$message({message: '文件数据为空', type: 'error', duration: 1000})
              }
            } catch (e) {
              console.error(e)
              this.$message({message: e, type: 'error', duration: 1000})
            }
          })
          .catch((e) => {
            console.error(e)
            this.$message({message: e, type: 'error', duration: 1000})
          })


      },

    }
  }
</script>


