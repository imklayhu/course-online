<template>
  <!-- 导航栏的组件 -->
  <nav class="global-header">
    <h1>
      <router-link to="/">在线课程交互系统</router-link>
    </h1>
    <ul>
      <li @click="active(0)" v-if="username" :class="isActive.index1? 'is-active': ''">
        <router-link to="/course">课程中心</router-link>
      </li>
      <li @click="active(1)" v-if="username" :class="isActive.index2? 'is-active': ''">
        <router-link to="/bbs">学习社区</router-link>
      </li>
      <li v-if="username">
        <el-tooltip class="item" effect="dark" :content="username" placement="bottom">
          <router-link to="/profile"><img :src="avatar" alt=""></router-link>
        </el-tooltip>
      </li>
      <li @click="active(3)" v-if="!username" :class="isActive.index4? 'is-active': ''">
        <router-link to="/signin">注册</router-link>
      </li>
      <li @click="active(4)" v-if="!username" :class="isActive.index5? 'is-active': ''">
        <router-link to="/login">登录</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "course-nav",
  data() {
    return {
      isActive: {
        index1: true,
        index2: false,
        index4: false,
        index5: false
      },
      avatar:
        "https://i2.hdslb.com/bfs/face/0088e22e3768fc3cbd4bb18fd2d742148735ab49.jpg@72w_72h.webp"
    };
  },
  computed: {
    ...mapState({
      username: state => state.user.username,
      name: state => state.user.name,
      id: state => state.user.id
    }),
  },
  mounted() {
    
  },
  methods: {
    active(index) {
      switch (index) {
        case 0:
          this.isActive = {
            index1: true,
            index2: false,
            index4: false,
            index5: false
          };
          break;
        case 1:
          this.isActive = {
            index1: false,
            index2: true,
            index4: false,
            index5: false
          };
          break;
        case 3:
          this.isActive = {
            index1: false,
            index2: false,
            index4: true,
            index5: false
          };
          break;
        case 4:
          this.isActive = {
            index1: false,
            index2: false,
            index4: false,
            index5: true
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
.global-header {
  width: 100%;
  height: 50px;
  /* margin:0 10px; */
  line-height: 50px;
  border-bottom: 1px solid #e3e3e3;
  position: fixed;
  top: 0;
  left: 0;
  color: #ffffff;
  background-color: #ffffff;
  /* z-index: 2; */
}
.global-header h1 {
  margin: 0 0 0 10px;
  height: 100%;
  width: 200px;
  display: inline-block;
  /* color: #009a61; */
}
.global-header h1 a {
  color: #009a61;
  text-decoration: none;
}
.global-header ul {
  list-style: none;
  float: right;
  margin: 0;
  height: 50px;
  line-height: 50px;
  margin-right: 10px;
}
.global-header ul li {
  float: left;
  margin: 0 10px;
  cursor: pointer;
}
.global-header ul li img {
  padding-top: 2px;
  width: 46px;
  border-radius: 100%;
}
.global-header .tiptools-hover {
  display: none;
  width: 150px;
  position: relative;
  right: 0;
  top: 0;
}
.global-header .tiptools-hover:hover {
  display: block;
}
.global-header ul li a {
  color: black;
  text-decoration: none;
}
.is-active {
  border-bottom: 2px solid #409eff;
  /* color: #009a61; */
}
</style>

