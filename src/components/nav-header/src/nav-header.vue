<template>
  <div class="nav-header">
    <i class="iconfont icon-menu" @click="handleFoldClick"></i>
    <div class="content">
      <div>面包屑</div>
      <user-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import UserInfo from './user-info.vue'

const emit = defineEmits(['foldChange'])
const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .icon-menu {
    font-size: 24px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
