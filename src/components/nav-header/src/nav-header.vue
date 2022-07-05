<template>
  <div class="nav-header">
    <i class="iconfont icon-menu" @click="handleFoldClick"></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isFold = ref(false)
const emit = defineEmits(['foldChange'])
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
