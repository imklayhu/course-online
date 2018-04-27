<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-content">
        <h1>用户登录</h1>
        <el-input v-model="userData.id"  type="text" placeholder="学号/教师工号"></el-input>
        <el-input v-model="userData.password" type="password" placeholder="账户密码" clearable></el-input>
        <button class="log-submit" @click="submit">登录</button>
        <el-button size="mini" type="text" @click="toSignIn">
          没有账号？注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import { signUp } from "../pages/index/api/sign/index";
import { mapState } from "vuex";

export default {
  name: "login",
  components: {},
  data() {
    return {
      isLogin: true,
      isLogined: false,
      userData: {
        id: '',
        password: ''
      }
    };
  },
  methods: {
    toSignIn() {
      this.isLogin = false;
      this.$router.push({
        path: "/signin"
      });
    },
    setIsLogined() {
      let currentUserInfo = {
        username: window.localStorage.getItem("username") || "",
        id: window.localStorage.getItem("id") || ""
      };
      if (currentUserInfo.username && currentUserInfo.id) {
        this.isLogined = true;
      }
    },
    submit() {
      var obj = this.userData;
      // console.log("test");
      signUp(obj)
        .then(response => {
          // console.log(response);
          console.log(response)
          if(response.data.success == 1){
            if(response.data.res === -1){
              this.$message.error({
                message: "账号密码有误",
                showClose: true
              })
            }else{
              this.$message({
                type: 'success',
                message: '登录成功',
                showClose: true
              });
              this.$store.dispatch('Login',response.data.res);
              // console.log(this.$store);
              this.$router.push({
                path: '/'
              })
            }
          }else{
            this.$message({
              showClose: true,
              message: '该账号还未注册',
              type: 'warning'
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  min-width: 1000px;
  /* background-color: #ebf5f3; */
}
.login-wrapper {
  position: relative;
  top: 30%;
  left: 32%;
  width: 430px;
  /* margin: 80px auto 0 auto; */
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}
.login-content {
  width: 85%;
  margin: 0 auto;
  text-align: center;
  padding: 5px 15px 15px 15px;
}
.login-content .el-input {
  margin-bottom: 20px;
}
.login-content .log-submit {
  width: 100%;
  /* height:  */
  display: inline-block;
  cursor: pointer;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  line-height: 1;
  text-align: center;
  outline: none;
  white-space: nowrap;
  box-sizing: border-box;
  margin: 0;
  transition: 0.1s;
  font-size: 14px;
  border-radius: 4px;
  padding: 12px 20px;
}
</style>
