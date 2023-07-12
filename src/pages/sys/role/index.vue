<template>
    <ManagePage :theadDataArr="columns" :data="data" :total="total" :pageSize="pageSize" :pageNum="pageNum"
        :renderObj="renderObj">

    </ManagePage>
</template>

<script>
import ManagePage from "@/components/manage/ManagePage.vue";
const columns = [
    {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '角色代码',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: '创建时间',
        key: 'createdTime',
        dataIndex: 'createdTime',
    },
    {
        title: '更新时间',
        key: 'updatedTime',
        dataIndex: 'updatedTime',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

import { getRolePageList } from "@/api/auth/role";
export default {
    components: {
        ManagePage
    },
    data() {
        return {
            data: [],
            columns,
            pageSize: 10,
            pageNum: 1,
            total: 0,
            renderObj: {
                isLoading: false
            }
        };
    },
    // 组件生命周期
    async created() {
        this.renderObj.isLoading = true;
        const rolePageResult = await getRolePageList(this.pageSize, this.pageNum);
        if (rolePageResult) {
            const { total, records } = rolePageResult;
            this.total = total;
            this.data = records;
            this.renderObj.isLoading = false;
        }
    },
}
</script>

<style lang="less" scoped>
.search-container,
.content-container {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
}

.list-container {
    margin-top: 10px
}

.page-container {
    display: flex;
    justify-content: flex-end;
}

// 操作按钮容器
.operate-btn-container {
    .ant-btn {
        margin-right: 10px;
    }
}
</style>