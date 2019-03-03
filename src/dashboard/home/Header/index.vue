<template>
  <el-header style="height: 44px; position: relative; background-color: #B3C0D1; color: #333; text-align: center; line-height: 60px;">
    <el-button
      @click="changeIsCollapse"
      style="position: absolute; top: 7px; left: 7px;"
      :icon="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
      circle
      size="mini"></el-button>
    <el-dropdown
      @command="handleCommand"
      trigger="click"
      style="position: absolute; top: -8px; right: 10px;">
      <span class="el-dropdown-link" style="cursor: pointer;">
        {{currentUser.fullname}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="onLogout">Log out</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<script>
import axios from 'axios'
import app from '@/app'

export default {
  data () {
    return {
      currentUser: app.currentUser
    }
  },
  methods: {
    handleCommand (command) {
      this[command]()
    },
    onLogout () {
      this.$confirm('Are you sure to want to logout?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        axios.post('/users/logout').then((result) => {
          this.$message({
            type: 'success',
            message: 'Logged out'
          })
          app.currentUser = null
          app.requireLogin = true
          this.$router.push('/login')
        }).catch(() => {
          this.$message.error('Logout error!!!')
        })
      }).catch(() => { })
    },
    changeIsCollapse () {
      let isCollapse = !JSON.parse(this.$cookies.get('isCollapse'))
      app.storeVue.NavBar.dispatch('changeIsCollapse', isCollapse)
      this.$cookies.set('isCollapse', isCollapse)
    }
  },
  computed: {
    isCollapse: () => app.storeVue.NavBar.getters.isCollapse
  }
}
</script>
