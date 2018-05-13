<template>
  <!-- 在线课程交互系统主题的查阅中的正在进行的任务列表模块 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中的任务列表</span>
        <!-- <el-button style="float: right; padding: 3px 0; color:#009a61" type="text">确认创建</el-button> -->
      </div>
      <div class="text item">
        <el-row>
          <el-col>
            <!-- 搜索任务 -->
            <el-row>
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
              <el-col class="course-cols-table course-th" :span="3">作业ID</el-col>
              <el-col class="course-cols-table course-th" :span="4">教师</el-col>
              <el-col class="course-cols-table course-th" :span="8">题目</el-col>
              <el-col class="course-cols-table course-th" :span="4">类型</el-col>
              <el-col class="course-cols-table course-th" :span="5">时间</el-col>
              <!-- <el-col class="course-th" :span="3">操作</el-col> -->
            </el-row>
            <el-row class="course-rows-table" v-if="true">
              <el-col class="course-cols-table" :span="3">0</el-col>
              <el-col class="course-cols-table" :span="4">朱萍</el-col>
              <el-col class="course-cols-table" :span="8">
                <router-link to="/course/processing/12">武汉纺织大学数学与计算机学院</router-link>
              </el-col>
              <el-col class="course-cols-table" :span="4">班级作业</el-col>
              <el-col class="course-cols-table" :span="5">2018/5/17</el-col>
              <!-- <el-col :span="3">
                <el-button type="text">选择</el-button>
              </el-col> -->
            </el-row>
            <!-- 分页器 -->
            <el-row>
              <el-col style="text-align:center;margin-top:20px;">
                <el-pagination layout="prev, pager, next" :total="50">
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
  export default {
    name: "TasksList"
  };

</script>
<style scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .course-rows-table {
    border-bottom: 1px solid #e3e3e3;
    width: 95%;
    text-align: center;
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
