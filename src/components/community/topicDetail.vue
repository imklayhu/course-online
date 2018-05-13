<template>
  <div>
    <el-button @click="toBack" size="mini" icon="el-icon-arrow-left" style="background-color: #009a61;color: #ffffff">返回</el-button>
    <el-card style="margin-top:10px;">
      <el-row>
        <el-col :span="24">
          <span style="display:inline;color: #009a61;">#就是测试一下主题#</span>
          <h3 style="display:inline;font-size:16px;">动态路由匹配</h3>
          <p style="margin:3px 0px;">我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。</p>
        </el-col>
      </el-row>
      <el-row style="font-size:14px;">
        <el-col :span="2">
          <el-button size="mini" type="text" class="like">赞-4</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text" class="unlike">踩-2</el-button>
        </el-col>
        <el-col :span="2">
          <el-button size="mini" type="text">评论-12</el-button>
        </el-col>
        <el-col :span="2" style="color:#009a61;font-weight: 99999;">
          <el-button size="mini" type="text">Klay</el-button>
        </el-col>
        <el-col :span="3">
          <el-button size="mini" type="text">2018/5/7</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="text" icon="el-icon-delete" size="mini" class="del">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 15px;">
      <div slot="header" class="clearfix">
        <span>12条评论</span>
      </div>
      <div class="comment">
        <div v-if="false" style="text-align:center;">
          还没有评论，快来抢沙发！
        </div>
        <div class="comment">
          <div class="comment-header">
            <span>
              <strong>Klay</strong>
            </span>
            <span style="float:right;font-size: 14px; color: #495060;">2018-5-7</span>
          </div>
          <div class="comment-content">
            评论内容
          </div>
          <div class="comment-operate">
            <el-button type="text" size="small">回复</el-button>
            <el-button type="text" size="small" class="del">删除</el-button>
          </div>
          <div class="comment-reply">
            <div class="comment-header reply-header">
              <span>
                <strong>Klay</strong> 回复
                <strong>Klay</strong>
              </span>
              <span style="float:right;font-size: 14px; color: #495060;">
                2018-5-7
              </span>
            </div>
            <div class="reply-content comment-content">
              回复评论内容
            </div>
            <div class="reply-reply">
              <el-button type="text" size="small">回复</el-button>
              <el-button type="text" size="small" class="del">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: "topicDeatil",
    data(){
      return {

      }
    },
    methods:{
      toBack(){
        this.$router.go(-1)
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
  .del{
    color: #ff5f57;
  }

</style>
