<template>
  <div class="about">
    <el-card v-loading="loading" style="height:92.5vh;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="头部Logo">
              <ImageUpload :imageUrl="form.logoSrc" @success="res => form.logoSrc = res" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="左边广告">
              <ImageUpload :imageUrl="form.promoteLeftSrc" @success="res => form.promoteLeftSrc = res" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="右边广告">
              <ImageUpload :imageUrl="form.promoteRightSrc" @success="res => form.promoteRightSrc = res" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6">
            <el-form-item label="Activity name">
              <ImageUpload :imageUrl="imageUrl" @success="res => imageUrl = res" />
            </el-form-item>
          </el-col> -->
        </el-row> 
        <el-form-item label="App 下载地址">
          <el-input v-model="form.appDownloadLink"></el-input>
        </el-form-item>
        <el-form-item label="底部协议">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model="form.bottomProtocol"></el-input>
          <el-alert
            style="margin-top:10px"
            title="底部协议注意：如果想换行请用 | 英文符号来隔开"
            type="warning"
            show-icon
            :closable="false"
          >
          </el-alert>
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
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      loading: false,
      form: {
        logoSrc: '',
        promoteLeftSrc: '',
        promoteRightSrc: '',
        bottomProtocol: '',
      }
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.loading = true
      this.$http.post('api/home/get').then(res => {
        this.form = res
      }).finally(() => {
        this.loading = false
      })
    },
    save() {
      this.loading = true
      this.$http.post('api/home/save', this.form).then(res => {
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