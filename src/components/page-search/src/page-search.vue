<template>
  <div class="page-search">
    <hy-form v-bind="props.searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">超级搜索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import HyForm from '@/base-ui/form'

const props = defineProps({
  searchFormConfig: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 双向绑定的属性应该是由配置文件的field来决定
// 1.优化一: formData中的属性应该动态来决定
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }d
  console.log(formData)
  formData.value = formOriginData
  emit('resetBtnClick')
}

// 3.优化三: 当用户点击搜索
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style scoped>
.header {
  color: rgb(66, 58, 115);
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
