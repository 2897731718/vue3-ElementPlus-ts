<template>
  <div class="page-content">
    <hy-table
      v-model:page="pageInfo"
      :list-count="props.resData.dataCount"
      :data-list="props.resData.dataList"
      :config-list="props.contentTableConfig.configList"
      @selection-change="selectionChange"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="default">新建用户</el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
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
          <el-button :icon="Edit" size="small" type="primary"></el-button>
          <el-button :icon="Delete" size="small" type="danger"></el-button>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import { defineProps, defineEmits, watch, ref } from 'vue'

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
  // 后台信息数据 包括数据总数
  resData: {
    type: Object,
    default: () => {
      // dataList dataCount
    },
  },
  pageInfo: {
    type: Object,
    default: () => {
      // currentPage: 0, pageSize: 10
    },
  },
})

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 })

const emit = defineEmits([
  'update: pageInfo',
  'update: resData',
  'selectionChange',
])
watch(props.resData, () => {
  emit('update: pageInfo', props.pageInfo)
  emit('update: resData', props.resData)
})

const selectionChange = (value: any) => {
  emit('selectionChange', value)
}
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
