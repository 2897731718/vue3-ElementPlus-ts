import { MockMethod } from 'vite-plugin-mock'
import { mock, Random } from 'mockjs'

import menu from './menus'
import info from './info'
import user from './main/system/user'
const dataGoods = mock({
  'list|10': [
    {
      goods: () => Random.name(),
      price: 3000,
    },
  ],
})
export default [
  {
    url: '/mock/getList',
    method: 'get',
    response: (res: any) => {
      return {
        code: 0,
        dataGoods,
      }
    },
  },
  {
    url: '/mock/getInfo',
    method: 'get',
    response: (res: any) => {
      return {
        code: 0,
        data: info,
      }
    },
  },
  {
    url: '/mock/getMenu',
    method: 'get',
    response: (res: any) => {
      return {
        code: 0,
        data: menu,
      }
    },
  },
  {
    url: '/mock/system/getUserList',
    method: 'get',
    response: (res: any) => {
      return {
        code: 0,
        data: user,
      }
    },
  },
] as MockMethod[]
