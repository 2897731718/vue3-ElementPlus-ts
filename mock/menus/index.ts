import { mock, Random } from 'mockjs'
const menu = mock({
  'menu|2': [
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
          name: '核心技术',
          type: 1,
          url: '/main/analysis/overview',
          icon: 'el-icon-monitor',
          sort: 1,
          children: null,
          parentId: 38,
        },
        {
          id: 39,
          name: '核心技术',
          type: 1,
          url: '/main/analysis/dashboard',
          icon: 'el-icon-monitor',
          sort: 1,
          children: null,
          parentId: 38,
        },
      ],
    },
  ],
})

export default menu
