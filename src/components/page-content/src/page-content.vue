<template>
  <div class="page-content">
    <hy-table
      :data-list="props.dataList"
      :config-list="props.contentTableConfig.configList"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ scope.row.createAt }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ scope.row.updateAt }}</span>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import HyTable from '@/base-ui/table'

const props = defineProps({
  contentTableConfig: {
    type: Object,
    default: () => {
      // 设置默认值
    },
    require: true,
  },
  pageName: {
    type: String,
    required: true,
  },
  // 具体数据
  dataList: {
    type: Array,
    default: () => [
      // zhu
    ],
  },
})
console.log(props.dataList, 'content')
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
