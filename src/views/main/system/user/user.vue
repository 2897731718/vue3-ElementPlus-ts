<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
    <div class="content">
      <!-- <hy-table :list-data="userList" :prop-list="propList">
        <template #status="scope">
          <el-button>{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="scope">
          <strong>{{ scope.row.createAt }}</strong>
        </template>
      </hy-table> -->
      <el-button @click="getChildren">获取子组件 input</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
// import HyTable from '@/base-ui/table'

import { searchFormConfig } from './config/search.config'

const formData = ref({
  id: '',
  name: '',
  password: '',
  sport: '',
  createTime: '',
})
// console.log(formData, 'user')
let test = ref({
  str: '12',
})

const getChildren = function (e: any) {
  console.log(test.value.str, 'user', e)
  test.value.str = ''
}
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
