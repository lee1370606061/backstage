<template>
  <div class="about">
    <el-card v-loading="loading" style="height:92.5vh;">
      <el-header style="text-align: end;">
        <span style="margin-right: 15px">{{userName}}</span>
        <el-popconfirm
          confirm-button-text='是'
          cancel-button-text='否'
          icon="el-icon-info"
          icon-color="red"
          title="是否要退出?"
          @confirm="logout"
        >
          <el-button slot="reference" type="danger" plain>退出<i class="el-icon-right"></i></el-button>
        </el-popconfirm>
      </el-header>

      <el-card style="margin-top:10px;">
        <el-button type="primary" icon="el-icon-search" @click="refresh">刷新数据</el-button>
      </el-card>

      <el-card style="margin-top:10px;">
        <el-form label-position="right" label-width="100px" :model="form">
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="form.confirmPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="changePassword">确认</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  computed: {
    userName(){
      return this.$ls.get('userInfo').username
    }
  },
  methods: {
    logout(){
      this.$ls.clear()
      this.$router.push('/login')
    },
    changePassword(){
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.$message.error('新密码和确认密码不一致')
        return
      }

      this.loading = true
      this.$http.post('api/changePassword', this.form).then(res => {
        this.$message.success('修改成功')
      }).finally(() => {
        this.loading = false
      })
    },
    refresh(){
      this.loading = true
      this.$http.post('api/getData', {}).then(res => {
        this.$message.success('操作成功')
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
