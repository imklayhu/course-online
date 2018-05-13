<template>
  <!-- 在线课程交互系统主题的模块 -->
  <div class="course-container">
    <!-- <create-new-task></create-new-task> -->
    <el-row>
      <el-col :span="4">
        <!-- Tab菜单 -->
        <el-button @click="customMenu('processing')" :class="isActive.processing ? 'course-active-button':''" icon="el-icon-time">进行中的任务</el-button>
        <el-button @click="customMenu('checking')"  :class="isActive.checking ? 'course-active-button':''" icon="el-icon-view">待查阅的任务</el-button>
        <el-button @click="customMenu('sloved')" :class="isActive.sloved ? 'course-active-button':''" icon="el-icon-check">已完成的任务</el-button>
      </el-col>
      <el-col :span="16">
        <router-view/>
      </el-col>
      <el-col :span="4">
        <!-- 操作 -->
        <el-button @click="customMenu('create')" class="course-active-button" style="float:right" icon="el-icon-circle-plus">创建新的任务</el-button>
        <el-button @click="customMenu('newTeam')" class="course-active-button" style="float:right" icon="el-icon-menu">创建新的班级</el-button>
        <el-button @click="customMenu('newGroup')" class="course-active-button" style="float:right" icon="el-icon-tickets">创建新的小组</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CreateNewTask from "../components/course/CreateNewTask.vue";
export default {
  name: "CourseOnline",
  components: {
    CreateNewTask
  },
  data() {
    return {
      isActive: {
        processing: true,
        checking: false,
        sloved: false
      }
    };
  },
  methods: {
    customMenu(key) {
      switch (key) {
        case "create":
          this.$router.push({
            path: "/course/create"
          });
          break;
        case "newTeam":
          this.$router.push({
            path: "/course/create/class",
          })
          break;
        case "newGroup":
          this.$router.push({
            path: "/course/create/group",
          })
          break;
        case "processing":
          this.$router.push({
            path: "/course/processing"
          });
          this.isActive = {
            processing: true,
            checking: false,
            sloved: false
          };
          break;
        case "checking":
          this.$router.push({
            path: "/course/checking"
          });
          this.isActive = {
            processing: false,
            checking: true,
            sloved: false
          };
          break;
        case "sloved":
          this.$router.push({
            path: "/course/sloved"
          });
          this.isActive = {
            processing: false,
            checking: false,
            sloved: true
          };
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.course-container {
  padding-top: 60px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.el-button {
  margin-bottom: 10px;
}
.course-active-button {
  background: #009a61;
  color: white;
  border: none;
}
.el-button + .el-button {
  margin-left: 0;
}
</style>

