import { createStore, Store, useStore as useVuexStore } from 'vuex'

import login from './login/login'

import { IRootState, IStoreType } from './types'
// 总仓库
const store = createStore<IRootState>({
  state() {
    return {
      name: '',
      age: 18,
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    // 注册登录模块 仓库
    login,
  },
})
// 登录使用的方法
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// user 用来类型限制 重新封装发 useStore
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
