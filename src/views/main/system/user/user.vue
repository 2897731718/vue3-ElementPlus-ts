<template>
  <div class="user">
    <page-search :search-form-config="searchFormConfig" />
    <page-content
      :content-table-config="contentTableConfig"
      :res-data="resData"
      page-name="users"
    ></page-content>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

let resData = reactive({
  dataList: [],
  dataCount: 0,
})

axios.get('mock/system/getUserList').then((res) => {
  let user = res.data.data.user
  resData.dataList = user
  resData.dataCount = user.length
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
