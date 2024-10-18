import { createRouter, createWebHistory } from 'vue-router'
import defaultLayout from '../layout/default.vue'
import { useUserStore, useLoginModalStore } from '@/stores'

// 登录守卫
const loginGuard = () => {
  const userStore = useUserStore()
  const { user } = userStore
  const loginModalStore = useLoginModalStore()
  if (!user) {
    // 打开登录弹窗
    loginModalStore.openLoginModal()
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: defaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/index.vue'),
          // 路由守卫
          beforeEnter: (to, from, next) => {
            loginGuard()
            next()
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
