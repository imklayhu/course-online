<template>
  <!-- 在线课程交互系统主题的查阅中的正在进行的任务列表模块 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>待查阅的任务</span>
      </div>
      <div class="text item">
        <el-row>
          <el-col>
            <!-- 搜索任务 -->
            <el-row v-if="false">
              <el-col>
                <el-input placeholder="请输入查询条件" v-model="input5" class="input-with-select">
                  <el-select v-model="select" style="width:95px;" slot="prepend" placeholder="请选择">
                    <el-option label="教师" value="1"></el-option>
                    <el-option label="题目" value="2"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-col>
            </el-row>
            <!-- 显示查询结果和建议加入的学生信息 -->
            <label class="course-group-name">任务信息</label>
            <el-row class="course-rows-table">
              <el-col class="course-cols-table course-th" :span="14">题目</el-col>
              <el-col class="course-cols-table course-th" :span="5">教师</el-col>
              <el-col class="course-cols-table course-th" :span="5">时间</el-col>
            </el-row>
            <el-row v-if="!tasksList.length" style="text-align:center;margin-top: 20px;">
              暂时没有任务，去快乐的玩耍吧～
            </el-row>
            <el-row class="course-rows-table" v-for="task in tasksList" :key="task._id">
              <el-col class="course-cols-table" :span="14">
                <router-link :to="`/course/processing/${task._id}`">{{task.title}}</router-link>
              </el-col>
              <el-col class="course-cols-table" :span="5">{{task.teacher.name}}</el-col>
              <el-col class="course-cols-table" :span="5">{{task.date[0].toString().slice(0,10)}}</el-col>
            </el-row>
            <!-- 分页器 -->
            <el-row>
              <el-col style="text-align:center;margin-top:20px;">
                <el-pagination v-if="false" layout="prev, pager, next" :total="50">
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
    getTasks
  } from './../../pages/index/api/tasks/index';
  import {
    mapState
  } from 'vuex';
  export default {
    name: "CheckingTasksList",
    data() {
      return {
        tasksList: [],
      }
    },
    mounted() {
      this.initTasks();
    },
    computed: {
      ...mapState({
        user: (state) => state.user
      })
    },
    methods: {
      initTasks() {
        if (this.user.type == 1) {
          // 如果是学生用户
          // 只需要查到与自己相关的状态，不需要其他学生的任务进度
          let obj = {
            filter: {
              status: "checking",
            },
            data: {
              id: this.user.id
            }
          }

          getTasks(obj)
            .then(response => {
              console.log(response);
              let data = response.data;
              if (data.success) {
                this.tasksList = data.res;
              } else {
                this.$message.error('初始化页面数据失败');
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else if (this.user.type == 2) {
          // 如果是教师用户
          // 需要查到所有的学生的任务信息

          // 查询条件
          let obj = {
            filter: {
              teacherId: this.user.id,
              status: "checking",
            },
            data: 0
          };

          getTasks(obj)
            .then(response => {
              console.log(response);
              let data = response.data;
              if (data.success) {
                this.tasksList = data.res;
              } else {
                this.$message.error('初始化页面数据失败');
              }
            })
            .catch(error => {
              console.log(error);
            })
        }
      },
    }
  };

</script>
<style scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .course-rows-table {
    border-bottom: 1px solid #e3e3e3;
    width: 95%;
    /* text-align: center; */
    margin-top: 10px;
  }

  .course-cols-table {
    /* border-right: 1px solid #e3e3e3; */
    padding: 2px 3px;
  }

  .course-th {
    font-size: 16px;
    font-weight: 2000;
  }

  .course-group-name {
    line-height: 38px;
    color: #cccccc;
    display: inline;
    /* border-bottom: 1px solid #cccccc; */
  }

</style>
