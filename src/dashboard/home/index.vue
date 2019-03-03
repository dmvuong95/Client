<template>
  <el-container style="width: 100%; height: 100%;">
    <el-aside style="width: fit-content;"><nav-bar></nav-bar></el-aside>
    <el-container style="height: 100%; display: flex; flex-direction: column;">
      <header-custom></header-custom>
      <el-main style="padding: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// import app from '@/app'
// import axios from 'axios'

import navBar from './NavBar/index'
import headerCustom from './Header/index'
export default {
  components: {
    navBar,
    headerCustom
  }
}
</script>
