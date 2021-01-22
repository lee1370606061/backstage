<template>
  <div class="about">
    <el-card v-loading="loading" style="height:92.5vh;">
      <el-form ref="form" :model="form" label-width="150px">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="底部广告">
              <ImageUpload :imageUrl="form.bottomPromoteSrc" @success="res => form.bottomPromoteSrc = res" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="右边广告">
              <ImageUpload :imageUrl="form.rightPromoteSrc" @success="res => form.rightPromoteSrc = res" />
            </el-form-item>
          </el-col>
        </el-row> 
        <el-form-item label="底部广告跳转链接">
          <el-input v-model="form.bottomPromoteLink"></el-input>
        </el-form-item>
        <el-form-item label="右边广告跳转链接">
          <el-input v-model="form.rightPromoteLink"></el-input>
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
        bottomPromoteLink: '',
        rightPromoteLink: '',
        bottomPromoteSrc: '',
        rightPromoteSrc: ''
      }
    };
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.loading = true
      this.$http.post('api/live/get').then(res => {
        this.form = res
      }).finally(() => {
        this.loading = false
      })
    },
    save() {
      this.loading = true
      this.$http.post('api/live/save', this.form).then(res => {
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