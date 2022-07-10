<template>
  <div class="hy-table">
    <!-- data  -->
    <el-table :data="props.dataList" border style="width: 100%">
      <!-- key 用于绑定做唯一识别  -->
      <template v-for="propItem in props.configList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <!-- 使用插槽 propItem 包含 label prop min-width slotName -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  dataList: {
    type: Array,
    required: true,
  },
  // 配置参数 config.ts 中
  configList: {
    type: Array as any,
    required: true,
  },
})
console.log(props.dataList, 'data')
console.log(props.configList, 'con')
</script>

<style scoped></style>
