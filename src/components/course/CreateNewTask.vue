<template>
  <!-- 在线课程交互系统主题的创建新任务模块 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建新的任务</span>
        <el-button @click="createTask" style="float: right; padding: 3px 0; color:#009a61" type="text">确认创建</el-button>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              标题
            </span>
          </el-col>
          <el-col :span="22">
            <el-input v-model="taskData.title" placeholder="任务标题" style="width: 95%"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              描述
            </span>
          </el-col>
          <el-col :span="22">
            <el-input v-model="taskData.desc" type="textarea" :rows="4" placeholder="任务描述" style="width:95%;"></el-input>
          </el-col>
        </el-row>
        <el-row v-if="false">
          <el-col :span="2" >
            <span class="select-header">
              附件
            </span>
          </el-col>
          <el-col :span="22">
            <el-upload style="margin-top:10px;width:100%;" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">上传附件，将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">支持常见的文档类型，大小不要超过10M</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px;">
          <el-col :span="2">
            <span class="select-header">
              班级
            </span>
          </el-col>
          <el-col :span="22">
            <el-select v-model="classesIds" multiple placeholder="选择需要完成该任务的班级" style="width:95%">
              <el-option v-for="elem in classesSelect" :key="elem._id" :label="elem.name" :value="elem._id"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <!-- 根据任务类型的选择情况来决定显示哪些列表 -->
        <!-- 班级任务 可以多选 -->
        <!-- <el-row style="margin-top: 10px;" v-if="taskType === 'team'">
          <el-col :span="3">
            <span class="select-header">
              作业对象
            </span>
          </el-col>
          <el-col :span="21">
            <el-select v-model="teamTaskObject" multiple placeholder="选择需要完成该任务的班级" style="width:95%">
              <el-option label="班级任务" value="team"></el-option>
              <el-option label="小组任务" value="group"></el-option>
            </el-select>
          </el-col>
        </el-row> -->
        <!-- 小组任务，首先要选择班级，再选择班级里面的小组，分配任务 -->
        <!-- <el-row style="margin-top: 10px;" v-if="taskType === 'group'">
          <el-col :span="3">
            <span class="select-header">
              作业对象
            </span>
          </el-col>
          <el-col :span="21">
            <el-select v-model="classesIds" multiple placeholder="选择需要完成该任务的班级" style="width:95%">
              <el-option v-for="elem in classesSelect" :key="elem._id" :label="elem.name" :value="elem._id"></el-option>
            </el-select>
          </el-col>
        </el-row> -->
        <el-row style="margin-top: 10px;">
          <el-col :span="2">
            <span class="select-header">
              时间
            </span>
          </el-col>
          <el-col :span="22">
            <el-date-picker v-model="taskData.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    getAllClasses,
    getTasks,
    addTask,
    updateTaskStatus,
    removeTask
  } from "./../../pages/index/api/tasks/index";
  import {
    mapState
  } from 'vuex';

  export default {
    name: "CreateNewTask",
    data() {
      return {
        classesSelect: [],
        classesIds: [],
        taskData: {
          teacherId: '',
          title: "",
          desc: '',
          annexs: [],
          classes: [],
          teacher: {},
          // owner: {}, 
          date: [],
          answers: [],
          checks: [],
          status: 'processing'
        }
      };
    },
    computed: {
      ...mapState({
        owner: (state) => state.user
      })
    },
    mounted() {
      this.getClasses();
    },
    methods: {
      createTask() {
        let obj = this.taskData;
        obj.teacherId = this.owner.id;
        obj.teacher = this.owner;
        // console.log(obj.teacher);  
        this.classesSelect.forEach((element, index) => {
          this.classesIds.forEach((id) => {
            if (element._id === id) {
              this.taskData.classes.push(element);
            }
          })
        });
        // console.log(obj);
        if (obj.title && obj.desc && obj.classes && obj.date) {
          addTask(obj)
            .then(response => {
              console.log(response);
              let data = response.data
              if (data.success) {
                this.$notify({
                  title: "创建成功",
                  message: "学习任务创建成功，在“进行中的任务”查看该任务",
                  type: "success"
                });

                this.$router.push({
                  path: '/course/processing'
                });
              } else {
                this.$notify.error({
                  title: "创建失败",
                  message: "学习任务创建失败，检查班级信息"
                });
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          this.$notify.error({
            title: "创建失败",
            message: "学习任务创建失败，确认任务信息是否完备"
          });
        }
      },
      getClasses() {
        // let obj = {};
        getAllClasses()
          .then(response => {
            console.log(response);
            let data = response.data;
            if (data.success) {
              this.classesSelect = data.res;
            } else {
              // 数据库查询数据失败
              console.log("数据库查询数据失败");
            }
          })
          .catch(error => {
            console.log(error);
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

</style>
