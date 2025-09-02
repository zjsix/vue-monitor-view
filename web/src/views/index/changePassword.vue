<template>
  <div class="pwd">
    <el-form label-position="left" ref="form" :rules="rule" :model="form" label-width="120px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          type="password"
          v-model="form.oldPassword"
          style="width: 100%"
          placeholder="请输入原密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="form.newPassword"
          style="width: 100%"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword1">
        <el-input
          type="password"
          v-model="form.newPassword1"
          style="width: 100%"
          placeholder="请再输入一次新密码"
        />
      </el-form-item>
    </el-form>
    <el-button type="primary" style="width:100%" @click="submit">确认</el-button>
  </div>
</template>

<script>
import { changePassword } from "@/api/api";
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        newPassword1: "",
      },
      rule: {
        oldPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        newPassword1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await changePassword({
              oldPassword: this.form.oldPassword,
              newPassword: this.form.newPassword,
            });
            this.$message.success("修改密码成功")
            localStorage.setItem('token','')
            this.$router.replace('/')
          } catch (e) {
            console.log(e);
          }
        }
      });
    },
  },
};
</script>


<style lang="scss" scoped>
.pwd {
  width: 420px;
  margin: 100px auto;
}
</style>