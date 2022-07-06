import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
// 全局的函数 其中过滤器也可以在这里面注册
import { globalRegister } from './global'
// 引入全局 iconfont 图标
import '@/assets/font/iconfont.css'
import 'normalize.css'
import './assets/css/index.less'

import router from './router'
import store from './store'

import { setupStore } from './store'

const app = createApp(App)
app.use(ElementPlus)
app.use(globalRegister)
// 刷新后重新获取 userMenus
setupStore()

/*
+ 每次刷新都会重新执行这个文件
+ 那么就会执行 app.use(router) 获取到当前的 path
  + 这时 就会接着 去匹配路径 router.routes
  + 但是这个时候还没有执行路由守卫的 因为路由守卫是一个回调函数
    + 真正要跳转的时候才会执行
  + 那么这时候 匹配到的是 not-found
  + 所以 setupStore() 一定要在 app.use(router) 之前执行注册
*/
app.use(router)

app.use(store)
app.mount('#app')

// 测试 axios 封装
// console.log(import.meta.env.VITE_USE_MOCK)

// import hyRequest from './service'
// hyRequest
//   .request({
//     url: 'home/multidata',
//     method: 'GET',
//     headers: {},
//     interceptors: {
//       requestInterceptor: (config: any) => {
//         console.log('单独请求的config')
//         config.headers['token'] = '123'
//         return config
//       },
//       responseInterceptor: (res) => {
//         console.log('单独响应的response')
//         return res
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res)
//   })
// import axios from 'axios'
// axios.get('mock/getMenu').then((res) => {
//   console.log(res.data)
// })

const routeFiles = import.meta.globEager('@/router/main/**/*.ts')
console.log(routeFiles)
for (const path in routeFiles) {
  console.log(routeFiles[path].default.path)
}
