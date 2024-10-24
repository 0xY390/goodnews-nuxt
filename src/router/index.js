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
        // 用户主页
        {
          path: '/user/:acct',
          name: 'acct',
          component: () => import('@/views/user/index.vue')
        },
        {
          // 通知
          path: '/notifications',
          name: 'notifications',
          component: () => import('@/views/notifications/index.vue')
        },
        {
          // 关注请求
          path: '/followRequests',
          name: 'followRequests',
          component: () => import('@/views/followRequests/index.vue')
        },
        {
          // 消息
          path: '/message/:toId?',
          name: 'message',
          component: () => import('@/views/message/index.vue')
        },
        {
          // 消息
          path: '/dm/message/:id',
          name: 'dmMessage',
          component: () => import('@/views/message/dm.vue')
        },
        {
          // 书签
          path: '/bookmarks',
          name: 'bookmarks',
          component: () => import('@/views/bookmarks/index.vue')
        },
        {
          // 跨站时间轴
          path: '/public/common',
          name: 'public-common',
          alias: '/public/common/page-maxid-:maxid?',
          component: () => import('@/views/public/common/index.vue')
        },
        {
          // 本地时间轴
          path: '/public/local',
          name: 'public-local',
          alias: '/public/local/page-maxid-:maxid?',
          component: () => import('@/views/public/local/index.vue')
        },
        {
          // 列表
          path: '/lists',
          name: 'lists',
          component: () => import('@/views/lists/index.vue')
        },
        {
          // 列表详情
          path: '/lists/:id',
          name: 'lists-id',
          component: () => import('@/views/lists/[id].vue')
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/layout/settings.vue'),
      children: [
        {
          path: 'profile',
          name: 'settings-profile',
          component: () => import('@/views/settings/profile/index.vue')
        }
      ]
    }
  ]
})

export default router
