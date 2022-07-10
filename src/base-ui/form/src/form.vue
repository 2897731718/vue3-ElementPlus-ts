<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:model-value="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import { IFormItem } from '../types'

// 传递过来配置的参数就行
const props = defineProps({
  // 父组件传过来的双向绑定的 value 可自定义 默认 modelValue
  modelValue: {
    type: Object,
    required: true,
  },
  // 这个接收 表单组件的配置参数
  /*
  {
    field: 'sport', // 唯一识别
    type: 'select', // 表单类型
    label: '喜欢的运动', // 左边的名称
    placeholder: '请选择喜欢的运动',
    options: [
      { title: '篮球', value: 'basketball' },
      { title: '足球', value: 'football' },
    ],
  },
  */
  formItems: {
    type: Array as PropType<IFormItem[]>,
    // 传值的时候 如果是数组或者对象 一定要使用箭头函数来做默认值
    // 就是要用一个函数使用 return 返回 箭头函数时简写 但是因为 this 的原因 箭头函数会更好用
    default: () => [],
  },
  // 设置输入框左边字体的宽度
  labelWidth: {
    type: String,
    default: '100px',
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' }),
  },
  // 响应式的布局参数
  // span 的话 默认 24 份 设置为 8 就是一行分三份
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
  },
})
/*
+ 整体流程
  + 1. 父组件 v-model 传递给 子组件
  + 2. 子组件 props 接收
  + 3. 子组件 中 把 props 与页面进行 双向绑定
  + 4. 使用 watch 监听数据变化 有变动 emit 传给父组件

*/
const emit = defineEmits(['update:modelValue'])
// 双向绑定页面接收的值 对父组件传过来的 modelValue 进行监听
// const formData = ref({ ...props.modelValue })
// 因为是父子组件双向绑定 所以使用 watch 监听数值 变化
// 如果数据变动 就要使用 emit 传递给 父组件
// watch(
//   formData,
//   (newValue) => {
//     emit('update:modelValue', newValue)
//   },
//   {
//     deep: true,
//   }
// )

const handleValueChange = (value: any, field: string) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
