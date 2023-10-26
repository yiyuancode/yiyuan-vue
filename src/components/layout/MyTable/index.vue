<template>
  <div class="RoleMan-yz-table">
    <!-- <div @click="$emit('MyTableChange',1)">dededede</div> -->
    <!-- 默认插槽，不需要定义name -->
    <slot> </slot>

    <!-- 动态插槽，需要定义name，且name不需要唯一，只要外面插进来一个和很多name匹配上了，就会自动把外面的插槽内容复制到插槽中间，最终通过v-bind传的值来动态取值显示 -->
    <!-- <div v-for="(row,rowIndex) in tableData" :key="row.id">
			<span v-if="rowIndex==0">
			
				<div style="display: flex;width: 100%;">
		
					<template v-for="(column,columnIndex) in columns">
						<div style="width: 300px;">{{column.title}}</div>|
					</template>

				</div>

				<div style="display: flex;width: 100%;">
					<template v-for="(column,columnIndex) in columns">
						<div style="width: 300px;" v-if="!column.scope">{{row[column.dataIndex] }}</div>

						<slot style="width: 300px;" v-if="column.scope" :name="column.dataIndex" v-bind="row">
							<div slot="name" slot-scope="scope" style="width: 300px;">{{scope.name}}</div>
						</slot>
						|
					</template>

				</div>
			</span>
			<span v-if="index!=0">
				
				<div style="display: flex;width: 100%;">
					<template v-for="(column,columnIndex) in columns">
						<div style="width: 300px;" v-if="!column.scope">{{row[column.dataIndex] }}</div>

						<slot style="width: 300px;" v-if="column.scope" :name="column.dataIndex" v-bind="row">
							
						</slot>
						|


					</template>

				</div>
			</span>

		</div> -->

    <el-table :data="tableData" class="RoleMan-yz-table-el-table">
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="!item.scope"
          :width="item.width ? item.width : ''"
          :prop="item.dataIndex"
          :label="item.title"
        >
        </el-table-column>
        <el-table-column
          v-if="item.scope"
          :width="item.width ? item.width : ''"
          :label="item.title"
        >
          <template slot-scope="scope">
            <slot :name="item.dataIndex" v-bind="scope.row"> </slot>
          </template>
        </el-table-column>
      </template>
      <template slot="empty">
        <img
          src="@/assets/img/noData.png"
          style="
            width: 380px;
            height: 380px;
            object-fit: cover;
            margin-top: 15px;
          "
        />
        <div
          style="
            margin-top: -50px;
            margin-left: 20px;
            display: flex;
            justify-content: center;
          "
        >
          不好意思,您的数据走丢啦!
        </div>
      </template>
    </el-table>
    <div class="RoleMan-yz-table-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="
          (size) => {
            $emit(`pageChange`, { page: currentPage, size: size });
          }
        "
        @current-change="
          (page) => {
            $emit(`pageChange`, { page: page, size: pageSize });
          }
        "
      >
      </el-pagination>
    </div>

    <!-- v-bind="props.data" -->
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    // tableData: [],
    tableData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    // columns: [],
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
    total: 0,
    currentPage: 0,
    pageSize: 0,
    // pageSizes: []
    pageSizes: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  data() {
    return {
      test: [
        {
          name: 123
        },
        {
          name: 123
        }
      ]
    };
  },
  methods: {
    btnClick() {
      this.$emit('MyTableChange');
    }
  }
};
</script>

<style lang="less" scoped>
.RoleMan-yz-add {
  display: flex;
  justify-content: flex-end;
}

.RoleMan-yz-table {
  margin-top: 15px;
  border-radius: 12px;
  // box-shadow: 0px -10px 0px 0px #EBECED,
  // 	/*上边阴影  红色*/

  // 	-10px 0px 0px 0px #EBECED,
  // 	/*左边阴影  绿色*/

  // 	10px 0px 0px 0px #EBECED,
  // 	/*右边阴影  蓝色*/

  // 	0px 10px 0px 0px #EBECED;
  box-shadow: rgb(0 21 41 / 8%) 0px 0px 10px;
  padding-bottom: 30px;
  // min-height: 400px;

  // background-color: red;
  .RoleMan-yz-table-el-table {
    border-radius: 12px;
    min-height: 500px;
    // width: 50%;

    /*下边阴影  粉色*/

    // background-color: rebeccapurple !important;

    //  .el-table__header{
    // 	 .el-table__header-wrapper{
    // 		 background-color: rebeccapurple !important;
    // 	 }
    // 	.el-table__cell{
    // 		.cell{
    // 			background-color: rebeccapurple !important;
    // 		}

    // 	}

    // }
  }

  .RoleMan-yz-table-pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    margin-right: 20px;
  }
}
</style>
