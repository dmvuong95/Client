<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="$router.currentRoute.fullPath"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    style="height: 100%;">
    <el-menu-item index="/">
      <i class="el-icon-location"></i>
      <span>Home</span>
    </el-menu-item>
    <el-submenu index="/product">
      <template slot="title">
        <i class="el-icon-goods"></i>
        <span>Product</span>
      </template>
      <el-menu-item index="/product/category">Product category</el-menu-item>
      <el-menu-item index="/product/check">Check product</el-menu-item>
      <el-menu-item index="/product/exchange">Exchange product</el-menu-item>
    </el-submenu>
    <el-menu-item index="/check">
      <i class="el-icon-menu"></i>
      <span>Check</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
import app from '@/app'
export default {
  // data () {
  //   console.log(this.$router.currentRoute)
  //   return {}
  // },
  computed: {
    isCollapse: () => app.storeVue.NavBar.getters.isCollapse
  }
}
</script>
