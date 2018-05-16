<template>
  <div>
    <label style="font-size:16px; color: #009a61;border-bottom: 1px solid #cccccc;display: block;">发帖</label>
    <div style="border: 1px solid #f6f6f6;border-radius: 4px;margin-top:10px;padding: 4px 6px;">
      <el-row style="margin:10px 5px 0 5px;">
        <el-col :span="2">标题:</el-col>
        <el-col :span="22">
          <el-input v-model="topicInfo.title" placeholder="输入标题..."></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 5px 0 5px;">
        <el-col :span="2">主题:</el-col>
        <el-col :span="22">
          <el-input v-model="topicInfo.theme" placeholder="输入主题，如：毕业设计"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 5px 10px 5px;">
        <el-col :span="2">描述:</el-col>
        <el-col :span="22">
          <el-input v-model="topicInfo.desc" type="textarea" :rows="3" placeholder="输入描述..."></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 5px 0 5px;padding-bottom: 10px;" v-if="false">
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
      <el-button @click="submit" size="small" type="primary">确认</el-button>
      <el-button size="small">取消</el-button>
    </div>
  </div>
</template>
<script>
  import {
    createTopic,
    getTopicsRow
  } from './../../pages/index/api/topics/index';
  import {
    mapState
  } from 'vuex';

  export default {
    name: "createTopic",
    data() {
      return {
        topicInfo: {
          theme: '',
          title: '',
          desc: '',
          pagehost: '',
          createDate: ''
        }
      }
    },
    computed: {
      ...mapState({
        username: state => state.user.username
      })
    },
    methods: {
      submit() {
        let obj = this.topicInfo;
        obj.pagehost = this.username;
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

        obj.createDate = new Date().Format('yyyy-MM-dd');
        if (obj.title && obj.desc) {
          createTopic(obj)
            .then(response => {
              if (response.data.success) {
                this.$notify({
                  title: '话题新建成功',
                  message: '新的话题创建成功',
                  type: 'success'
                })
                const obj1 = {
                  page: 1
                };
                getTopicsRow(obj1)
                  .then(response => {
                    let data = response.data;
                    if (data.success) {
                      this.$store.dispatch('SetTopicsList', data.res);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  })
                this.topicInfo = {
                  theme: '',
                  title: '',
                  desc: '',
                  pagehost: '',
                  createDate: ''
                }
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          this.$message.warning('检查必填项');
        }
      },
    }
  }

</script>
<style scoped>


</style>
