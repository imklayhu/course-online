<template>
  <!-- 在线课程交互系统主题的正在进行中的任务模块 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>学习任务详情</span>
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
        </div>
        <div class="course-menuitem" style="margin-top:10px;">
          <label class="course-group-name">学习任务成果</label>
          <div v-if="taskInfo.status != 'processing'">
            <el-row style="margin-bottom: 10px;">
              <el-col :span="3">
                <span class="select-header">
                  选择成果:
                </span>
              </el-col>
              <el-col :span="21">
                <el-select v-model="checkTaskId" @change="setCurrentAnswer" style="width: 60%" placeholder="根据姓名选择成果进行查阅...">
                  <el-option v-for="answer in answersList" :label="answer.studentInfo.name" :value="answer._id" :key="answer._id"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <div v-if="checkTaskId">
              <el-row>
                <el-col :span="2">
                  <span class="select-header">
                    回答:
                  </span>
                </el-col>
                <el-col :span="22">
                  <span class="course-desc">
                    {{checkNow.desc}}
                  </span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <span class="select-header">
                    附件:
                  </span>
                </el-col>
                <el-col :span="22" style="padding: 8px 4px;">
                  {{'没有附件'}}
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="course-menuitem" v-if="taskInfo.status === 'sloved' &&  checkTaskId" style="margin-top:10px;">
          <label class="course-group-name">查阅结果</label>
          <el-row style="margin-bottom: 10px;">
            <el-col :span="2">
              <span class="select-header">
                成绩:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="course-desc">
                {{finalCheck}}
              </span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <span class="select-header">
                点评:
              </span>
            </el-col>
            <el-col :span="22">
              <span class="course-desc">
                {{taskInfo.checks[0].desc}}
              </span>
            </el-col>
          </el-row>
        </div>
        <div class="course-menuitem" style="margin-top:10px;">
          <label v-if="taskInfo.status === 'processing'" class="course-group-name">编辑区</label>
          <div v-if="taskInfo.status === 'processing'">
            <el-row>
              <el-col :span="2">
                <span class="select-header">
                  回答:
                </span>
              </el-col>
              <el-col :span="22">
                <el-input v-model="answerInfo.desc" type="textarea" :rows="8" placeholder="在这里编辑答案" style="width:100%;padding-top:10px;"></el-input>
              </el-col>
            </el-row>
            <el-row v-if="false">
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
          </div>
          <div v-if="taskInfo.status === 'checking'">
            <el-row>
              <el-col :span="2">
                <span class="select-header">
                  结果:
                </span>
              </el-col>
              <el-col :span="22">
                <el-select style="width: 60%" v-model="checkInfo.result" placeholder="请选择">
                  <el-option label="不及格" :value="checkResult.D"></el-option>
                  <el-option label="及格" :value="checkResult.C"></el-option>
                  <el-option label="良好" :value="checkResult.B"></el-option>
                  <el-option label="优秀" :value="checkResult.A"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">
                <span class="select-header">
                  意见:
                </span>
              </el-col>
              <el-col :span="22">
                <el-input v-model="checkInfo.desc" type="textarea" :rows="8" placeholder="在这里编辑反馈意见" style="width:100%;padding-top:10px;"></el-input>
              </el-col>
            </el-row>
          </div>
          <el-row style="margin-top:20px;" v-if="taskInfo.status !== 'sloved'">
            <el-col style="text-align:center">
              <el-button type="info" @click="submit">提交</el-button>
              <el-button type="warning" @click="cancel">取消</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    findTaskById,
    updateTaskStatus,
  } from './../../pages/index/api/tasks/index';

  import {
    mapState
  } from 'vuex';
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
        answersList: [],
        taskInfo: {},
        checkResult: {
          A: 0,
          B: 1,
          C: 2,
          D: 3
        },
        finalCheck: "",
        answerInfo: {
          // studentInfo: this.user,
          desc: "",
          annexs: []
        },
        checkTaskId: "",
        checkNow: {},
        checkInfo: {
          // teacherInfo: this.user,
          desc: "",
          result: "",
        }
      }
    },
    mounted() {
      // console.log(this.id);
      this.initData();
    },
    computed: {
      ...mapState({
        user: (state) => state.user
      })
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
            if (data.success) {
              this.taskInfo = data.res;
              this.answersList = this.taskInfo.answers;

              let result = this.taskInfo.checks[0].result;
              switch (result) {
                case "0":
                  this.finalCheck = "不及格";
                  break;
                case "1": 
                  this.finalCheck = "及格";
                  break;
                case "2": 
                  this.finalCheck = "良好";
                  break;
                case "3": 
                  this.finalCheck = "优秀";
                  break;
                default:
                  break;
              }
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 选择某一条回答进行查阅
      setCurrentAnswer(id) {
        console.log(id);
        let answers = this.taskInfo.answers;
        answers.forEach((element) => {
          if (element._id === id) {
            this.checkNow = element;
          }
        })
      },
      // 提交回答/查阅意见
      submit() {
        let taskStatus = this.taskInfo.status;
        switch (taskStatus) {
          case "processing":
            // 提交任务的回答
            this.answerInfo.studentInfo = this.user;

            let obj1 = {
              filter: {
                _id: this.id,
              },
              updateData: {
                answer: this.answerInfo,
                status: "checking"
              },
              type: "answer",
            }

            if (this.answerInfo.desc) {
              updateTaskStatus(obj1)
                .then(response => {
                  console.log(response);
                  if (response.data.success) {
                    this.$notify({
                      title: "回答成功",
                      message: "学习任务回答成功",
                      type: 'success'
                    });
                    this.$router.push({
                      path: '/course/checking'
                    })
                  }
                })
                .catch(error => {
                  console.log(error);
                })
            } else {
              this.$message.error('答案不能为空')
            }
            break;
          case "checking":
            // 提交任务查阅结果
            let obj2 = {
              filter: {
                _id: this.id,
              },
              updateData: {
                check: this.checkInfo,
                status: "sloved"
              },
              type: 'check'
            }

            if (this.checkInfo.result && this.checkInfo.desc) {
              updateTaskStatus(obj2)
                .then(response => {
                  console.log(response);
                  if (response.data.success) {
                    this.$notify({
                      title: "回答成功",
                      message: "学习任务回答成功",
                      type: 'success'
                    });
                    this.$router.push({
                      path: '/course/sloved'
                    })
                  }
                })
                .catch(error => {
                  console.log(error);
                })
            } else {
              this.$message.error('检查输入');
            }
            break;
          default:
            break;
        }
      },
      // 取消编辑
      cancel() {
        this.$router.go(-1);
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
