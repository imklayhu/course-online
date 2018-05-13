<template>
  <!-- 个人中心 -->
  <div class="profile">
    <header class="profile-header">
      <div class="container">
        <el-row>
          <el-col :xs="8" :sm="8" :md="8">
            <div>
              <div class="profile__heading--avatar-warp">
                <a><img class="profile__heading--avatar" :src="avatar" alt=""></a>
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
              <p>学校：{{ school || '无'}}</p>
              <p>学院：{{ college || '无'}}</p>
              <p>专业班级：{{`${profession}-${team}`|| '无'}}</p>
              <p>学号：{{id || '无'}}</p>
            </div>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8">
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <i class="el-icon-news" style="color:#009a61;"></i>
                <el-button @click="setUserInfo('signature')" style="float: right; padding: 3px 0" :icon="editStatus.signature ? 'el-icon-check' : 'el-icon-edit'" type="text">{{editStatus.signature ? '保存' : '编辑'}}</el-button>
                <el-button @click="cancel('signature')" v-if="editStatus.signature" style="float: right; padding: 3px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
              </div>
              <div class="text item">
                <p v-if="!editStatus.signature">{{ signature }}</p>
                <el-input v-model="editFromData.signature" v-if="editStatus.signature" type="textarea" :rows="4"></el-input>
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
                    <span v-if="!editStatus.username">{{username}}</span>
                    <el-input @focus="stopWarn('username')" v-model="editFromData.username" :class="[warnStatus.username ? 'warn-input':'']" v-if="editStatus.username" placeholder="修改用户名"></el-input>
                    <span :class="[warnStatus.username ? 'tips' : '']" v-if="warnStatus.username">{{warnMessage.username}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('username')" v-if="editStatus.username" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('username')" style="float: right;padding: 8px 0" :icon="editStatus.username? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.username ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 姓名修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">姓名</el-col>
                  <el-col :md="12">
                    <span style="padding: 8px 0" v-if="!editStatus.name">{{name}}</span>
                    <el-input @focus="stopWarn('name')" v-if="editStatus.name" v-model="editFromData.name" :class="[warnStatus.name ? 'warn-input':'']" placeholder="请输入姓名"></el-input>
                    <span :class="[warnStatus.name ? 'tips' : '']" v-if="warnStatus.name">{{warnMessage.name}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('name')" v-if="editStatus.name" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('name')" style="float: right;padding: 8px 0" :icon="editStatus.name? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.name ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 学校修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学校</el-col>
                  <el-col :md="12">
                    <span v-if="!editStatus.school">{{ school || '无'}}</span>
                    <el-input @focus="stopWarn('school')" v-model="editFromData.school" v-if="editStatus.school" :class="[warnStatus.school ? 'warn-input':'']" placeholder="请输入学校"></el-input>
                    <span :class="[warnStatus.school ? 'tips' : '']" v-if="warnStatus.school">{{warnMessage.school}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('school')" v-if="editStatus.school" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('school')" style="float: right; padding: 8px 0" :icon="editStatus.school ? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.school ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 学院修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学院</el-col>
                  <el-col :md="12">
                    <span v-if="!editStatus.college">{{ college || '无'}}</span>
                    <el-input @focus="stopWarn('college')" v-model="editFromData.college" v-if="editStatus.college" :class="[warnStatus.college ? 'warn-input':'']" placeholder="请输入新的学院"></el-input>
                    <span :class="[warnStatus.college ? 'tips' : '']" v-if="warnStatus.college">{{warnMessage.college}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('college')" v-if="editStatus.college" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('college')" style="float: right;padding: 8px 0" :icon="editStatus.college ? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.college ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 专业修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">专业</el-col>
                  <el-col :md="12">
                    <span v-if="!editStatus.profession">{{ profession || '无'}}</span>
                    <el-input @focus="stopWarn('profession')" v-if="editStatus.profession" v-model="editFromData.profession" :class="[warnStatus.profession ? 'warn-input':'']" placeholder="请输入新的专业名称"></el-input>
                    <span :class="[warnStatus.profession ? 'tips' : '']" v-if="warnStatus.profession">{{warnMessage.profession}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('profession')" v-if="editStatus.profession" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('profession')" style="float: right;padding: 8px 0" :icon="editStatus.profession ? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.profession ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 班级修改 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">班级</el-col>
                  <el-col :md="12">
                    <span v-if="!editStatus.team">{{ team || '无'}}</span>
                    <el-input @focus="stopWarn('team')" v-if="editStatus.team" v-model="editFromData.team" :class="[warnStatus.team ? 'warn-input':'']" placeholder="请输入新的班级信息"></el-input>
                    <span :class="[warnStatus.team ? 'tips' : '']" v-if="warnStatus.team">{{warnMessage.team}}</span>
                  </el-col>
                  <el-col :md="6">
                    <el-button @click="cancel('team')" v-if="editStatus.team" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('team')" style="float: right;padding: 8px 0" :icon="editStatus.team ? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.team ? '保存' : '编辑' }}</el-button>
                  </el-col>
                </el-row>
                <!-- 学号 -->
                <el-row class="user-settings-username">
                  <el-col :md="6">学号</el-col>
                  <el-col :md="12">
                    <span v-if="!editStatus.id">{{ id }}</span>
                    <!-- <el-input v-if="editStatus.id" v-model="editFromData.id" placeholder="请输入新的学号"></el-input> -->
                  </el-col>
                  <el-col :md="6">
                    <!-- <el-button @click="cancel('id')" v-if="editStatus.id" style="float: right; padding: 8px 0" icon="el-icon-close" type="text">{{'取消'}}</el-button>
                    <el-button @click="setUserInfo('id')" style="float: right;padding: 8px 0" :icon="editStatus.id ? 'el-icon-check':'el-icon-edit'" type="text">{{ editStatus.id ? '保存' : '编辑' }}</el-button> -->
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
                <el-input v-model="passFromData.oldPwd" @focus="stopWarn('oldPwd')" :class="[warnStatus.oldPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="输入当前密码"></el-input>
                <span :class="[warnStatus.oldPwd ? 'tips' : '']" v-if="warnStatus.oldPwd">{{warnMessage.oldPwd}}</span>
                <el-input v-model="passFromData.newPwd" @focus="stopWarn('newPwd')" :class="[warnStatus.newPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="输入新密码"></el-input>
                <span :class="[warnStatus.newPwd ? 'tips' : '']" v-if="warnStatus.newPwd">{{warnMessage.newPwd}}</span>
                <el-input v-model="passFromData.confirmPwd" @focus="stopWarn('confirmPwd')" :class="[warnStatus.confirmPwd ? 'warn-input':'']" type="password" minlength="6" placeholder="再次输入新密码"></el-input>
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
import {
  resetPwd,
  setSignature,
  setUsername,
  setName,
  setSchool,
  setCollege,
  setProfession,
  setTeam
} from "../pages/index/api/user/index";
export default {
  name: "profile",
  data() {
    return {
      warnStatus: {
        oldPwd: false,
        newPwd: false,
        confirmPwd: false,
        username: false,
        name: false,
        school: false,
        college: false,
        profession: false,
        team: false
      },
      warnMessage: {
        oldPwd: "当前密码不正确",
        newPwd: "新密码不能为空",
        confirmPwd: "两次输入的密码不一致",
        username: "该用户名已存在",
        name: "新的姓名不能为空",
        school: "新的学校不能为空",
        college: "新的学院不能为空",
        profession: "新的专业不能为空",
        team: "新的班级不能为空"
      },
      passFromData: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      editStatus: {
        username: false,
        team: false,
        name: false,
        id: false,
        school: false,
        college: false,
        profession: false,
        signature: false
      },
      editFromData: {
        username: "",
        name: "",
        id: "",
        school: "",
        college: "",
        profession: "",
        team: "",
        signature: ""
      }
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      name: state => state.user.name,
      id: state => state.user.id,
      school: state => state.user.school,
      college: state => state.user.college,
      team: state => state.user.team,
      profession: state => state.user.profession,
      type: state => state.user.type,
      signature: state => state.user.signature,
      avatar: state => state.user.avatar
    })
  },
  mounted() {
    // console.log(this.$store.state.user);
  },
  methods: {
    // 设置用户的个人信息 基本设置
    setUserInfo(key) {
      switch (key) {
        case "username":
          // this.editStatus.username = !this.editStatus.username;
          if (!this.editStatus.username) {
            this.editStatus.username = true;
          } else {
            const obj = {
              id: this.id,
              username: this.editFromData.username
            };
            if (obj.username) {
              setUsername(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.username = "";
                    this.$store.dispatch("ResetUsername", data.res);
                    this.editStatus.username = false;
                    this.$notify({
                      title: "修改成功",
                      message: "用户名修改成功",
                      type: "success"
                    });
                  } else {
                    // this.editStatus.username = true
                    this.warnStatus.username = true;
                    this.warnMessage.username = "该用户名已存在";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.username = true;
              this.warnMessage.username = "新的用户名不能为空";
            }
          }
          break;
        case "name":
          if (!this.editStatus.name) {
            this.editStatus.name = true;
          } else {
            const obj = {
              id: this.id,
              name: this.editFromData.name
            };
            if (obj.name) {
              setName(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.name = "";
                    this.$store.dispatch("ResetName", data.res);
                    this.editStatus.name = false;
                    this.$notify({
                      title: "修改成功",
                      message: "姓名修改成功",
                      type: "success"
                    });
                  } else {
                    // this.editStatus.username = true
                    this.warnStatus.name = true;
                    this.warnMessage.name = "修改失败";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.name = true;
              this.warnMessage.name = "新的姓名不能为空";
            }
          }
          break;
        case "school":
          if (!this.editStatus.school) {
            this.editStatus.school = true;
          } else {
            const obj = {
              id: this.id,
              school: this.editFromData.school
            };
            if (obj.school) {
              setSchool(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.school = "";
                    this.$store.dispatch("ResetSchool", data.res);
                    this.editStatus.school = false;
                    this.$notify({
                      title: "修改成功",
                      message: "学校名称修改成功",
                      type: "success"
                    });
                  } else {
                    this.warnStatus.school = true;
                    this.warnMessage.school = "修改失败";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.school = true;
              this.warnMessage.school = "新的学校名称不能为空";
            }
          }
          // this.editStatus.school = !this.editStatus.school;
          break;
        case "college":
          if (!this.editStatus.college) {
            this.editStatus.college = true;
          } else {
            const obj = {
              id: this.id,
              college: this.editFromData.college
            };
            if (obj.college) {
              setCollege(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.college = "";
                    console.log(data.res);
                    this.$store.dispatch("ResetCollege", data.res);
                    this.editStatus.college = false;
                    this.$notify({
                      title: "修改成功",
                      message: "学院名称修改成功",
                      type: "success"
                    });
                  } else {
                    this.warnStatus.college = true;
                    this.warnMessage.college = "修改失败";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.college = true;
              this.warnMessage.college = "新的学院名称不能为空";
            }
          }
          break;
        case "profession":
          if (!this.editStatus.profession) {
            this.editStatus.profession = true;
          } else {
            const obj = {
              id: this.id,
              profession: this.editFromData.profession
            };
            if (obj.profession) {
              setProfession(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.profession = "";
                    this.$store.dispatch("ResetProfession", data.res);
                    this.editStatus.profession = false;
                    this.$notify({
                      title: "修改成功",
                      message: "专业名称修改成功",
                      type: "success"
                    });
                  } else {
                    this.warnStatus.profession = true;
                    this.warnMessage.profession = "修改失败";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.profession = true;
              this.warnMessage.profession = "新的专业名称不能为空";
            }
          }
          break;
        case "team":
          if (!this.editStatus.team) {
            this.editStatus.team = true;
          } else {
            const obj = {
              id: this.id,
              team: this.editFromData.team
            };
            if (obj.team) {
              setTeam(obj)
                .then(response => {
                  const data = response.data;
                  if (data.success) {
                    this.editFromData.team = "";
                    this.$store.dispatch("ResetTeam", data.res);
                    this.editStatus.team = false;
                    this.$notify({
                      title: "修改成功",
                      message: "班级修改成功",
                      type: "success"
                    });
                  } else {
                    this.warnStatus.team = true;
                    this.warnMessage.team = "修改失败";
                  }
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.warnStatus.team = true;
              this.warnMessage.team = "新的班级不能为空";
            }
          }
          break;
        case "id":
          this.editStatus.id = !this.editStatus.id;
          break;
        case "signature":
          if (this.editStatus.signature) {
            console.log("可以发起保存请求");
            if (this.editFromData.signature) {
              const obj = {
                id: this.id,
                signature: this.editFromData.signature
              };
              setSignature(obj)
                .then(response => {
                  if (response.data.success) {
                    this.editStatus.signature = false;
                    const data = response.data.res;
                    console.log(data);
                    this.$store.dispatch("GetSignature", data);
                    this.$notify({
                      title: "更新成功",
                      message: "个性签名更新成功啦～",
                      type: "success"
                    });
                  } else {
                    this.$notify({
                      title: "更新失败",
                      message: "新的个性签名更新失败，请检查输入输入",
                      type: "error"
                    });
                  }
                })
                .catch(error => {
                  console.log(error);
                  this.$notify({
                    title: "更新失败",
                    message: "新的个性签名更新失败，请检查输入输入",
                    type: "error"
                  });
                });
            } else {
              this.$notify({
                title: "新的个性签名为空",
                message: "新的个性签名为空，请输入新的个性签名",
                type: "warning"
              });
            }
          } else {
            console.log("开始编辑签名");
            this.editStatus.signature = true;
          }
          break;

        default:
          break;
      }
    },
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
        case "username":
          this.warnStatus.username = false;
          break;
        case "name":
          this.warnStatus.name = false;
          break;
        case "school":
          this.warnStatus.school = false;
          break;
        case "college":
          this.warnStatus.college = false;
        case "profession":
          this.warnStatus.profession = false;
          break;
        case "team":
          this.warnStatus.team = false;
          break;
        default:
          break;
      }
    },
    // 重置密码的方法
    pwdReset() {
      const pass = this.passFromData;
      this.verifyOldPwd(pass.oldPwd);
      this.verifyNewPwd(pass.newPwd);
      this.verifyConfirmPwd(pass.newPwd, pass.confirmPwd);

      if (
        !this.warnStatus.oldPwd &&
        !this.warnStatus.newPwd &&
        !this.warnStatus.confirmPwd
      ) {
        const obj = {
          id: this.id,
          oldPwd: this.passFromData.oldPwd,
          newPwd: this.passFromData.newPwd
        };
        resetPwd(obj)
          .then(response => {
            // console.log(response);
            const data = response.data;
            if (data.success) {
              logout(obj.id)
                .then(response => {
                  // console.log(response);
                  this.$store.dispatch("Logout");
                  this.$notify({
                    title: "密码修改成功",
                    message: "密码修改成功，请重新登录系统",
                    type: "success"
                  });
                  this.$router.push({
                    path: "/login"
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              this.$notify({
                title: "密码修改失败",
                message: "请填写正确的当前密码",
                type: "error"
              });
              this.warnStatus.oldPwd = true;
              this.warnMessage.oldPwd = "当前密码不正确";
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // cancel 取消修改密码
    cancel(type) {
      switch (type) {
        case "username":
          this.editStatus.username = false;
          this.editFromData.username = "";
        case "name":
          this.editStatus.name = false;
          this.editFromData.name = "";
        case "school":
          this.editStatus.school = false;
          this.editFromData.school = "";
        case "college":
          this.editStatus.college = false;
          this.editFromData.college = "";
        case "profession":
          this.editStatus.profession = false;
          this.editFromData.profession = "";
        case "team":
          this.editStatus.team = false;
          this.editFromData.team = "";
        case "id":
          this.editStatus.id = false;
          this.editFromData.id = "";
        case "pwd":
          this.passFromData = {
            oldPwd: "",
            newPwd: "",
            confirmPwd: ""
          };
          this.warnStatus = {
            oldPwd: false,
            newPwd: false,
            confirmPwd: false
          };
          break;
        case "signature":
          this.editStatus.signature = false;
          this.editFromData.signature = "";
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
