<template>
  <div class="nav-wrap">
    <el-menu default-active="1" class="el-menu-vertical-demo">
      <el-menu-item index="1">
        <el-icon>
          <setting />
        </el-icon>
        <router-link to="/dataBase"><span>DATA BASE</span></router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <el-icon>
          <Edit />
        </el-icon>
        <router-link to="/codeEdit"><span>CODE EDIT</span></router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Setting, Edit } from '@element-plus/icons-vue';
defineOptions({
  name: 'NavBlock'
});
</script>

<style lang="scss" scoped>
:deep(.el-menu-item.is-active) {
  a {
    color: #409eff;
  }
  background: #f9f9f9;
}
</style>
