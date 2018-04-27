<template>
  <!-- 注册组件 -->
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-content">
        <h1 style="text-align:center">用户注册</h1>
        <el-input type="text" @focus="stopWarn('name')" :class="[warnStatus.name ? 'warn-input':'']" minlength="2" maxlength="6" v-model="userInfo.name" placeholder="姓名"></el-input>
        <span :class="[warnStatus.name ? 'tips' : '']" v-if="warnStatus.name">{{warnMessage.name}}</span>
        <el-input type="text" :class="[warnStatus.username ? 'warn-input':'']" maxlength="10" @focus="stopWarn('username')" v-model="userInfo.username" placeholder="用户名"></el-input>
        <span :class="[warnStatus.username ? 'tips' : '']" v-if="warnStatus.username">{{warnMessage.username}}</span>
        <el-input type="text" @focus="stopWarn('id')" :class="[warnStatus.id ? 'warn-input':'']" v-model="userInfo.id" placeholder="学生学号/教师工号"></el-input>
        <span :class="[warnStatus.id ? 'tips' : '']" v-if="warnStatus.id">{{warnMessage.id}}</span>
        <el-input type="password" @focus="stopWarn('pwd')" minlength="6" :class="[warnStatus.pwd ? 'warn-input':'']" v-model="userInfo.password" placeholder="账户密码" clearable></el-input>
        <span :class="[warnStatus.pwd ? 'tips' : '']" v-if="warnStatus.pwd">{{warnMessage.pwd}}</span>
        <el-input type="password" @focus="stopWarn('confirmPwd')" minlength="6" :class="[warnStatus.confirmPwd ? 'warn-input':'']" v-model="userInfo.confirmPassword" placeholder="确认密码" clearable></el-input>
        <span :class="[warnStatus.confirmPwd ? 'tips' : '']" v-if="warnStatus.confirmPwd">{{warnMessage.confirmPwd}}</span>
        <br>
        <div>
          <el-radio v-model="userInfo.type" label="1">学生</el-radio>
          <el-radio v-model="userInfo.type" label="2">教师</el-radio>
        </div>
        <button class="log-submit" @click="submit" style="margin-top: 10px;">注册</button>
        <el-button size="mini" type="text" @click="toSignUp">
          已有账号？登录
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { signIn } from "../pages/index/api/sign/index";
export default {
  name: "signIn",
  data() {
    return {
      userInfo: {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        id: "",
        type: "1"
      },
      warnStatus: {
        name: false,
        username: false,
        pwd: false,
        confirmPwd: false,
        id: false
      },
      warnMessage: {
        username: "用户名不能为空",
        name: "真实姓名不能为空",
        pwd: "密码长度不应该小于6",
        confirmPwd: "两次输入的密码不一致",
        id: "学号/教师工号不能为空"
      }
    };
  },
  methods: {
    toSignUp() {
      this.$router.push({
        path: "/login"
      });
    },
    // 正则的方法去掉字符串左右的空格
    trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 判断姓名是否是正确的格式
    verifyName(name) {
      const nameStr = this.trim(name);
      if (nameStr.length) {
        if (nameStr.length < 2 || nameStr.length > 6) {
          this.warnStatus.name = true;
        }
      } else {
        this.warnStatus.name = true;
      }
    },
    // 判断用户名是不是正确的格式
    verifyUsername(username) {
      const user = this.trim(username);
      if (user.length) {
        if (user.length < 2 || user.length > 10) {
          // this.$message.error(this.warnMessage.userLength);
          this.warnStatus.username = true;
          this.warnMessage;
        }
      } else {
        // this.$message.error(this.warnMessage.userEmpty);
        this.warnStatus.username = true;
      }
    },
    // 判断学号/工号的正确性
    verifyId(id) {
      const reg = /^[1-9]\d*$/;
      const userId = this.trim(id);
      // console.log(userId.match(reg));
      if (userId.match(reg) === null) {
        this.warnStatus.id = true;
        this.warnMessage.id = "输入正确格式的学号/工号";
      }
    },
    // 判断密码的格式是不是正确
    verifyPwd(pwd) {
      const password = this.trim(pwd);
      if (password.length) {
        if (password.length < 6) {
          this.warnStatus.pwd = true;
          this.warnMessage.pwd = "密码长度应大于6位";
        }
      } else {
        this.warnStatus.pwd = true;
        this.warnMessage.pwd = "密码不能为空";
      }
    },
    // 判断确认密码是不是正确
    verifyConfirmPwd(pwdObj) {
      console.log(pwdObj);
      const passwordObj = {
        pwd: this.trim(pwdObj.pwd),
        confirmPwd: this.trim(pwdObj.confirmPwd)
      };
      if (passwordObj.confirmPwd.length) {
        if (passwordObj.pwd !== passwordObj.confirmPwd) {
          this.warnStatus.pwd = true;
          this.warnStatus.confirmPwd = true;
          this.warnMessage.pwd = "两次输入的密码不一致";
          this.warnMessage.confirmPwd = "两次输入的密码不一致";
        }
      } else {
        this.warnStatus.confirmPwd = true;
        this.warnMessage.confirmPwd = "确认密码不能为空";
      }
    },
    // 表单被聚焦的时候，取消警告提示
    stopWarn(key) {
      switch (key) {
        case "name":
          this.warnStatus.name = false;
          break;
        case "username":
          this.warnStatus.username = false;
          break;
        case "id":
          this.warnStatus.id = false;
          break;
        case "pwd":
          this.warnStatus.pwd = false;
          break;
        case "confirmPwd":
          this.warnStatus.confirmPwd = false;
          break;
        default:
          break;
      }
    },
    // 注册信息的提交，发起注册请求
    submit() {
      let userInfo = this.userInfo;
      // 登录前验证是不是所有的数据都是负荷正确格式的
      this.verifyPwd(userInfo.password);
      this.verifyId(userInfo.id);
      this.verifyName(userInfo.name);
      this.verifyUsername(userInfo.username);
      this.verifyConfirmPwd({
        pwd: this.userInfo.password,
        confirmPwd: this.userInfo.confirmPassword
      });
      // signIn()登录操作
      if (
        !this.warnStatus.name &&
        !this.warnStatus.username &&
        !this.warnStatus.id &&
        !this.warnStatus.pwd &&
        !this.warnStatus.confirmPwd
      ) {
        signIn(userInfo)
          .then(response => {
            console.log(response);
            if (response.data.success) {
              this.$message({
                showClose: true,
                message: "注册成功，即将跳转到登录页面",
                type: "success"
              });
              this.$router.push({
                path: "/login",
              })
            } else {
              if (response.data.data === "-1") {
                this.warnStatus.id = true;
                this.warnMessage.id = "该学号/工号已注册";
              }
              if (response.data.data === "-2") {
                this.warnStatus.username = true;
                this.warnMessage.username = "用户名已被占用";
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>
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
  top: 15%;
  left: 36%;
  width: 430px;
  /* margin: 80px auto 0 auto; */
  border: 1px solid #e3e3e3;
  border-radius: 4px;
}
.login-content {
  width: 85%;
  margin: 0 auto;
  /* text-align: center; */
  padding: 5px 15px 15px 15px;
}
.login-content .el-input {
  margin-top: 10px;
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
.tips {
  color: red;
  font-size: 12px;
  display: inline-block;
}
</style>
