<template>
  <div id="app">
    <courseNav></courseNav>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import courseNav from '@/components/nav'
export default {
  name: "App",
  components: {
    courseNav
  },
  data() {
    return {};
  },
  mounted() {
    // axios
    //   .get("/api/getJson", {})
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }
};
</script>

<style>
body{
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.global-header{
  z-index: 999;
}
.login-container {
  z-index: 1;
}
.el-card__header{
  padding: 5px 20px;
}
.warn-input{
  border: 1px solid red;
  border-radius: 4px;
}
</style>
