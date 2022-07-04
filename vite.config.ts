import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import * as path from 'path' // 安装 @types/node -S

import importToCDN, { autoComplete } from 'vite-plugin-cdn-import'
import viteCompression from 'vite-plugin-compression'
import commonjs from 'rollup-plugin-commonjs'

import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    importToCDN({
      modules: [
        {
          name: 'vue', // 因为依赖于 vue 所以要导入 vue 的 cdn
          var: 'Vue',
          path: 'https://unpkg.com/vue@next',
        },
        {
          name: 'element-plus', // element-plus 的包也要一起下载 main.ts 中也要全局导入写法
          var: 'ElementPlus',
          path: 'https://unpkg.com/element-plus',
          css: 'https://unpkg.com/element-plus/dist/index.css',
        },
        autoComplete('axios'),
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.0.5/dist/vue-router.global.js',
        },
      ],
    }),
    viteCompression(),
    commonjs(),
    viteMockServe({
      // default
      mockPath: './mock', // mock文件所在文件夹
      localEnabled: true, // 是否应用于本地
      prodEnabled: false, // 是否应用于生产
      supportTs: true, // 打开后 可以读取 ts 文件模块 请注意 打开后将无法监视.js 文件
      watchFiles: true, // 监视文件更改 这样更改mock的时候，不需要重新启动编译
      // configPath: './mock',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      comp: path.resolve(__dirname, 'src/components'), // vue: 'https://esm.sh/vue@3.0.6', // 'element-plus': 'https://unpkg.com/element-plus'
    },
  },
  build: {
    minify: 'terser', // 更新了 esbulid 如果使用 build 一定要加上这句
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    proxy: {
      // 用来标识哪些 接口需要跨域 使用了 api 的就会跨域
      '/api': {
        // 目标服务器地址 target + baeUrl + 路径
        target: 'http://123.207.32.32:8000/',
        // 开启代理：在本地创建一个虚拟服务器 然后这个服务器向目标服务器请求资源
        // 而浏览器请求这个本地的是同源的 不会跨域
        changeOrigin: true,
        // 这个用来去除 api
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
