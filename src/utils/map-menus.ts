import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.先去加载默认所有的 routes
  const allRoutes: RouteRecordRaw[] = []
  // 加载文件夹 true 会递归查找下面的文件夹

  // webpack
  // const routeFiles = require.context('../router/main', true, /\.ts/)
  // 里面是所有的 ts 文件的路径 相对于 main 的
  // .production/goods/goods.ts
  //
  // routeFiles.keys().forEach((key: string) => {
  //   // 拼接出路由使用的路径
  //   const route = require('../router/main' + key.split('.')[1])
  //   allRoutes.push(route.default)
  // })
  const routeFiles = import.meta.globEager('@/router/main/**/*.ts')
  console.log(routeFiles)
  for (const path in routeFiles) {
    allRoutes.push(routeFiles[path].default)
  }

  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// 面包屑的公共工具函数
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
