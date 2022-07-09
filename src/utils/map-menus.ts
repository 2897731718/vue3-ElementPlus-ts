import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

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
  // vite
  const routeFiles = import.meta.globEager('@/router/main/**/*.ts')
  // console.log(routeFiles)
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
        // 用于保留第一次遍历到的路径 相当于后端传过来的第一个值
        if (!firstMenu) {
          // 刚开始定义为 null 那么存完之后就不会执行了
          firstMenu = menu
        }
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
// 收集面包屑的函数
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  // console.log(userMenus, currentPath)
  for (const menu of userMenus) {
    // 1 代表外层 会递归遍历向里面查找
    if (menu.type === 1) {
      // 这里接收深层递归返回的结果
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      // 这里将最终找到的结果返回出去
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
      // 找到了 将找到的结果返回
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export { firstMenu }
