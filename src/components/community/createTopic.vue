<template>
  <div>
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;">发帖</label>
    <div style="border: 1px solid #f6f6f6;border-radius: 4px;margin-top:10px;padding: 4px 6px;">
      <el-row style="margin:10px 5px 0 5px;">
        <el-col :span="2">标题:</el-col>
        <el-col :span="22">
          <el-input placeholder="输入标题..."></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 5px 0 5px;">
        <el-col :span="2">描述:</el-col>
        <el-col :span="22">
          <el-input type="textarea" :rows="3" placeholder="输入描述..."></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 5px 0 5px;padding-bottom: 10px;">
        <el-col :span="2">图片:</el-col>
        <el-col :span="22">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-col>
      </el-row>
    </div>
    <div style="text-align:right;margin-top:10px;">
      <el-button size="small" type="primary">确认</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "createTopic",
  }

</script>
<style scoped>


</style>
