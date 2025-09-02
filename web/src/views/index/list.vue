<template>
  <div>
    <!-- 搜索 -->
    <div class="head">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" @submit.native.prevent>
        <el-form-item>
          <el-input clearable v-model="searchForm.keywords" style="width: 250px" placeholder="请输入应用名搜索..."
            @keyup.enter.native="getList" @clear="getList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <div class="content">
      <el-table border :data="tableData" style="width: 100%; margin-top: 20px">
        <el-table-column fixed type="index" label="序号" width="60" />
        <el-table-column label="应用名称" prop="projectName" show-overflow-tooltip width="150" />
        <el-table-column label="版本号" prop="projectVersion" show-overflow-tooltip width="120" />
        <el-table-column label="IP" prop="ip" show-overflow-tooltip width="150" />

        <!-- 错误简略信息 -->
        <el-table-column label="错误详细信息" show-overflow-tooltip>
          <template #default="{ row }">
            <div v-if="row.error.message">{{ row.error.message | truncate(50) }}</div>
            <div v-if="row.error.info">{{ row.error.info | truncate(50) }}</div>
            <el-button type="text" @click="showErrorDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>

        <!-- 用户操作日志简略 -->
        <el-table-column label="用户操作日志" show-overflow-tooltip>
          <template #default="{ row }">
            <div v-for="(item, index) in row.breadcrumbs.slice(0, 3)" :key="index" style="margin-bottom: 4px;">
              {{ index + 1 }}: {{ item.type }} -- {{ item.target }} -- {{ item.value }}
            </div>
            <div v-if="row.breadcrumbs.length > 3">... 共 {{ row.breadcrumbs.length }} 条操作</div>
            <el-button type="text" @click="showBreadcrumbDetail(row)">查看详情</el-button>
          </template>
        </el-table-column>

        <el-table-column label="时间" prop="createdAt" :formatter="formatTime" width="200" show-overflow-tooltip />

        <!-- 操作列 -->
        <el-table-column label="操作" fixed="right" width="150">
          <template #default="{ row }">
            <el-button type="text" @click="copy(row)">复制日志</el-button>
            <el-button type="text" style="margin-left: 18px; color: #f56c6c" @click="handleDel(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" background
        layout="total, prev, pager, next, sizes" @pagination="getList" />
    </div>

    <!-- 错误详情弹窗 -->
    <el-dialog title="错误详情" :visible.sync="errorDialogVisible" width="800px">
      <pre class="break-json">{{ selectedError | prettyJson }}</pre>
    </el-dialog>

    <!-- 用户操作日志弹窗 -->
    <el-dialog title="用户操作日志" :visible.sync="breadcrumbsDialogVisible" width="800px">
      <div v-for="(item, index) in selectedBreadcrumbs" :key="index" style="margin-bottom: 8px;">
        {{ index + 1 }}. {{ item.type }} -- {{ item.target }} -- {{ item.value }}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import listMixin from "@/mixins/list";
import { list, del } from "@/api/list";

export default {
  name: "list",
  mixins: [listMixin],
  data() {
    const that = this;
    return {
      searchForm: {
        keywords: "",
      },
      listProps: {
        listApi: list,
        delApi: del,
        handleListForm() {
          return { ...that.searchForm };
        },
      },
      errorDialogVisible: false,
      breadcrumbsDialogVisible: false,
      selectedError: {},
      selectedBreadcrumbs: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    copy(row) {
      const text = JSON.stringify(row.error, null, 2);
      navigator.clipboard.writeText(text);
      this.$message.success("复制成功");
    },
    showErrorDetail(row) {
      this.selectedError = row.error || {};
      this.errorDialogVisible = true;
    },
    showBreadcrumbDetail(row) {
      this.selectedBreadcrumbs = row.breadcrumbs || [];
      this.breadcrumbsDialogVisible = true;
    },
    formatTime(row, column, cellValue) {
      if (!cellValue) return "";
      const date = new Date(cellValue);
      return date.toLocaleString();
    }
  },
  filters: {
    truncate(value, length = 30) {
      if (!value) return "";
      return value.length > length ? value.slice(0, length) + "..." : value;
    },
    prettyJson(value) {
      return JSON.stringify(value, null, 2);
    },
  },
};
</script>

<style scoped>
.head {
  margin-bottom: 16px;
}

.content {
  background: #fff;
}

.break-json {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
