// 1. 定义路由组件.
// 也可以从其他文件导入
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import UserManager from '../views/user-manager/index.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'home',
    component: Home, 
    children: [
      {
        path: 'user',
        component: UserManager
      },
    ]
  },
  { 
    name: 'login', 
    path: '/login', 
    component: Login,
  },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token') || ''
  // 需要将token传给服务器判断是否正确或过期
  if (token === '' || token === undefined) {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router