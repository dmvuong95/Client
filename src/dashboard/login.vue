<template>
  <div class="outer">
    <div class="middle">
      <div class="inner" style="text-align:center;">
        <img src="../assets/logo.png">
        <el-card shadow="hover">
          <div slot="header" style="text-align:center">
            <span>Please login</span>
          </div>
          <el-form ref="form" :model="user" :rules="rules" label-width="120">
            <el-form-item label="Username" prop="username">
              <el-input
                ref="username"
                v-model="user.username"
                @keyup.enter.native="onLogin('form')"
              ></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                ref="password"
                v-model="user.password"
                type="password"
                @keyup.enter.native="onLogin('form')"
              ></el-input>
            </el-form-item>
            <el-button type="primary" @click="onLogin('form')">Login</el-button>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import app from '@/app'
export default {
  data () {
    return {
      user: { username: '', password: '' },
      rules: {
        username: [{ required: true, message: 'Please fill username', trigger: 'blur' }],
        password: [{ required: true, message: 'Please fill password', trigger: 'blur' }]
      }
    }
  },
  methods: {
    onLogin (formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          if (!this.user.username) return this.$refs.username.focus()
          if (!this.user.password) return this.$refs.password.focus()
          return false
        }
        axios.post('/users/login', this.user).then((result) => {
          console.log(result.data)
          if (!result.data.ok) return this.$message.error(result.data.message)
          app.currentUser = result.data.data
          this.$router.push('/')
        }).catch((err) => {
          console.error('login error:', err)
          this.$message.error('Login error!!!')
        })
      })
    }
  }
}
</script>
