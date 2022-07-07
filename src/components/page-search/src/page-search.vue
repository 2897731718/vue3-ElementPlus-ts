<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">超级搜索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true,
    },
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: '',
    })

    return {
      formData,
    }
  },
})
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
