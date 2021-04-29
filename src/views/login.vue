<template>
  <div class="login">
    <div class="container">
      <img class="avatar" src="@/assets/login2.gif" alt="" />
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            placeholder="请输入11位手机号码"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-key"
            v-model="loginForm.password"
            placeholder="请输入3~16位密码"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-button @click="login" class="login-btn" type="primary"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/user";
export default {
  data() {
    return {
      loginForm: {
        username: "15918983683",
        password: "15918983683",
      },
      // 表单验证规则
      rules: {
        // 用户名
        username: [
          // required 表示必填项，message：表示不符合规则时的提示信息  trigger：表示出发时机
          { required: true, message: "请输入11位手机号码", trigger: "blur" },
          {
            pattern: /^1[35789]\d{9}$/,
            message: "手机号是11位数字，且第一位是1",
            trigger: "blur",
          },
        ],
        // 密码
        password: [
          // required 表示必填项，message：表示不符合规则时的提示信息  trigger：表示出发时机
          { required: true, message: "请输入3~16位密码", trigger: "blur" },
          {
            pattern: /^.{3,16}$/,
            message: "请输入3~16位密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          let res = await userLogin(this.loginForm);
          // console.log(res);
          if (res.data.message == "登录成功") {
            this.$message.success("登录成功");
            // console.log(res.data.data.token);
            localStorage.setItem("heimaback_token", res.data.data.token);
            this.$router.push({ path: "/index" });
          } else {
            this.$message.error("用户名或密码输入错误");
          }
        } else {
          this.$message.error("用户输入数据不合法");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>