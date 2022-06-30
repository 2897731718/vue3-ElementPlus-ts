// service统一出口
import HYRequest from './request'
// 全局环境变量
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
// 封装一个 实例
const hyRequest = new HYRequest({
  // 属性 也就是基本配置
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 拦截器
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    },
  },
})

export default hyRequest
