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
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: defaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          alias: '/page-maxid-:maxid?',
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
        // 推文详情
        {
          path: '/user/:acct/status/:id',
          name: 'tweet-status',
          component: () => import('@/views/user/status/[id].vue')
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
        },
        // 过滤器模块
        {
          // 过滤器列表
          path: '/settings/adminFilters',
          name: 'settings-adminFilters',
          component: () => import('@/views/settings/adminFilters/index.vue')
        },
        {
          // 添加过滤器
          path: '/settings/adminFilters/new',
          name: 'settings-adminFilters-new',
          component: () => import('@/views/settings/adminFilters/new.vue')
        },
        {
          // 编辑过滤器
          path: '/settings/adminFilters/edit',
          name: 'settings-adminFilters-edit',
          component: () => import('@/views/settings/adminFilters/edit.vue')
        },
        {
          // 导入和导出
          path: '/settings/import',
          name: 'settings-import',
          component: () => import('@/views/settings/import/index.vue')
        },
        {
          // 导出
          path: '/settings/export',
          name: 'settings-export',
          component: () => import('@/views/settings/export/index.vue')
        },
        {
          // 运营-举报
          path: '/settings/reports',
          name: 'settings-reports',
          component: () => import('@/views/settings/report/index.vue')
        },
        {
          // 运营-用户
          path: '/settings/accounts',
          name: 'settings-accounts',
          component: () => import('@/views/settings/accounts/index.vue')
        },
        {
          // 运营-用户详情
          path: '/settings/accounts/detail/:id',
          name: 'settings-accounts-id',
          component: () => import('@/views/settings/accounts/detail/[id].vue')
        },
        {
          // 运营-关注推荐
          path: '/settings/followRecommend',
          name: 'settings-followRecommend',
          component: () => import('@/views/settings/followRecommend/index.vue')
        },
        {
          // 运营-已知实例
          path: '/settings/instances',
          name: 'settings-instances',
          component: () => import('@/views/settings/instances/index.vue')
        },
        {
          // 运营-已知实例详情
          path: '/settings/instances/detail/:domain',
          name: 'settings-instances-domain',
          component: () => import('@/views/settings/instances/detail/[domain].vue')
        },
        {
          // 运营-电子邮件域名屏蔽
          path: '/settings/emailDomainBlocks',
          name: 'settings-emailDomainBlocks',
          component: () => import('@/views/settings/emailDomainBlocks/index.vue')
        },
        {
          // 运营-电子邮件域名屏蔽-添加
          path: '/settings/emailDomainBlocks/new',
          name: 'settings-emailDomainBlocks-new',
          component: () => import('@/views/settings/emailDomainBlocks/new.vue')
        },
        {
          // 运营-ip规则
          path: '/settings/ipRules',
          name: 'settings-ipRules',
          component: () => import('@/views/settings/ipRules/index.vue')
        },
        {
          // 运营-ip规则-添加
          path: '/settings/ipRules/add',
          name: 'settings-ipRules-add',
          component: () => import('@/views/settings/ipRules/add.vue')
        },
        {
          // 队列
          path: '/settings/nsq',
          name: 'settings-nsq',
          component: () => import('@/views/settings/nsq/index.vue')
        },
        {
          // 管理-信息面板
          path: '/settings/dashboard',
          name: 'settings-dashboard',
          component: () => import('@/views/settings/dashboard/index.vue')
        },
        {
          // 管理-服务器设置
          path: '/settings/serverSetup',
          name: 'settings-serverSetup',
          component: () => import('@/views/settings/serverSetup/index.vue')
        },
        {
          // 管理-实例规则
          path: '/settings/rule',
          name: 'settings-rule',
          component: () => import('@/views/settings/rule/index.vue')
        },
        {
          // 管理-角色
          path: '/settings/role',
          name: 'settings-role',
          component: () => import('@/views/settings/role/index.vue')
        },
        {
          // 管理-角色-添加
          path: '/settings/role/new',
          name: 'settings-role-new',
          component: () => import('@/views/settings/role/new.vue')
        },
        {
          // 管理-角色-编辑
          path: '/settings/role/edit',
          name: 'settings-role-edit',
          component: () => import('@/views/settings/role/edit.vue')
        },
        {
          // 管理-中继站
          path: '/settings/relayStation',
          name: 'settings-relayStation',
          component: () => import('@/views/settings/relayStation/index.vue')
        },
        {
          // 管理-中继站-添加
          path: '/settings/relayStation/new',
          name: 'settings-relayStation-new',
          component: () => import('@/views/settings/relayStation/new.vue')
        }
      ]
    }
  ]
})

export default router
