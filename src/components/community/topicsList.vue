<template>
  <div style="margin-top:15px;">
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;">大家在聊什么？</label>
    <div>
      <el-card style="margin-top:10px;" shadow="hover" :key="topic._id" v-for="topic in topicsList">
        <el-row>
          <el-col :span="24">
            <span style="display:inline;color: #009a61;">#{{topic.theme}}#</span>
            <h3 style="display:inline;font-size:16px;" @click="toDetail(topic._id)">{{topic.title}}</h3>
            <p style="margin:3px 0px;">{{topic.desc}}</p>
          </el-col>
        </el-row>
        <el-row style="font-size:14px;">
          <el-col :span="2">
            <el-button @click="addLikeCount(topic)" :disabled="topic.liked" size="mini" type="text" class="like">赞-{{topic.like}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="addUnlikeCount(topic)" :disabled="topic.unliked" size="mini" type="text" class="unlike">踩-{{topic.unlike}}</el-button>
          </el-col>
          <el-col :span="2">
            <el-button @click="toDetail(topic._id)" size="mini" type="text">评论-{{topic.commentCount}}</el-button>
          </el-col>
          <el-col :span="2" style="color:#009a61;font-weight: 99999;">
            <el-button size="mini" type="text">{{topic.pagehost}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button size="mini" type="text">{{topic.createDate}}</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="removeTopic(topic._id)" v-if="topic.pagehost === username" type="text" icon="el-icon-delete" size="mini"
              class="del">删除</el-button>
          </el-col>
        </el-row>
      </el-card>

      <div style="text-align:center;margin: 20px 0;padding-top: 5px;border-top: 1px solid #cccccc">
        <el-pagination :current-page="currentPage" v-if="pageCount > 1" layout="prev, pager, next" :total="pageCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex';
  import {
    getTopicsCount,
    getTopicsRow,
    deleteTopic,
    addLike,
    addUnlike,
  } from './../../pages/index/api/topics/index'
  export default {
    name: "topicsList",
    data() {
      return {
        total: "",
        pageCount: "",
        currentPage: "1",
        // topicsList: [],
      }
    },
    computed: {
      ...mapState({
        topicsList: state => state.topics.topicsList,
        username: state => state.user.username
      })
    },
    mounted() {
      this.getTotal();
      this.loadTopics();
    },
    methods: {
      getTotal() {
        let obj = {};
        getTopicsCount(obj)
          .then(response => {
            console.log(response);
            if (response.data.success) {
              this.totaol = response.data.res.total;
              if (response.data.res.pageCount < 1) {
                this.pageCount = 1
              } else {
                this.pageCount = response.data.res.pageCount;
              }
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      loadTopics() {
        let obj = {
          page: this.currentPage,
        };
        getTopicsRow(obj)
          .then(response => {
            let data = response.data;
            if (data.success) {
              this.$store.dispatch('SetTopicsList', data.res);
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      addLikeCount(topic) {
        console.log(`点赞${topic._id}`);
        const filter = {
          _id: topic._id,
        }
        const updateData = {
          like: topic.like + 1,
        };

        let obj = {
          filter,
          updateData
        }

        addLike(obj)
          .then(response => {
            console.log(response);
            topic.like = topic.like + 1;
            topic.liked = true;
          })
          .catch(error => {
            console.log(error);
          })
      },
      addUnlikeCount(topic) {
        console.log(`点踩${topic._id}`);
        const filter = {
          _id: topic._id,
        }
        const updateData = {
          unlike: topic.unlike + 1,
        };

        let obj = {
          filter,
          updateData
        }

        addUnlike(obj)
          .then(response => {
            console.log(response);
            topic.unlike = topic.unlike + 1;
            topic.unliked = true;
          })
          .catch(error => {
            console.log(error);
          })
      },
      toDetail(id) {
        this.$router.push({
          path: `/community/${id}`
        })
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
              this.getTotal();
              this.loadTopics();
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
