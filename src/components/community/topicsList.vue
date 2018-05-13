<template>
  <div style="margin-top:15px;">
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;">大家在聊什么？</label>
    <div>
      <el-card style="margin-top:10px;" shadow="hover">
        <el-row>
          <el-col :span="24">
            <span style="display:inline;color: #009a61;">#就是测试一下主题#</span>
            <h3 style="display:inline;font-size:16px;" @click="toDetail(12)">动态路由匹配</h3>
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
      <el-card style="margin-top:10px;" shadow="hover">
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
      <el-card style="margin-top:10px;" shadow="hover">
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
      <el-card style="margin-top:10px;" shadow="hover">
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
      <el-card style="margin-top:10px;" shadow="hover">
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

      <div style="text-align:center;margin: 20px 0;padding-top: 5px;border-top: 1px solid #cccccc">
        <el-pagination layout="prev, pager, next" :total="50">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "topicsList",
    data(){
      return {

      }
    },
    methods: {
      toDetail(id){
        this.$router.push({
          path: `/community/${id}`
        })
      }
    }
  }
</script>
<style scoped>
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
