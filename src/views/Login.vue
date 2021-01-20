<template>
  <el-card class="login">
    <el-form :model="submitParams" ref="submitParams" >
      <el-form-item
        prop="username"
        label="账号"
        :rules="[
          { required: true, message: '请输入账号', trigger: 'blur' }
        ]"
      >
        <el-input v-model="submitParams.username"></el-input>
      </el-form-item>
      <el-form-item
        :label="'密码'"
        prop="password"
        :rules="{
          required: true, message: '请输入密码', trigger: 'blur'
        }"
      >
        <el-input v-model="submitParams.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width:100%" type="primary" @click="submitForm('submitParams')" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      submitParams: {
        username: '',
        password: '',
      },
      loading: false
    };
  },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('api/login', this.submitParams).then(res => {
            console.log(res)
            this.$ls.set('isLogged', true)
            this.$ls.set('userInfo', res.userInfo)
            this.$ls.set('tokenInfo', res.tokenInfo)
            this.$router.push('/')
          }).finally(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less">
    .login {
        max-width: 500px;
        margin: auto;
        margin-top: 5rem;
    }
</style>