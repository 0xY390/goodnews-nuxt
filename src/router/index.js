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
        },
        {
          path: '/user/:acct',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        }
      ]
    },

  ]
})

export default router
