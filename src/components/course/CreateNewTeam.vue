<template>
  <!-- 在线课程交互系统创建新的班级 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建新的班级</span>
        <el-button @click="addClass" style="float: right; padding: 3px 0; color:#009a61" type="text">确认创建</el-button>
      </div>
      <div class="text item">
        <!-- 创建新的班级 -->
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              班级
            </span>
          </el-col>
          <el-col :span="22">
            <el-input v-model="classStatus.name" placeholder="必填，班级，如：软件工程-11404班" style="width: 95%"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin-bottom:10px;">
          <el-col :span="2">
            <span class="select-header">
              教师
            </span>
          </el-col>
          <el-col :span="22">
            <el-select v-model="teacherId" placeholder="请选择教师">
              <el-option v-for="item in teachersSelect" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              学生
            </span>
          </el-col>
          <el-col :span="22">
            <!-- 查询要加入这个班级的学生信息 -->
            <el-row>
              <el-col :span="23">
                <el-input placeholder="请输入查询条件" v-model="keyword.word" class="input-with-select">
                  <el-select v-model="keyword.type" style="width:95px;" slot="prepend" placeholder="请选择">
                    <el-option label="姓名" value="name"></el-option>
                    <el-option label="学号" value="id"></el-option>
                    <el-option label="用户名" value="username"></el-option>
                  </el-select>
                  <el-button @click="getStudents(1)" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
            <!-- 显示查询结果和建议加入的学生信息 -->
            <el-row class="course-rows-table">
              <el-col class="course-cols-table course-th" :span="4">学号</el-col>
              <el-col class="course-cols-table course-th" :span="2">姓名</el-col>
              <el-col class="course-cols-table course-th" :span="3">用户名</el-col>
              <el-col class="course-cols-table course-th" :span="4">院校</el-col>
              <el-col class="course-cols-table course-th" :span="4">专业</el-col>
              <el-col class="course-th" :span="3">选择</el-col>
              <el-col class="course-th" :span="3">学委</el-col>
            </el-row>
            <el-row class="course-rows-table" :class="stu.selected ? 'row-selected':'' " v-if="true" v-for="stu in studentsSelect" :key="stu.id">
              <el-col class="course-cols-table" :span="4">{{stu.id}}</el-col>
              <el-col class="course-cols-table" :span="2">{{stu.name}}</el-col>
              <el-col class="course-cols-table" :span="3">{{stu.username}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.school}} {{stu.college}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.profession}}</el-col>
              <el-col :span="3">
                <el-button type="text" @click="setClassMembers(stu)">{{stu.selected ? "移除": "选择"}}</el-button>
              </el-col>
              <el-col :span="3">
                <el-button type="text" :disabled="!stu.selected" @click="setClassCaptain(stu)">{{stu.isCaptain ? "取消": "设置"}}</el-button>
              </el-col>
            </el-row>
            <!-- 分页器 -->
            <el-row>
              <el-col style="text-align:center;margin-top:20px;">
                <el-pagination layout="prev, pager, next" :total="50" v-if="false">
                </el-pagination>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    getUsersInfo
  } from "./../../pages/index/api/user/index";
  import {
    createClass,
    removeClass
  } from "./../../pages/index/api/tasks/index";
  import {
    mapState
  } from "vuex";
  export default {
    name: "CreateNewTeam",
    data() {
      return {
        teacherId: "",
        classStatus: {
          name: "",
          teacher: {},
          students: [],
          owner: {}
        },
        studentsSelect: [],
        teachersSelect: [],
        keyword: {
          type: "",
          word: ""
        }
      };
    },
    computed: {
      ...mapState({
        name: state => state.user.name,
        username: state => state.user.username,
        id: state => state.user.id,
        school: state => state.user.school,
        college: state => state.user.college,
        team: state => state.user.team,
        profession: state => state.user.profession,
        type: state => state.user.type,
        // avatar: state => state.user.avatar
      })

    },
    mounted() {
      this.getStudents(1);
      this.getStudents(2);
    },
    methods: {
      addClass() {
        if (this.classStatus.name && this.teacherId && this.classStatus.students) {
          let query = {
            name: this.classStatus.name,
            // teacher: 
            students: this.classStatus.students,
            owner: {
              id: this.id,
              name: this.name,
              username: this.username,
              school: this.school,
              college: this.college,
              team: this.team,
              profession: this.profession,
              tyep: this.type
            }
          };

          this.teachersSelect.forEach((element) => {
            if (element.id == this.teacherId) {
              query.teacher = element;
              console.log(query);
            }
          });

          createClass(query)
            .then(response => {
              console.log(response);
              if (response.data.success) {
                this.$notify({
                  type: 'success',
                  title: '创建成功',
                  message: `班级:${query.name}创建成功`
                });

                this.$router.push({
                  path: '/course'
                })
              } else {
                this.$notify.error({
                  title: "创建失败",
                  message: "班级创建失败，检查班级信息"
                });
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          this.$notify.error({
            title: "创建失败",
            message: "班级创建失败，检查班级信息"
          });
        }
      },
      setClassCaptain(obj) {
        if (obj.isCaptain == true) {
          this.classStatus.students.forEach((element, index) => {
            if (element.id === obj.id) {
              element.isCaptain = false;
            }
          });
        } else {
          this.classStatus.students.forEach((element, index) => {
            if (element.id === obj.id) {
              element.isCaptain = true;
            } else {
              element.isCaptain = false;
            }
          });
        }
      },
      setClassMembers(obj) {
        obj.selectd = false;
        if (obj.selected) {
          this.classStatus.students.forEach((element, index) => {
            if (element.id === obj.id) {
              element.isCaptain = false;
              this.classStatus.students.splice(index, 1);
            }
            obj.selected = false;
          });
        } else {
          this.classStatus.students.push(obj);
          obj.selected = true;
        }
      },
      getStudents(type) {
        let query = {};
        if (type == 1) {
          if (this.keyword.type === "name") {
            query = {
              type: 1,
              name: this.keyword.word
            };
          } else if (this.keyword.type === "username") {
            query = {
              type: 1,
              username: this.keyword.word
            };
          } else if (this.keyword.type === "id") {
            query = {
              type: 1,
              id: this.keyword.word
            };
          } else {
            query = {
              type: 1,
            };
          }

          getUsersInfo(query)
            .then(response => {
              // console.log(response.data.res);
              let data = response.data;
              if (data.success) {
                data.res.forEach(element => {
                  element.selected = false;
                });
                this.studentsSelect = data.res;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (type == 2) {
          query = {
            type: 2,
          };

          getUsersInfo(query)
            .then(response => {
              console.log(response.data.res);
              let data = response.data;
              if (data.success) {
                this.teachersSelect = data.res;
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
        // console.log(query);

      }
    }
  };

</script>
<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;
  }

  .el-input {
    margin-bottom: 10px;
  }

  .select-header {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    padding: 0 8px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .course-rows-table {
    border-bottom: 1px solid #e3e3e3;
    width: 95%;
    text-align: center;
  }

  .course-cols-table {
    /* border-right: 1px solid #e3e3e3; */
    padding: 2px 3px;
  }

  .course-th {
    font-size: 16px;
    font-weight: 2000;
  }

  .row-selected {
    background-color: #f0f9ec;
  }

</style>
