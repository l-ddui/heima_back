<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div @click="$router.push({ name: 'index' })" class="logo"></div>
        <el-menu
          :unique-opened="true"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1"
              ><i class="el-icon-s-check"></i>
              <span>用户列表</span></el-menu-item
            >
            <el-menu-item index="1-2">
              <i class="el-icon-circle-plus"></i>
              <span>用户添加</span></el-menu-item
            >
          </el-submenu>
          <!-- 文章列表 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item index="postList"
              ><i class="el-icon-s-check"></i>
              <span>文章列表</span></el-menu-item
            >
            <el-menu-item index="postPublish">
              <i class="el-icon-circle-plus"></i>
              <span>文章添加</span></el-menu-item
            >
          </el-submenu>
          <!-- 栏目管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item index="3-1"
              ><i class="el-icon-s-check"></i>
              <span>栏目列表</span></el-menu-item
            >
            <el-menu-item index="3-2">
              <i class="el-icon-circle-plus"></i>
              <span>栏目添加</span></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="el-icon-s-fold toggle-btn"></span>
          <span class="system-title">黑马头条后台管理系统</span>
          <div class="welcome">
            <span>欢迎你</span> &nbsp;&nbsp;
            <el-button
              style="font-size: 16px; color: #fff"
              type="text"
              @click="logout"
              >退出</el-button
            >
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("heimaback_token");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>