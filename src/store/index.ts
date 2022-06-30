import { createStore } from 'vuex'

import login from './login/login'

import { IRootState } from './types'
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

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
