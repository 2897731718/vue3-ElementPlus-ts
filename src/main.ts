import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'

import router from './router'
import store from './store'

const app = createApp(App)
app.use(ElementPlus)
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
