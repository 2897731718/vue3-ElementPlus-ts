import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// import localCache from '../utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

// router.beforeEach((to) => {
//   // 全局导航守卫
//   if (to.path !== '/login') {
//     const token = localCache.getCache('token')
//     if (!token) {
//       return '/login'
//     }
//   }
// })

export default router
