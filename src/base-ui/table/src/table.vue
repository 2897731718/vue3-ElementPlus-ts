<template>
  <div class="hy-table">
    <el-container>
      <el-header>
        <!-- 顶部标题 -->
        <div class="header">
          <slot name="header">
            <div class="title">{{ title }}</div>
            <el-row class="row-bg" justify="end">
              <slot name="headerHandler"></slot>
            </el-row>
          </slot>
        </div>
      </el-header>
      <el-main>
        <!-- data  -->
        <el-table
          :data="props.dataList"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
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
      </el-main>
      <el-footer>
        <!-- 底部分页器 -->
        <el-row v-if="showFooter" justify="end" class="row-bg">
          <slot name="footer">
            <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :page-sizes="[10, 20, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listCount"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </slot>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  // 后台数据
  dataList: {
    type: Array,
    required: true,
  },
  // 配置参数 config.ts 中
  configList: {
    type: Array as any,
    required: true,
  },
  // 是否使用分页器
  showFooter: {
    type: Boolean,
    default: true,
  },
  // 展示分页器的 当前页数
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  // 展示分页器的跳转
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  // 总条目数
  listCount: {
    type: Number,
    default: 0,
  },
  // 当前页数 和 每页数量
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 }),
  },
})

const emit = defineEmits(['selectionChange', 'update:page'])
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value)
}
// current-change 改变时触发
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage })
}
// pageSize 改变时触发
const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize })
}
</script>

<style scoped></style>
