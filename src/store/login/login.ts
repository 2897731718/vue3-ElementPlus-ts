import { Module } from 'vuex'

import {
  // accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'
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

      console.log('注册动态路由')

      // 使用公路函数获取路由映射表
      const routes = mapMenusToRoutes(userMenus)

      // 将routes => router.main.children 路由映射表添加到路由中去
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
  },
  actions: {
    // 实现登录的函数
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
    /*
    + 这个用于重新获取 state 里面的信息
    + 比如登陆完之后重新刷新 那么 userMenus 的信息就会被先清空了
      + 所以要重新调用这个函数重新获取一下 在注册 尤其是动态路由中使用
    */
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      // 用于更新路由信息
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
  },
}

export default loginModule
