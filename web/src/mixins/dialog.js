

/**
 * ████████████████████████████████████████████████
 * ██████                                    ██████
 * ██████              此文件代码勿动          ██████
 * ██████                                    ██████
 * ████████████████████████████████████████████████
 */
import { deepClone } from '@/utils'
export default {
    data() {
        return {
            // 弹窗显示隐藏
            dialogVisible: false,
            // 弹窗标题
            dialogTitle: '详情',
            // 弹窗类型 1新增2编辑
            dilogType: 1,
            // 弹窗form
            dialogForm: {},
            // 默认值 防止报错
            dialogProps: {
                mainKey: 'id',
                addSuccessMessage: '新增成功',
                editSuccessMessage: '编辑成功',
            }
        }
    },
    methods: {
        // 弹窗关闭事件
        handleCloseDialog() {
            this.dialogVisible = false
        },
        // 点击编辑事件
        async handleEditDialog(row, callback) {
            this.dialogVisible = true
            this.dilogType = 2
            this.dialogTitle = this.dialogProps.editTitle
            //判断callback是不是promise
            if (callback) {
                if (callback instanceof Promise) {
                    await callback
                } else {
                    return console.error('callback必须是promise')
                }
            }
            //如果需要获取详情 就获取 不需要则直接取列表数据
            if (this.dialogProps.editInfoApi) {
                const res = await this.dialogProps.editInfoApi(row[this.dialogProps.mainKey])
                this.$nextTick(() => {
                    //如果接口返回的格式 不能直接赋值给form 则需要handleApiDataToForm处理
                    if (this.dialogProps.handleApiDataToForm) {
                        this.dialogForm = this.dialogProps.handleApiDataToForm(res.data)
                    } else {
                        this.dialogForm = res.data
                    }
                })
            } else {
                this.$nextTick(() => {
                    //如果列表数据的格式 不能直接赋值给form 则需要handleRowDataToForm处理
                    if (this.dialogProps.handleRowDataToForm) {
                        this.dialogForm = this.dialogProps.handleRowDataToForm(row)
                    } else {
                        this.dialogForm = deepClone(row)
                    }
                })
            }
        },
        // 点击新增
        async handleAddDialog(callback) {
            //判断callback是不是promise
            if (callback && callback instanceof Promise) {
                await callback
            }
            this.dialogVisible = true
            this.dialogTitle = this.dialogProps.addTitle || '新增'
            this.dilogType = 1
        },
        // 弹窗提交事件
        handleSubmitDialog() {
            this.dialogSubmitLoading = true
            this.$refs.dialogForm.validate(async valid => {
                if (valid) {
                    try {
                        let form = deepClone(this.dialogForm)
                        let api = null
                        if (this.dilogType === 1) {
                            api = this.dialogProps.addApi
                            this.dialogProps.handleAddForm ? form = this.dialogProps.handleAddForm() : null
                        } else {
                            api = this.dialogProps.editApi
                            this.dialogProps.handleEditForm ? form = this.dialogProps.handleEditForm() : null
                        }
                        if (!api) {
                            return console.error('请配置dialogProps表单提交接口')
                        }
                        await api(form)
                        this.dialogSubmitLoading = false
                        this.dilogType === 1 ? this.$message.success(this.dialogProps.addSuccessMessage) : this.$message.success(this.dialogProps.editSuccessMessage)
                        this.handleCloseDialog()
                        this.getList()
                    } catch (e) {
                        this.dialogSubmitLoading = false
                    }
                }
            })

        }
    },
    watch: {
        dialogVisible(val) {
            if (!val) {
                this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
            }
        }
    }
}