<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 使用 from 表单收集信息 -->
    <el-form :label-width="props.labelWidth">
      <el-row>
        <!-- 遍历配置信息 -->
        <template v-for="item in props.formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              :label="item.label"
              :rules="item.rules"
              :style="props.itemStyle"
            >
              <!-- 输入框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                />
              </template>
              <!-- 选择框 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <!-- 日期框 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  style="width: 100%"
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
import { defineProps, defineEmits, PropType, ref, watch } from 'vue'
import { IFormItem } from '../types'

// 传递过来配置的参数就行
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    // 传值的时候 如果是数组或者对象 一定要使用箭头函数来做默认值
    // 就是要用一个函数使用 return 返回 箭头函数时简写 但是因为 this 的原因 箭头函数会更好用
    default: () => [],
  },
  // 默认的 宽度
  labelWidth: {
    type: String,
    default: '100px',
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px 40px' }),
  },
  // 响应式的布局参数
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

const emit = defineEmits(['update:modelValue'])
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    console.log(newValue)
    emit('update:modelValue', newValue)
  },
  {
    deep: true,
  }
)
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;
}
</style>
