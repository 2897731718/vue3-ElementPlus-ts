import { MockMethod } from 'vite-plugin-mock'
import { mock, Random } from 'mockjs'

import menu from './menus'
import info from './info'
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
        menu,
      }
    },
  },
  {
    url: '/mock/getMenu',
    method: 'get',
    response: (res: any) => {
      return {
        code: 0,
        info,
      }
    },
  },
] as MockMethod[]
