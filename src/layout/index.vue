<template>
  <el-container class="layout">
    <el-header>
      <HeaderBlock></HeaderBlock>
    </el-header>
    <el-container class="content">
      <el-aside>
        <NavBlock></NavBlock>
      </el-aside>
      <el-container class="main">
        <router-view></router-view>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup></script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-header {
    padding: 0;
    height: 64px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    box-shadow: 0px 2px 4px rgb(50 50 71 / 10%);
  }
  .content {
    .el-aside {
      width: auto;
      min-width: 200px;
      transition: all 0.3s ease;
      position: fixed;
      top: 64px;
      left: 0;
      height: 100%;
      box-shadow: 2px 4px 4px rgba(50, 50, 71, 0.08), 0px 4px 8px rgba(50, 50, 71, 0.06);
    }
    .main {
      position: fixed;
      top: 64px;
      left: 200px;
      width: 100%;
      overflow: scroll;
      padding: 20px;
      background: #f5f5f5;
    }
  }
}
</style>
