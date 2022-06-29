import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path"; // 安装 @types/node -S

import importToCDN, { autoComplete } from "vite-plugin-cdn-import";
import viteCompression from "vite-plugin-compression";
import commonjs from "rollup-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    importToCDN({
      modules: [
        {
          name: "vue", // 因为依赖于 vue 所以要导入 vue 的 cdn
          var: "Vue",
          path: "https://unpkg.com/vue@next",
        },
        {
          name: "element-plus", // element-plus 的包也要一起下载 main.ts 中也要全局导入写法
          var: "ElementPlus",
          path: "https://unpkg.com/element-plus",
          css: "https://unpkg.com/element-plus/dist/index.css",
        },
        autoComplete("axios"),
        {
          name: "vue-router",
          var: "VueRouter",
          path: "https://unpkg.com/vue-router@4.0.5/dist/vue-router.global.js",
        },
      ],
    }),
    viteCompression(),
    commonjs(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      comp: resolve(__dirname, "src/components"), // vue: 'https://esm.sh/vue@3.0.6', // 'element-plus': 'https://unpkg.com/element-plus'
    },
  },
  build: {
    minify: "terser", // 更新了 esbulid 如果使用 build 一定要加上这句
    terserOptions: {
      compress: {
        // 生产环境移除 console
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
