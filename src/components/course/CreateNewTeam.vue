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
            <el-input placeholder="班级，如：软件工程-11404班" style="width: 95%"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              学委
            </span>
          </el-col>
          <el-col :span="22">
            <el-input placeholder="学委,输入学委的学号" style="width: 95%"></el-input>
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
                  <el-button @click="getStudents" slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
            <!-- 显示查询结果和建议加入的学生信息 -->
            <el-row class="course-rows-table">
              <el-col class="course-cols-table course-th" :span="4">学号</el-col>
              <el-col class="course-cols-table course-th" :span="4">姓名</el-col>
              <el-col class="course-cols-table course-th" :span="4">用户名</el-col>
              <el-col class="course-cols-table course-th" :span="4">院校</el-col>
              <el-col class="course-cols-table course-th" :span="4">专业</el-col>
              <el-col class="course-th" :span="3">操作</el-col>
            </el-row>
            <el-row class="course-rows-table" v-if="true" v-for="stu in studentsSelect" :key="stu.id">
              <el-col class="course-cols-table" :span="4">{{stu.id}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.name}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.username}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.school}}-{{stu.college}}</el-col>
              <el-col class="course-cols-table" :span="4">{{stu.profession}}</el-col>
              <el-col :span="3">
                <el-button type="text" @click="setClassMembers(stu)">{{stu.selected ? "移除": "选择"}}</el-button>
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
  } from "./../../pages/index/api/tasks/index"
  export default {
    name: "CreateNewTeam",
    data() {
      return {
        classStatus: {
          name: "",
          captainId: "",
          teacherId: "",
          students: []
        },
        studentsSelect: [],
        keyword: {
          type: "",
          word: ""
        }
      };
    },
    mounted() {
      this.getStudents();
    },
    methods: {
      addClass() {

      },
      setClassMembers(obj) {
        obj.selectd = false;
        if (obj.selected) {
          this.classStatus.students.forEach((element, index) => {
            if (element.id === obj.id) {
              this.classStatus.students.splice(index, 1);
            }
            obj.selected = false;
          })
          console.log(this.classStatus.students);
        } else {
          this.classStatus.students.push(obj);
          console.log(this.classStatus.students);
          obj.selected = true;
        }
      },
      getStudents() {
        let query = {}
        if (this.keyword.type === "name") {
          query = {
            name: this.keyword.word
          };
        } else if (this.keyword.type === "username") {
          query = {
            username: this.keyword.word
          };
        } else if (this.keyword.type === "id") {
          query = {
            id: this.keyword.word
          };
        } else {
          query = {};
        }
        console.log(query)
        getUsersInfo(query)
          .then(response => {
            // console.log(response);
            let data = response.data;
            if (data.success) {
              data.res.forEach(element => {
                element.selected = false;
              });
              console.log(data.res);
              this.studentsSelect = data.res;
            }
          }).catch(err => {
            console.log(err);
          })
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

</style>
