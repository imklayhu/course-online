<template>
  <div>
    <el-button @click="toBack" size="mini" icon="el-icon-arrow-left" style="background-color: #009a61;color: #ffffff">返回</el-button>
    <el-card style="margin-top:10px;">
      <el-row>
        <el-col :span="24">
          <span style="display:inline;color: #009a61;"># {{topicDetail.theme}} #</span>
          <h3 style="display:inline;font-size:16px;">{{topicDetail.title}}</h3>
          <p style="margin:3px 0px;">{{topicDetail.desc}}</p>
        </el-col>
      </el-row>
      <el-row style="font-size:14px;">
        <el-col :span="2">
          <el-button size="mini" type="text" class="like">赞-{{topicDetail.like}}</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text" class="unlike">踩-{{topicDetail.unlike}}</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="focusInput(1)" size="mini" type="text">评论-{{topicDetail.commentCount}}</el-button>
        </el-col>
        <el-col :span="2" style="color:#009a61;font-weight: 99999;">
          <el-button size="mini" type="text">{{topicDetail.pagehost}}</el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" type="text">{{topicDetail.createDate}}</el-button>
        </el-col>
        <el-col :span="3">
          <el-button @click="removeTopic(topicDetail._id)" v-if="topicDetail.pagehost === username" type="text" icon="el-icon-delete" size="mini" class="del">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span>{{topicDetail.commentCount}}条评论</span>
      </div>
      <div class="comment">
        <div v-if="topicDetail.commentCount == '0'" style="text-align:center;height: 40px;line-height: 40px;padding-bottom: 10px;">
          还没有评论，快来抢沙发！
        </div>
        <div class="comment" v-if="topicDetail.commentCount != '0'">
          <div v-for="comment in topicDetail.comments" :key="comment._id">
            <div class="comment-header">
              <span>
                <strong>{{comment.username}}</strong>
              </span>
              <span style="float:right;font-size: 14px; color: #495060;">{{comment.date}}</span>
            </div>
            <div class="comment-content">
              {{comment.content}}
            </div>
            <div class="comment-operate">
              <el-button type="text" size="small" @click="focusInput(2,comment.username,comment._id)">回复</el-button>
              <el-button @click="removeComment(comment._id)" type="text" size="small" class="del">删除</el-button>
            </div>
            <div class="comment-reply" v-if="reply.commentId === comment._id" :key="reply._id" v-for="reply in topicDetail.replys">
              <div class="comment-header reply-header">
                <span>
                  <strong>{{reply.username}}</strong> 回复
                  <strong>{{reply.atUsername}}</strong>
                </span>
                <span style="float:right;font-size: 14px; color: #495060;">
                  {{reply.date}}
                </span>
              </div>
              <div class="reply-content comment-content">
                {{reply.content}}
              </div>
              <div class="reply-reply">
                <el-button type="text" size="small" @click="focusInput(2,reply.username,'',reply._id)">回复</el-button>
                <el-button type="text" size="small" class="del">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px;">
        <el-input ref="input" v-model="content" :placeholder="customPlaceholder"></el-input>
        <div style="margin: 10px 4px;float:right;">
          <el-button @click="submit" style="background-color: #009a61;color: #ffffff">提交</el-button>
          <el-button @click="toBack" type="warning">取消</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import {
    getTopicDetail,
    addComment,
    deleteTopic,
    addReply,
  } from './../../pages/index/api/topics/index';
  import {
    mapState
  } from 'vuex';

  export default {
    name: "topicDeatil",
    props: {
      id: {
        type: String,
      }
    },
    data() {
      return {
        topicDetail: {},
        content: "",
        submitType: "comment",
        customPlaceholder: "输入评论...",
        // currentReplyId: "",
        commentInfo: {
          content: "",
          date: "",
          username: ""
        },
        replyInfo: {
          replyType: 0,
          commentId: "",
          replyId: "",
          atUsername: "",
          username: "",
          content: "",
          date: ""
        }
      }
    },
    computed: {
      ...mapState({
        username: state => state.user.username,
      })
    },
    mounted() {
      // console.log(this.id);
      this.initTopic();
    },
    methods: {
      initTopic() {
        let obj = {
          _id: this.id,
        };
        getTopicDetail(obj)
          .then(response => {
            let data = response.data;
            if (data.success) {
              this.topicDetail = data.res;
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      setReplys(comment) {
        const replys = comment.replys;
        replys.forEach((element) => {
          if (element.commentId === comment.commentId) {
            comment.replyself = [].push(element);
          }
        })
      },
      submit() {
        switch (this.submitType) {
          case "comment":
            this.createComment()
            break;
          case "reply":
            this.createReply()
            break;
          default:
            break;
        }
      },
      createComment() {
        Date.prototype.Format = function (fmt) { //author: meizz 
          var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
              (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        };
        this.commentInfo = {
          content: this.content,
          username: this.username,
          date: new Date().Format('yyyy-MM-dd')
        }

        const filter = {
          _id: this.topicDetail._id
        };
        const updateData = this.commentInfo;

        const obj = {
          filter,
          updateData
        };

        addComment(obj)
          .then(response => {
            let data = response.data;
            if (data.success) {
              // console.log(response);
              this.content = "";
              this.submitType = "comment";
              this.topicDetail = data.res;
              // this.initTopic();
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      createReply() {
        Date.prototype.Format = function (fmt) { //author: meizz 
          var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
              (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        };

        this.replyInfo.username = this.username;
        this.replyInfo.content = this.content;
        this.replyInfo.date = new Date().Format('yyyy-MM-dd')

        const filter = {
          _id: this.topicDetail._id
        }
        const updateData = this.replyInfo;
        const obj = {
          filter,
          updateData
        }
        addReply(obj)
          .then(response => {
            let data = response.data;
            if (data.success) {
              this.topicDetail = data.res;
              this.content = "";
              this.customPlaceholder = "输入评论...";
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      focusInput(type, username, commentId, replyId) {
        if (type === 1) {
          this.$nextTick(function () {
            this.$refs['input'].focus();
          });
          this.customPlaceholder = "输入评论...";
          this.submitType = "comment";
        }
        if (type === 2) {
          this.$nextTick(function () {
            this.$refs['input'].focus();
          });
          this.customPlaceholder = `回复${username}...`;
          this.submitType = "reply";
          this.replyInfo.replyType = 0;
          this.replyInfo.atUsername = username;
          this.replyInfo.commentId = commentId;
          this.replyInfo.replyId = replyId;
        }
      },
      toBack() {
        this.$router.go(-1)
      },
      removeTopic(id) {
        let obj = {
          _id: id,
        };

        deleteTopic(obj)
          .then(response => {
            let data = response.data;
            if (data.success) {
              console.log(data.res);
              this.$router.push({
                path: '/community'
              })
              this.$notify({
                type: "success",
                // message: "话题删除成功",
                title: "话题删除成功"
              })
            }
          })
      }
    }
  }

</script>
<style scoped>
  .comment-header {
    height: 35px;
    line-height: 35px;
  }

  .comment-header span {
    display: inline-block;
    height: 100%;
  }

  .comment-content {
    margin: 4px 0;
    background-color: #f6f6f6;
    padding: 5px 8px;
    border-radius: 4px;
  }

  .comment-operate {
    border-bottom: 1px solid #cccccc;
  }

  .comment-reply {
    margin-top: 5px;
    margin-left: 20px;
  }

  .like {
    color: #009a61;
  }

  .unlike {
    color: #ffbd2e;
  }

  .del {
    color: #ff5f57;
  }

</style>
