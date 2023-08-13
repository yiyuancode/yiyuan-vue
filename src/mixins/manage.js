import eventBus from "@/eventBus";
/**
 * 
 * @param {*} opts 
 * @returns 
 */
export default function (opts = {}) {
    // 默认的一个配置
    const defaultOpts = {
        submitData: null, //提交表单的数据
        moduleName: '', //模块名称，主要用于提示
        pagination: {  //默认分页
            current: 1,
            pageSize: 10,
            total: 0,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
                return `共${total}条`;
            }
        },

        data: [], //数据
        renderObj: { //渲染对象
            isLoading: false
        },
        submitLoading: false, //提交的loading
        objColumnsArr: [],
    }

    defaultOpts.searchObj = {
        pageSize: defaultOpts.pagination.pageSize,
        pageNum: defaultOpts.pagination.current,
    }

    const defaultSearchObj = {
        ...defaultOpts.searchObj
    }

    const newOpts = {
        ...defaultOpts,
        ...opts
    }

    return {
        data() {
            return newOpts
        },
        // 组件生命周期
        async created() {
            this.getData();
            // 获取columns中属性valueType === object的
            eventBus.$on('getObjColumn', objColumnsArr => {
                this.objColumnsArr = objColumnsArr;
            })

        },
        methods: {
            // 提交的回调
            async submitHandle(opts = {}) {
                const {
                    opType,
                    id,
                    model,
                    done
                } = opts;

                // 如果处理数据方法存在
                if (this.handleSubmitData) {
                    this.submitData = this.handleSubmitData(model);
                } else {
                    this.submitData = model;
                }

                if (opType === "add" || opType === "edit") {
                    if (opType === "add") {
                        // 进行添加租户
                        await this.module[this.moduleAdd](this.submitData);
                    } else {
                        // 进行编辑租户
                        await this.module[this.moduleEdit](this.submitData, id);
                    }
                    // 重新获取数据
                    await this.getData();

                    if (opType === "add") {
                        this.$message.success(`添加${this.moduleName}成功!!`);
                    } else {
                        this.$message.success(`修改${this.moduleName}成功!!`);
                    }
                }

                done();
            },
            // 删除的回调
            async deleteHandle(opType, id) {
                // 执行删除租户
                await this.module[this.moduleDelete](id);
                // 重新获取数据
                await this.getData();
                this.$message.success(`${opType === "batchDelete" ? '批量' : ''}删除${this.moduleName}信息成功!!`);
            },
            async getData() {
                this.renderObj.isLoading = true;
                try {
                    const dataResult = await this.module[this.moduleGetList](this.searchObj);
                    if (dataResult) {
                        const { total, records } = dataResult;

                        // 处理返回的一个记录数据
                        if (this.objColumnsArr.length || this.handleRecord) {
                            for (let i = 0; i < records.length; i++) {
                                for (let j = 0; j < this.objColumnsArr.length; j++) {
                                    const key = this.objColumnsArr[j];
                                    records[i][key] = records[i][key].desc;
                                }

                                this.handleRecord && this.handleRecord(records[i]);
                            }
                        }
                        this.pagination.total = total;
                        this.data = records;
                    }
                } catch (e) {
                    Promise.reject(e);
                }

                this.renderObj.isLoading = false;
            },
            // 点击添加和编辑
            async saveHandle(opts = {}) {
                const {
                    id,
                    done
                } = opts;

                if (id) {
                    const detailInfo = await this.getDetail(id);

                    const newModel = { ...detailInfo };
                    for (let prop in detailInfo) {
                        if (this.objColumnsArr.includes(prop)) {
                            newModel[prop] = newModel[prop].value;
                        }
                    }
                    this.handleDetailModel && this.handleDetailModel(newModel);
                    done(newModel);
                }
            },
            // 获取数据详情
            getDetail(id) {
                const detailInfo = this.module[this.moduleGetDetail](id);
                return detailInfo;
            },
            // 查询的回调
            searchHandle(searchFormInfoObj) {
                this.searchObj = {
                    ...defaultSearchObj,
                    ...searchFormInfoObj
                }

                this.getData();
            },
            // 重置的回调
            resetHandle() {
                this.searchObj = {
                    ...defaultSearchObj,
                }

                this.getData();
            }
        }
    }
}