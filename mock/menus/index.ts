import { mock, Random } from 'mockjs'
const menu = mock([
  {
    id: 1,
    name: '系统管理',
    type: 1,
    url: '/main/system',
    icon: '',
    sort: 1,
    children: [
      {
        id: 5,
        name: 'user',
        type: 2,
        url: '/main/system/user',
        icon: '',
        sort: 5,
        children: null,
        parentId: 1,
      },
      {
        id: 2,
        name: 'department',
        type: 2,
        url: '/main/system/department',
        icon: '',
        sort: 2,
        children: null,
        parentId: 1,
      },
      {
        id: 4,
        name: 'role',
        type: 2,
        url: '/main/system/role',
        icon: '',
        sort: 4,
        children: null,
        parentId: 1,
      },
    ],
  },
  {
    id: 38,
    name: () => Random.name(),
    type: 1,
    url: '/main/analysis',
    icon: 'el-icon-monitor',
    sort: 1,
    children: [
      {
        id: 40,
        name: '核心技术',
        type: 2,
        url: '/main/analysis/dashboard',
        icon: '',
        sort: 13,
        children: null,
        parentId: 38,
      },
      {
        id: 39,
        name: '你的故事',
        type: 2,
        url: '/main/analysis/overview',
        icon: '',
        sort: 5,
        children: null,
        parentId: 38,
      },
    ],
  },
  {
    id: 10,
    name: () => Random.name(),
    type: 1,
    url: '/main/story',
    icon: 'el-icon-chat-line-round',
    sort: 4,
    children: [
      {
        id: 11,
        name: '你的物品',
        type: 2,
        url: '/main/story/chat',
        icon: '',
        sort: 2,
        children: null,
        parentId: 10,
      },
      {
        id: 12,
        name: '故事列表',
        type: 2,
        url: '/main/story/list',
        icon: '',
        sort: 4,
        children: null,
        parentId: 10,
      },
    ],
  },
])

export default menu
