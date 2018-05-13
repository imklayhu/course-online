<template>
  <!-- 在线课程交互系统创建新的小组 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建新的小组</span>
        <el-button style="float: right; padding: 3px 0; color:#009a61" type="text">确认创建</el-button>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              组名
            </span>
          </el-col>
          <el-col :span="22">
            <el-input placeholder="小组名称，如：皮皮虾我们走" style="width: 95%"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              组长
            </span>
          </el-col>
          <el-col :span="22">
            <el-input placeholder="指定一个小组长，学号" style="width: 95%"></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            <span class="select-header">
              成员
            </span>
          </el-col>
          <el-col :span="22">
            <!-- 查询要加入这个班级的学生信息 -->
            <el-row>
              <el-col :span="23">
                <el-input placeholder="请输入查询条件" v-model="input5" class="input-with-select">
                  <el-select v-model="select" style="width:95px;" slot="prepend" placeholder="请选择">
                    <el-option label="姓名" value="1"></el-option>
                    <el-option label="学号" value="2"></el-option>
                    <el-option label="用户名" value="3"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
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
            <el-row class="course-rows-table" v-if="true">
              <el-col class="course-cols-table" :span="4">1404240735</el-col>
              <el-col class="course-cols-table" :span="4">胡勇</el-col>
              <el-col class="course-cols-table" :span="4">Klay</el-col>
              <el-col class="course-cols-table" :span="4">武汉纺织大学数学与计算机学院</el-col>
              <el-col class="course-cols-table" :span="4">软件工程</el-col>
              <el-col :span="3">
                <el-button type="text">选择</el-button>
              </el-col>
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
  name: "CreateNewGroup",
  data() {
    return {
      input5: "",
      select: ""
    };
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
