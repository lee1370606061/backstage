<template>
  <el-upload
    class="avatar-uploader"
    action=""
    :auto-upload="false"
    :show-file-list="false"
    :on-change="onChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>

export default {
  props: {
    ico: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onChange(file) {
      file = file.raw
      console.log(file)
      const isImage = /[/.](gif|x-icon|jpg|jpeg|tiff|png)$/i.test(file.type);
      const isIco = /(.ico)$/i.test(file.name);
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isImage) {
        this.$message.error('请上传图片');
        return
      }
      if (this.ico && !isIco) {
        this.$message.error('仅接受 .ico 图片格式');
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