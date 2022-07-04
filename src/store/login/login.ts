import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from '@/service/login/login'
import localCache from '@/utils/cache'
import router from '@/router'

import { IAccount } from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      console.log(state.userMenus)
    },
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      // const loginResult = await accountLoginRequest(payload)
      // const { id, token } = loginResult.data
      // commit('changeToken', token)
      // localCache.setCache('token', token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById()
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo.data)
      localCache.setCache('userInfo', userInfo.data)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId()
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus.data)
      localCache.setCache('userMenus', userMenus.data)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule
