<template>
  <!-- 在线课程交互系统主题的正在进行中的任务模块 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>进行中的任务</span>
        <!-- <el-button style="float: right; padding: 3px 0; color:#009a61" type="text">修改进度</el-button> -->
      </div>
      <div class="text item">
        <div class="course-menuitem">
          <label class="course-group-name">作业信息</label>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                标题:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="select-header course-topic">{{taskInfo.title}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="2">
              <span class="select-header">
                描述:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="course-desc">
                {{taskInfo.desc}}
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                附件:
              </span>
            </el-col>
            <el-col :span="22">
              <div style="padding:6px 0px">
                <!-- <el-tag type="warning" size="small">作业.docx</el-tag>
                <el-tag type="warning" size="small">作业0.docx</el-tag>
                <el-tag type="warning" size="small">作业1.docx</el-tag> -->
                {{"没有附件"}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                教师:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="select-header course-topic">{{taskInfo.teacher.name}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col :span="2">
              <span class="select-header">
                时间:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="select-header course-topic">{{taskInfo.date[0].toString().slice(0,10)}} ~ {{taskInfo.date[1].toString().slice(0,10)}}</span>
            </el-col>
          </el-row>
          <!-- <el-row style="margin-top: 10px" >
            <el-col :span="2">
              <span class="select-header">
                类型:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="select-header course-topic">班级作业/小组作业</span>
            </el-col>
          </el-row> -->
        </div>
        <div class="course-menuitem" style="margin-top:10px;">
          <label class="course-group-name">编辑区</label>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                回答:
              </span>
            </el-col>
            <el-col :span="22">
              <el-input type="textarea" :rows="8" placeholder="在这里编辑答案" style="width:100%;padding-top:10px;"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                附件:
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
          <el-row style="margin-top:20px;">
            <el-col style="text-align:center">
              <el-button type="info">提交</el-button>
              <el-button type="warning">取消</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    findTaskById
  } from './../../pages/index/api/tasks/index';

  export default {
    name: "TaskDetails",
    props: {
      id: {
        type: String,
        default: 'test'
      }
    },
    data() {
      return {
        taskInfo: {},
      }
    },
    mounted() {
      // console.log(this.id);
      this.initData();
    },
    methods: {
      initData() {
        let obj = {
          _id: this.id,
        };

        findTaskById(obj)
          .then(response => {
            console.log(response);
            let data = response.data;
            if(data.success){
              this.taskInfo = data.res;
            }
          })
          .catch(err => {
            console.log(err)
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

  .course-group-name {
    color: #cccccc;
    display: inline;
  }

  .select-header {
    height: 38px;
    line-height: 38px;
    display: inline-block;
    padding: 0 8px;
  }

  .course-topic {
    background-color: #f6f6f6;
    border-radius: 4px;
    display: block;
  }

  .course-desc {
    min-height: 38px;
    display: block;
    background-color: #f6f6f6;
    border-radius: 4px;
    padding: 8px 6px;
    box-sizing: content-box;
  }

</style>
