import hyRequest from '../index'
import axios from 'axios'

import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/getInfo', // 用法: /users/1
  UserMenus = '/getMenu', // 用法: role/1/menu
}
// 登录方法 传入账号密码 发送 post 请求
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  })
}
// 如果是实际项目 需要传递用户的唯一识别 userId 来获取
export function requestUserInfoById() {
  return axios.get<IDataType>('/mock' + LoginAPI.LoginUserInfo)
}

export function requestUserMenusByRoleId() {
  return axios.get<IDataType>('/mock' + LoginAPI.UserMenus)
}
