<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>

export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onChange(file) {
      file = file.raw
      console.log(file)
      const isImage = /[/.](gif|x-icon|jpg|jpeg|tiff|png)$/i.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isImage) {
        this.$message.error('请上传图片');
        return
      }
      if (!isLt2M) {
        this.$message.error('图片不能大于20MB!');
        return
      }
      const formData = new FormData()
      
      formData.append('file', file)

      this.$http.post('api/upload', formData).then(res => {
        console.log(res)
        this.$emit('success', res)
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
    width: 80px !important;
    height: 80px !important;
    line-height: 80px !important;
    text-align: center;
  }
  .avatar {
    width: 80px !important;
    height: 80px !important;
    display: block;
  }
</style>