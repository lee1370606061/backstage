<template>
  <div class="about">
    <el-card v-loading="loading" style="height:92.5vh;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="立即咨询地址">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="按钮文字">
          <el-input v-model="form.download_button"></el-input>
        </el-form-item>
        <el-form-item label="下载标题">
          <el-input v-model="form.download_title"></el-input>
        </el-form-item>
        <el-form-item label="底部协议">
          <el-input v-model="form.reserved"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="init">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        download_button: "",
        link: "",
        download_title: "",
        reserved: ""
      }
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.loading = true
      this.$http.post('api/promote/getPromoteSetting').then(res => {
        this.form = res
      }).finally(() => {
        this.loading = false
      })
    },
    save() {
      this.loading = true
      this.$http.post('api/promote/savePromoteSetting', this.form).then(res => {
        this.$message.success('保存成功')
      }).finally(() => {
        this.loading = false
      })
    }
  },
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>