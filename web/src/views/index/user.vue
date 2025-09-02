
<template>
  <div>
    <div class="head">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" @submit.native.prevent>
        <el-form-item allow>
          <el-input clearable @clear="getList" v-model="searchForm.keywords" style="width: 250px"
            placeholder="请输入用户名搜索..." @keyup.enter.native="getList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getList">搜 索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="content">
      <el-button type="primary" icon="el-icon-plus" @click="handleAddDialog(initAddForm)">添 加</el-button>

      <el-table border :data="tableData" style="width: 100%; margin-top: 20px">
        <el-table-column fixed type="index" label="序号" width="60" />
        <el-table-column label="用户名称" prop="username" show-overflow-tooltip />
        <el-table-column label="邮箱" prop="email" show-overflow-tooltip />
        <el-table-column label="是否管理员" prop="isAdmin" show-overflow-tooltip>
          <template slot-scope="scope">
            <span> {{ scope.row.isAdmin ? "是" : "否" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button slot="reference" type="text" @click="handleEditDialog(scope.row)"
              v-if="scope.row.id != 1">编辑</el-button>
            <el-button slot="reference" type="text" @click="handleReset(scope.row.id)"
              v-if="scope.row.id != 1">重设密码</el-button>
            <el-button slot="reference" type="text" style="margin-left: 18px; color: #f56c6c"
              @click="handleDel(scope.row.id)" v-if="scope.row.id != 1">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="pageNum" :limit.sync="pageSize" background
        layout="total, prev, pager, next, sizes" @pagination="getList" />
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" :destroy-on-close="false">
      <el-form ref="dialogForm" :model="dialogForm" label-width="100px">
        <el-form-item ref="username" label="用户名称" prop="username" :rules="[
          { required: true, message: '请输入用户名称' },
          { min: 3, max: 20, message: '用户名称长度在3到20个字符' },
          {
            pattern: /^[_a-zA-Z0-9]+$/,
            message: '用户名称只能包含英文、数字和下划线',
          },
        ]">
          <el-input :disabled="dilogType == 2" v-model="dialogForm.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item v-if="dilogType == 1" ref="password" label="密码" prop="password" :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, max: 20, message: '密码长度在8到20个字符' },
        ]">
          <el-input type="password" show-password v-model="dialogForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item ref="email" label="邮箱" prop="email" :rules="[
          { max: 30, message: '密码长度在30个字符内' },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: '请输入正确的邮箱',
          },
        ]">
          <el-input type="email" v-model="dialogForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item ref="isAdmin" label="是否管理员" prop="isAdmin" :rules="[{ required: true }]">
          <el-radio-group v-model="dialogForm.isAdmin">
            <el-radio :label="false">否</el-radio>
            <el-radio :label="true">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="重设密码" :visible.sync="resetVisible" width="500px" :destroy-on-close="false">
      <el-form ref="resetForm" :model="resetForm" label-width="100px">
        <el-form-item ref="password" label="新密码" prop="password" :rules="[
          { required: true, message: '请输入新密码' },
          { min: 8, max: 20, message: '密码长度在8到20个字符' },
        ]">
          <el-input type="password" show-password v-model="resetForm.password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="
          $refs.resetForm.resetFields();
        resetVisible = false;
        ">取 消</el-button>
        <el-button type="primary" @click="handleResetSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dialogMixin from "@/mixins/dialog";
import listMixin from "@/mixins/list";
import { list, add, edit, del, resetPassword } from "@/api/user";
export default {
  name: "list",
  mixins: [listMixin, dialogMixin],
  data() {
    const that = this;
    return {
      value: false,
      searchForm: {
        keywords: "",
      },
      resetForm: {
        id: null,
        password: "",
      },
      resetVisible: false,
      listProps: {
        listApi: list,
        delApi: del,
        handleListForm() {
          return { ...that.searchForm };
        },
      },
      dialogProps: {
        addTitle: "添加",
        editTitle: "编辑",
        addApi: add,
        editApi: edit,
        handleRowDataToForm(data) {
          const { id, username, email, isAdmin } = data;
          return { id, username, email, isAdmin };
        },
        handleAddForm() {
          return { ...that.dialogForm, id: undefined };
        },
        handleEditForm() {
          return { ...that.dialogForm };
        },
      },
      dialogForm: {
        username: "",
        password: "",
        email: "",
        isAdmin: false,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async initAddForm() {
      this.dialogForm = {
        username: "",
        password: "",
        email: "",
        isAdmin: false,
      };
    },
    handleReset(id) {
      this.resetForm.id = id;
      this.resetVisible = true;
    },
    handleResetSubmit() {
      this.$refs.resetForm.validate(async (valid) => {
        if (valid) {
          await resetPassword(this.resetForm);
          this.$message.success("重置成功");
          this.$refs.resetForm.resetFields();
          this.resetVisible = false;
        }
      });
    },
  },
};
</script>