<template>
  <!-- 在线课程交互系统主题的学习社区模块 -->
  <div class="community-container">
    <el-row>
      <el-col :span="18">
        <router-view/>
      </el-col>
      <el-col :span="6">
        <hot-topic></hot-topic>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import hotTopic from '@/components/community/hotTopic'
  export default {
    name: "Community",
    components:{
      hotTopic
    }
  }

</script>
<style scoped>
.community-container{
  padding-top: 60px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>
