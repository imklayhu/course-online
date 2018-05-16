<template>
  <div style="margin: 0 8px;">
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;"><i class="el-icon-search"></i>搜索</label>
    <div style="margin: 10px 4px;">
      <el-input size="small" placeholder="请输入内容" v-model="input5" class="input-with-select">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;">热门话题</label>
    <div class="hot-topic">
      <span>就是测试一下主题</span>
      <span>就是测试一下主题</span>
      <span>就是测试一下主题</span>
      <span>就是测试一下主题就是测试一下主题就是测试一下主题</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "createTopic",
    data(){
      return {
        input5: '',
      }
    }
  }

</script>
<style scoped>
  .hot-topic {
    margin-top: 10px;
  }

  .hot-topic span {
    display: block;
    color: #009a61;
    margin: 6px 3px;
    background-color: #f6f6f6;
    padding: 4px 6px;
    border-radius: 4px;
    font-size: 14px;
  }

</style>
