<template>
  <div
    class="Login"
    :style="{ backgroundImage: 'url(https://api.dujin.org/bing/1366.php)', backgroundSize: 'cover' }"
  >
    <el-form
      ref="form"
      class="login-container"
      label-position="left"
      label-width="0px"
      :rules="rules"
      :model="loginForm"
    >
      <h3 class="login_title">登录</h3>
      <el-form-item prop="username" ref="username">
        <el-input
          type="text"
          @change="valid"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password" ref="password">
        <el-input
          show-password
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
          @keyup.13.native="getLogin"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="space-between">
          <el-checkbox v-model="checked">记住密码</el-checkbox>
          <div>
            <el-link
              type="warning"
              class="ml10"
              @click="$message.warning('请联系开发人员重置密码！')"
              >忘记密码</el-link
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          type="primary"
          style="width: 100%; background: #505458; border: none"
          @click="getLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/api";
export default {
  name: "Login",
  data() {
    return {
      checked: false,
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push("/index");
    } else if (
      localStorage.getItem("username") &&
      localStorage.getItem("password")
    ) {
      this.loginForm.username = localStorage.getItem("username");
      this.loginForm.password = localStorage.getItem("password");
      this.checked = true;
    }
  },

  methods: {
    valid() {
      this.loginForm.username = this.loginForm.username.replace(/[\W]/g, "");
    },
    async getLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const res = await login(this.loginForm);
            if (this.checked) {
              localStorage.setItem("username", this.loginForm.username);
              localStorage.setItem("password", this.loginForm.password);
            }else{
              localStorage.removeItem("username");
              localStorage.removeItem("password");
            }
            localStorage.setItem("token", res.data.token);
            await this.$store.dispatch("getInfo");
            this.$router.push("/index");
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
.Login {
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>