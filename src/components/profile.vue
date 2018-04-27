<template>
  <!-- 个人中心 -->
  <div class="profile">
    <header class="profile-header">
      <div class="container">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8">
            <div>
              <div class="profile__heading--avatar-warp">
                <a><img class="profile__heading--avatar" src="https://i2.hdslb.com/bfs/face/0088e22e3768fc3cbd4bb18fd2d742148735ab49.jpg@72w_72h.webp" alt=""></a>
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                  <el-button size="mini" type="primary">修改头像</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8">
            <div>
              <h2 class="profile-username">{{username}} - {{name}}</h2>
              <p>学校：武汉纺织大学</p>
              <p>学院：数学与计算机学院</p>
              <p>专业班级：软件工程 11404班</p>
              <p>学号：1404240735</p>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <i class="el-icon-news" style="color:#009a61;"></i>
                <el-button style="float: right; padding: 3px 0" icon="el-icon-edit" type="text"></el-button>
              </div>
              <div class="text item">
                这个人很懒，什么都没有
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="profile-main">
      <div class="container">
        <el-tabs tab-position="left">
          <el-tab-pane label="基本信息">
            <el-card>
              <div slot="header" class="clearfix">
                <span>基本信息</span>
                <!-- <el-button style="float: right; padding: 3px 0" icon="el-icon-edit" type="text">编辑</el-button> -->
              </div>
              <div class="user-settings-general">
                <!-- 用户名修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">
                    <span>用户名</span>
                  </el-col>
                  <el-col :md="12">
                    <span>{{username}}</span>
                    <el-input placeholder="修改用户名" v-if="false"></el-input>
                  </el-col>
                  <el-col :md="6">
                    <el-button style="float: right;padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
                <!-- 姓名修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">姓名</el-col>
                  <el-col :md="12">{{name}}</el-col>
                  <el-col :md="6">
                    <el-button style="float: right;padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
                <!-- 学校修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学校</el-col>
                  <el-col :md="12">武汉纺织大学</el-col>
                  <el-col :md="6">
                    <el-button style="float: right; padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
                <!-- 学院修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学院</el-col>
                  <el-col :md="12">数学与计算机学院</el-col>
                  <el-col :md="6">
                    <el-button style="float: right;padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
                <!-- 专业班级修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">专业班级</el-col>
                  <el-col :md="12">软件工程-11404班</el-col>
                  <el-col :md="6">
                    <el-button style="float: right;padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
                <!-- 专业班级修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学号</el-col>
                  <el-col :md="12">{{id}}</el-col>
                  <el-col :md="6">
                    <el-button style="float: right;padding: 8px 0" icon="el-icon-edit" type="text">编辑</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="安全设置">
            <!-- 安全设置 -->
            <el-card class="secure-setting-panel">
              <div slot="header" class="clearfix">
                <span>安全设置</span>
                <!-- <el-button style="float: right; padding: 3px 0" icon="el-icon-edit" type="text">编辑</el-button> -->
              </div>
              <div class="secure-setting">
                <el-input v-model="fromData.oldPwd" @focus="stopWarn('oldPwd')" :class="[warnStatus.oldPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="输入当前密码"></el-input>
                <span :class="[warnStatus.oldPwd ? 'tips' : '']" v-if="warnStatus.oldPwd">{{warnMessage.oldPwd}}</span>
                <el-input v-model="fromData.newPwd" @focus="stopWarn('newPwd')" :class="[warnStatus.newPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="输入新密码"></el-input>
                <span :class="[warnStatus.newPwd ? 'tips' : '']" v-if="warnStatus.newPwd">{{warnMessage.newPwd}}</span>
                <el-input v-model="fromData.confirmPwd" @focus="stopWarn('confirmPwd')" :class="[warnStatus.confirmPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="再次输入新密码"></el-input>
                <span :class="[warnStatus.confirmPwd ? 'tips' : '']" v-if="warnStatus.confirmPwd">{{warnMessage.confirmPwd}}</span>
                <div style="text-align: center;margin-top: 5px;">
                  <el-button @click="pwdReset" type="primary" size="small">确认</el-button>
                  <el-button @click="cancel('pwd')" size="small">取消</el-button>
                </div>
              </div>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="退出系统">
            <!-- 退出系统 -->
            <el-card class="logout-card secure-setting-panel">
              {{username}} 将退出系统，确认退出系统吗？
              <el-button @click="dropOut" type="warning" size="small" style="float: right;">退出系统</el-button>
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="profile-footer"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { logout } from "../pages/index/api/sign/index";
import { resetPwd } from "../pages/index/api/user/index";
export default {
  name: "profile",
  data() {
    return {
      warnStatus: {
        oldPwd: false,
        newPwd: false,
        confirmPwd: false
      },
      warnMessage: {
        oldPwd: "当前密码不正确",
        newPwd: "新密码不能为空",
        confirmPwd: "两次输入的密码不一致"
      },
      fromData: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      name: state => state.user.name,
      id: state => state.user.id
    })
  },
  methods: {
    // 检测输入内容是否符合规定
    verifyOldPwd(oldPwd) {
      if (oldPwd) {
        if (oldPwd.length < 6) {
          this.warnStatus.oldPwd = true;
          this.warnMessage.oldPwd = "请输入正确的当前密码";
        }
      } else {
        this.warnStatus.oldPwd = true;
        this.warnMessage.oldPwd = "当前密码不能为空";
      }
    },
    // 检测输入的新密码是否是正确格式的
    verifyNewPwd(newPwd) {
      if (newPwd) {
        if (newPwd.length < 6) {
          this.warnStatus.newPwd = true;
          this.warnMessage.newPwd = "密码长度不应该小于6";
        }
      } else {
        this.warnStatus.newPwd = true;
        this.warnMessage.newPwd = "新密码不能为空";
      }
    },
    // 检测确认密码是不是正确的格式
    verifyConfirmPwd(newPwd, confirmPwd) {
      if (confirmPwd) {
        if (confirmPwd.length < 6 || confirmPwd !== newPwd) {
          this.warnStatus.confirmPwd = true;
          this.warnMessage.confirmPwd = "两次输入的新密码不一致";
        }
      } else {
        this.warnStatus.confirmPwd = true;
        this.warnMessage.confirmPwd = "请再次输入密码";
      }
    },
    stopWarn(key) {
      switch (key) {
        case "oldPwd":
          this.warnStatus.oldPwd = false;
          break;
        case "newPwd":
          this.warnStatus.newPwd = false;
          break;
        case "confirmPwd":
          this.warnStatus.confirmPwd = false;
          break;
        default:
          break;
      }
    },
    // 重置密码的方法
    pwdReset() {
      const pass = this.fromData;
      this.verifyOldPwd(pass.oldPwd);
      this.verifyNewPwd(pass.newPwd);
      this.verifyConfirmPwd(pass.newPwd, pass.confirmPwd);
    },
    // cancel 取消修改密码
    cancel(type){
      switch (type) {
        case "pwd":
          this.fromData = {
            oldPwd: '',
            newPwd: '',
            confirmPwd: ''
          };
          this.warnStatus = {
            oldPwd: false,
            newPwd: false,
            confirmPwd: false
          }
          break;
      
        default:
          break;
      }
    },
    // 退出登录
    dropOut() {
      const id = this.id;
      logout(id)
        .then(response => {
          console.log(response);
          this.$store.dispatch("Logout");
          this.$message({
            type: "success",
            message: "已退出登录"
          });
          this.$router.push({
            path: "/"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.profile {
  margin-top: 50px;
  width: 100%;
  min-width: 1000px;
}
.profile .profile-header {
  background-color: #f6f6f6;
  padding: 40px 0 0 0;
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  width: 80%;
  margin-top: 20px;
}
.profile__heading--avatar-warp {
  position: relative;
  /* border-radius: 50%; */
  overflow: hidden;
  text-align: center;
}
.profile__heading--avatar {
  background-color: #ffffff;
  width: 150px;
  border-radius: 50%;
}
.box-card {
  width: 100%;
  height: 210px;
}
.profile-username {
  display: block;
  width: 80%;
  border-bottom: 2px solid #009a61;
}
.user-settings-username {
  border-bottom: 1px solid #f6f6f6;
}
.secure-setting-panel {
  height: 350px;
}
.secure-setting {
  width: 350px;
  border: 1px solid #f6f6f6;
  border-radius: 5px;
  padding: 10px 18px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 1px 1px 2px #f6f6f6;
  /* text-align: center; */
}
.secure-setting .el-input {
  margin-top: 10px;
}
.tips {
  color: red;
  font-size: 12px;
  display: inline-block;
}
</style>
