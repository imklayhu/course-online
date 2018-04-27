<template>
  <div class="todo">
    <!-- 这是todo 页面 -->
    <div class="logo">TODO LIST</div>
    <el-input placeholder="请输入内容" v-model="newTask" class="input-with-select">
      <el-button slot="append" icon="el-icon-success"></el-button>
    </el-input>
    <div class="task-container">
      <span v-if="tasks.length">还没有内容，快来创建第一个任务吧！</span>
      <el-input v-model="input3" size="small" readonly>
        <el-checkbox v-model="checked" slot="prepend"></el-checkbox>
      </el-input>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "todo",
  props: {
    username: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newTask: "",
      tasks: []
    };
  },
  mounted() {
    console.log(this.username);
    this.getAllTask();
  },
  methods: {
    getAllTask() {
      if (this.username) {
        axios
          .get(`/getAllTask?username=${this.username}`)
          .then(response => {
            console.log(response);
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

.todo {
  width: 60%;
  /* height: 300px; */
  margin: 20px auto 0 auto;
  padding: 20px 5px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 1px 1px #cccccc;
}
.logo{
  margin: 10px auto 10px auto;
  text-align: center;
  font-size: 28px;
}
.task-container {
  text-align: center;
  margin-top: 20px;
}
</style>
