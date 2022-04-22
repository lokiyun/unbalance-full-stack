<script setup lang="ts">




</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router
        >
          <el-menu-item index="/user" >
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/">
            <span>Navigator Two</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
