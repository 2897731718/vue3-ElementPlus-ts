<template>
  <div class="login-account">
    <el-form ref="formRef" label-width="60px" :rules="rules" :model="account">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
// 导入本地缓存模块
import localCache from '../../../utils/cache'
// 导入账号密码输入规则
import { rules } from '../config/account-config'

const store = useStore()
// 获取账号密码
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? '',
})
// 获取哪种登录方式
const formRef = ref<InstanceType<typeof ElForm>>()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.判断是否需要记住密码
      if (isKeepPassword) {
        // 本地缓存
        localCache.setCache('name', account.name)
        localCache.setCache('password', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }

      // 2.开始进行登录验证 这里的方法在 store action 中有定义 名字要相同 传入账号密码参数
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}
// 因为使用了 setup 语法糖 父组件要获取函数属性的话 就要使用这个暴露 因为没有 return 了
defineExpose({
  loginAction,
})
</script>

<style scoped></style>
