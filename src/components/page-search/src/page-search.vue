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
  // 搜索组件的 配置信息 比如用了生么表单组件等
  searchFormConfig: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 双向绑定的属性应该是由配置文件的field来决定
// 获取配置信息中的 表单配置 formItems
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
// 遍历该数组中的每一个对象 获取其中输入框中的 value 值
for (const item of formItems) {
  formOriginData[item.field] = ''
}
// 这里面监听的是输入框中所有的信息
const formData = ref(formOriginData)

// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  // for (const key in formOriginData) {
  //   formData.value[`${key}`] = formOriginData[key]
  // }d
  console.log(formData, 'search')
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
