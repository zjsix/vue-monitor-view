import dayjs from 'dayjs'
import { formatDate, formatTime } from "@/utils";

export default {
  data() {
    return {
      //时间选择 不能选择今天之后的日期
      searchPickerOptions: {
        disabledDate(current) {
          if (dayjs(current).format("YYYY-MM-DD") == dayjs().format("YYYY-MM-DD")) {
            return false;
          }
          return current && current.getTime() > Date.now();
        },
      },
      // 列表数据
      tableData: [],
      // 选中数组
      ids: [],
      // 分页
      pageNum: 1,
      // 分页大小
      pageSize: 10,
      // 总条数
      total: 0,
      // 搜索条件
      queryForm: {},
      //默认值 防止报错
      listProps: {
        mainKey: 'id',
        // 是否分页
        isPagination: true,
        //数据为空时的提示
        emptyMessage: '请选择要删除的数据!',
        //提示框标题
        delConfirmMessage: '确定删除',
        //提示框内容
        delContentMessage: '确认删除该数据吗？',
        //多选提示框内容
        delMoreContentMessage: '确认删除选中的数据吗？',
        delSuccessMsg: '删除成功',
      },
    }
  },
  methods: {
    formatDate,
    formatTime,
    // 重置查询列表事件
    handleReset() {
      this.$refs.queryForm && this.$refs.queryForm.resetFields()
      this.pageNum = 1
      this.getList()
    },
    // 查询按钮事件 从第一页查
    handleSearch() {
      this.pageNum = 1
      this.getList()
    },
    // 获取列表
    async getList() {
      try {
        let params = this.listProps.handleListForm ? this.listProps.handleListForm() : this.queryForm
        if (!this.listProps.listApi) {
          return console.error('请配置listProps => listApi')
        }
        let page = this.listProps.isPagination ? { page: { pageNum: this.pageNum, pageSize: this.pageSize } } : {}
        const res = await this.listProps.listApi({ ...params, ...page })
        this.total = this.listProps.isPagination ? res.data.count : 0
        this.tableData = this.listProps.isPagination ? res.data.rows || [] : res.data || []
      } catch (e) {
        console.error('mixin => getList出错了', e)
      }
    },
    // 获取列表选中项id 如果列表主键不是id 则手动在页面配置listProps.mainKey
    handleSelectionChange(val) {
      this.ids = val.map(item => item[this.listProps.mainKey]);
    },
    // 单个操作
    handleDel(id) {
      if (!this.listProps.delApi) {
        return console.error('请配置listProps => delApi')
      }
      this.$confirm(this.listProps.delContentMessage, this.listProps.delConfirmMessage, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          await this.listProps.delApi({ id })
          //当当前页面只有一条数据时，删除后需要跳转到第一页
          if (this.tableData.length == 1) {
            this.pageNum = 1
          }
          this.$message({
            type: 'success',
            message: this.listProps.delSuccessMsg
          })
          this.getList()
        } catch (error) {
          console.log(error);
        }
      })
    },
    // 批量操作列表
    handleDels() {
      if (!this.listProps.delApi) {
        return console.error('请配置listProps => delApi')
      }
      //todo 删除的提示语
      if (this.ids.length === 0) {
        return this.$message.warning(this.listProps.emptyMessage)
      }
      this.$modal.confirm(this.listProps.delConfirmMessage, this.listProps.delMoreContentMessage, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          await this.listProps.delApi(this.ids.join(','))
          //当删除的数据长度=页面的数据长度时，删除后需要跳转到第一页
          if (this.ids.length == this.tableData.length) {
            this.pageNum = 1
          }
          this.$message({
            type: 'success',
            message: this.listProps.delSuccessMsg
          })
          this.getList()
        } catch (error) {
          console.log(error);
        }
      })
    }
  }
}
