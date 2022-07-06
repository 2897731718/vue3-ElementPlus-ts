import { mock, Random } from 'mockjs'
const menu = mock([
  {
    id: 38,
    name: () => Random.name(),
    type: 1,
    url: '/main/analysis',
    icon: 'el-icon-monitor',
    sort: 1,
    children: [
      {
        id: 39,
        name: '你的故事',
        type: 2,
        url: '/main/analysis/overview',
        icon: 'el-icon-monitor',
        sort: 5,
        children: null,
        parentId: 38,
      },
      {
        id: 40,
        name: '核心技术',
        type: 2,
        url: '/main/analysis/dashboard',
        icon: 'el-icon-monitor',
        sort: 13,
        children: null,
        parentId: 38,
      },
      {
        id: 41,
        name: '职业技术',
        type: 2,
        url: '/main/analysis/dashboard',
        icon: 'el-icon-monitor',
        sort: 14,
        children: null,
        parentId: 38,
      },
    ],
  },
  {
    id: 42,
    name: () => Random.name(),
    type: 1,
    url: '/main/story',
    icon: 'el-icon-chat-line-round',
    sort: 4,
    children: [
      {
        id: 43,
        name: '你的物品',
        type: 2,
        url: '/main/story/chat',
        icon: 'el-icon-monitor',
        sort: 2,
        children: null,
        parentId: 42,
      },
    ],
  },
])

export default menu
