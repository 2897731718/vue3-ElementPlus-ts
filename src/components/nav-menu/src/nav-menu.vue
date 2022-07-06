<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+TS</span>
    </div>
    <!-- 这个有 bug -->
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical"
      mode="vertical"
      :collapse="props.collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <el-sub-menu v-for="item in userMenus" :key="item.id">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group v-for="subitem in item.children" :key="subitem.id">
          <el-menu-item :index="subitem.id">{{ subitem.name }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu> -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      mode="vertical"
      :collapse="props.collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id + ''">
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subitem in item.children" :key="subitem.id + ''">
            <el-menu-item
              :index="subitem.id + ''"
              @click="handleMenuItemClick(subitem)"
              >{{ subitem.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'
// import { Location } from '@element-plus/icons-vue'

// vuex - typescript  => pinia
const props = defineProps({
  collapse: Boolean,
})

const store = useStore()
const userMenus = computed(() => store.state.login.userMenus)

// 获取当前路由路径
const router = useRouter()
const route = useRoute()
const currentPath = route.path

// 更新面包屑对应的内容
const menu = pathMapToMenu(userMenus.value, currentPath)
// 定义默认的 menu 选中 第一次进入页面 或者刷新之后 选中的 menu
console.log(menu)
/*
+ 这里有个小坑 就是 第一次进来的时候 路径是 /main
  + 那么不可能匹配到路由  返回的就是 undefined 就会报错
+ 解决方法
  + 就是匹配到 /main 的时候在进行一次重定向就行了
*/
const defaultValue = ref(menu.id + '')

const handleMenuItemClick = (item: any) => {
  console.log(item.url)
  console.log(router)
  router.push({
    path: item.url ?? '/not-found',
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :v-deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
