<template>
  <div class="head">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="(item, key) in router" :key="key" :index="item.title">{{ item.title }}</el-menu-item>
    </el-menu>
    <el-dropdown>
      <span class="el-dropdown-link">
        <i class="el-icon-user-solid"></i>{{ username }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <div @click="resetPwd">修改密码</div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div @click="quit">退出登录</div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Head",
  data() {
    return {
      activeIndex: "日志查看",
    };
  },
  computed: {
    ...mapState(["username", "router"]),
  },
  mounted() {
    this.router.forEach(i => {
      if (this.$route.path.indexOf(i.path) > -1) {
        this.activeIndex = i.title;
      }
    })
  },
  methods: {
    handleSelect(e) {
      this.router.forEach((item) => {
        if (item.title === e) {
          this.activeIndex = e
          this.$router.push(item.path);
        }
      });
    },
    resetPwd() {
      this.$router.push("/index/changePassword");
    },
    async quit() {
      await this.$store.dispatch("quit");
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .el-dropdown-link {
    cursor: pointer;
    border-bottom: solid 1px #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-icon-user-solid {
      width: 30px;
      font-size: 28px;
      color: #303133;
    }
  }
}
</style>