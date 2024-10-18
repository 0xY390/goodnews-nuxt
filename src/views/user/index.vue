<script setup>
import TweetMessages from '@/components/Tweet/TweetMessages.vue'
import PageHeader from '@/components/PageHeader/index.vue'
import { useUserStore, useCacheDataStore } from '@/stores'
import useLoginPipe from '@/hooks/useLoginPipe'
import defaultAvatar from '@/assets/images/default-avatar.jpg'
import mitt from '@/utils/mitt'

import { getUserInfo, getUserTweets } from '@/api/account'
import {
  followUser,
  unfollowUser,
  toggleNewStatusNotification
} from '~/api/account'
import Scroll from '@/components/Account/Scroll.vue'
const dayjs = inject('dayjs')
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const acct = route.params.acct

const cacheDataStore = useCacheDataStore()

const { accountInfo: account } = storeToRefs(cacheDataStore)

const userStore = useUserStore()

const userId = computed(() => {
  return userStore.userInfo?.id
})
const loginPipe = useLoginPipe()

const handleCommand = async key => {
  // 打开原始页面的操作不需要验证是否登录
  if (key === 'origin') {
    window.open(account.value.url, '_blank')
    return
  }
  // 是否登录
  if (!userId.value) {
    alert(t('login.login'))
    return
  }
}

// 用户头像
const userAvatar = computed(() => {
  return account.value?.avatar || defaultAvatar
})
// 背景图片
const userBanner = computed(() => {
  let style = {}
  if (account.value?.profile_image) {
    style = {
      backgroundImage: `url(${account.value?.profile_image})`
    }
  }
  return style
})

// 是否是本人的信息页面
const isSelf = computed(() => {
  return userStore.userInfo?.acct == acct
})

// 是否打开编辑资料的弹窗
const editInformation = () => {
  router.push(`/settings/profile`)
}

const followLoading = ref(false)
async function follow() {
  try {
    followLoading.value = true

    await followUser(account.value.id)

    account.value.follower = {
      notify: 0
    }
    account.value.followers_count++
    followLoading.value = false
  } catch (err) {
    followLoading.value = false
  }
}
async function unFollow() {
  followLoading.value = true

  await unfollowUser(account.value.id)

  followLoading.value = false
  account.value.follower = false
  account.value.followers_count--
}

const message = toId => {
  const isLoginFlag = loginPipe()
  if (isLoginFlag) {
    router.push(`/message/${toId}`)
  }
}

const currentTab = computed(() => route.query?.tab || 'tweets')

const getUser = () => {
  if (account.value.acct !== acct) {
    const res = getUserInfo(acct)
    return res
  }
  return { account: unref(account) }
}
let controller = new AbortController()
const getParams = () => {
  if (state.value.maxId) {
    return { type: currentTab.value, max_id: state.value.maxId }
  }
  return { type: currentTab.value }
}
const state = ref({
  tweetList: [],
  tweetLoading: false,
  tweetFinished: false,
  maxId: ''
})
const getList = () => {
  if (state.value.tweetLoading) {
    return
  }
  if (state.value.tweetList.length) {
    state.value.maxId =
      state.value.tweetList[state.value.tweetList.length - 1].id
  }
  getTimeLine(getParams())
}
const getTimeLine = async params => {
  state.value.tweetLoading = true
  const query = {
    ...params,
    type: currentTab.value || ''
  }
  const res = await getUserTweets(acct, query).finally(() => {
    state.value.tweetLoading = false
  })
  state.value.tweetList.push(...res.data)
  state.value.tweetFinished = res.data.length < 30
}
const clear = () => {
  state.value.tweetList = []
  state.value.tweetLoading = false
  state.value.tweetFinished = false
  state.value.maxId = ''
}

router.beforeEach((to, from, next) => {
  if (to.query.tab !== from.query.tab) {
    controller.abort()
  }
  next()
})

const pageType = computed(() => {
  const typeMap = {
    tweets: t('public.tweet'),
    with_replies: t('public.tweetAndReplies'),
    media: t('public.media'),
    likes: t('public.like')
  }
  return typeMap[currentTab.value]
})

// 重新渲染用户头像和背景图片
const editProfileSaveCb = async () => {
  const isSelf = userStore.userInfo?.acct === acct
  if (isSelf) {
    account.value = userStore.userInfo
  }
}
onMounted(async () => {
  mitt.on('editProfileSave', editProfileSaveCb)
  const userInfo = await getUserInfo(acct)
  account.value = userInfo.account
})
onUnmounted(() => {
  mitt.off('editProfileSave', editProfileSaveCb)
})

provide('isShowPin', true)

const tweetUpdate = e => {
  const item = state.value.tweetList || [].find(item => item.id === e.id)
  if (item) {
    Object.assign(item, e)
  }
}
// 隐藏当前推文
const hideTweet = index => {
  if (index > -1) {
    state.value.tweetList.splice(index, 1)
  }
}
const tabList = [
  { key: 'tweets', name: t('public.tweet') },
  { key: 'with_replies', name: t('public.tweetAndReplies') },
  { key: 'media', name: t('public.media') },
  { key: 'likes', name: t('public.like') }
]
const TweetMessagesRef = ref(null)

const toToggleNav = () => {
  clear()
}

const toggleNotify = async notify => {
  await toggleNewStatusNotification(acct, notify)
  account.value.follower.notify = notify
}
</script>

<template>
  <div class="pages">
    <PageHeader>{{ account.display_name || account.username }}</PageHeader>
    <section>
      <div class="bannerImage" :style="userBanner"></div>
      <div class="userinfo-block">
        <div
          class="userinfo-line"
          style="position: relative; align-items: flex-end"
        >
          <div style="height: 0">
            <div class="avatar-img">
              <a-image
                :src="userAvatar"
                :preview="false"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div class="right">
            <a-button
              shape="circle"
              v-if="!isSelf"
              @click="message(account.id)"
            >
              <Icon icon="mingcute:message-4-fill" />
            </a-button>
            <template v-if="account.follower">
              <a-tooltip
                :content="
                  t('account.notifyWhenPost', {
                    notifyWhenPost: account.display_name
                  })
                "
                v-if="account.follower?.notify === 0"
              >
                <a-button shape="circle" @click="toggleNotify(1)">
                  <Icon icon="ion:notifications-outline" />
                </a-button>
              </a-tooltip>
              <a-tooltip
                :content="
                  t('account.cancelNotifyWhenPost', {
                    cancelNotifyWhenPost: account.display_name
                  })
                "
                v-if="account.follower?.notify === 1"
              >
                <a-button shape="circle" @click="toggleNotify(0)">
                  <Icon icon="ion:notifications-sharp" />
                </a-button>
              </a-tooltip>
            </template>
            <a-button v-if="isSelf" @click="editInformation"
              >{{ t('account.editProfile') }}
            </a-button>
            <a-button
              @click="follow"
              v-else-if="!account.follower"
              :loading="followLoading"
              type="primary"
              >{{ t('account.following') }}
            </a-button>
            <a-button @click="unFollow" v-else :loading="followLoading"
              >{{ t('account.unFollow') }}
            </a-button>

            <a-dropdown
              trigger="click"
              @select="handleCommand"
              position="br"
              v-if="account.url"
            >
              <a-button type="text" shape="circle">
                <Icon icon="mingcute:more-2-fill" />
              </a-button>
              <template #content>
                <a-doption value="origin">
                  <div style="display: flex; align-items: center; gap: 10px">
                    <Icon icon="ph:link-simple-bold" />
                    {{ t('tweet.openOriginPage') }}
                  </div>
                </a-doption>
              </template>
            </a-dropdown>
          </div>
        </div>
        <div class="userinfo-line">
          <div class="username">
            <p v-account-name="account">
              {{ account.display_name || account.username }}
            </p>
            <span
              v-show="account.actor_type === 5 || account.actor_type === '5'"
              class="boot-btn"
              >{{ t('account.robot') }}</span
            >
            <span v-show="account.is_sensitive === 1" class="boot-btn">
              <Icon icon="ion:warning-outline" />
              {{ t('account.sensitiveContent') }}
            </span>
          </div>
          <div class="account-acct-area">
            <p>@{{ acct }}</p>
          </div>
          <div class="account-acct-area">
            <p v-html="account.note_rendered"></p>
          </div>
        </div>
        <div class="userinfo-line">
          <div class="calendar">
            <Icon class="icon" icon="material-symbols:calendar-month" />
            <div class="text">
              {{
                t('account.joinIn', {
                  time: $dayjs(account.created_at).format('YYYY-MM-DD HH:mm:ss')
                })
              }}
            </div>
          </div>
          <div
            class="account-fields"
            v-if="account.fields && account?.fields.length"
          >
            <div
              v-for="item in account?.fields"
              :key="item.name"
              class="account-fields-list"
            >
              <div>{{ item.name }}</div>
              <div v-html="item.value"></div>
            </div>
          </div>
        </div>
        <div class="userinfo-line">
          <div class="follow-block">
            <router-link class="router-item" :to="`/user/${acct}?tab=tweets`">
              <strong> {{ account.status_count }}&nbsp;</strong>
              {{ t('public.tweet') }}
            </router-link>
            <router-link class="router-item" :to="`/user/${acct}/follower`">
              <strong> {{ account.followers_count }}&nbsp;</strong>
              {{ t('account.follower') }}
            </router-link>
            <router-link class="router-item" :to="`/user/${acct}/following`">
              <strong> {{ account.following_count }}&nbsp;</strong>
              {{ t('account.following') }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <nav class="tab-nav">
      <router-link
        class="nav-item"
        v-for="item in tabList"
        :key="item.key"
        :class="{ active: item.key === currentTab }"
        @click="toToggleNav"
        :to="`/user/${acct}?tab=${item.key}`"
      >
        <div class="item-text">
          {{ item.name }}
        </div>
      </router-link>
    </nav>
    <section>
      <TweetMessages
        :key="currentTab"
        ref="TweetMessagesRef"
        v-if="account.id"
        :tweetList="state.tweetList"
        :loading="state.tweetLoading"
        @load="getList"
        :finished="state.tweetFinished"
        @reTweet="tweetUpdate"
        @delete="hideTweet"
      ></TweetMessages>
    </section>
  </div>
</template>

<style scoped lang="scss">
.pages {
  max-width: 581px;

  section {
    // 背景图片
    .bannerImage {
      height: 200px;
      background-color: var(--color-neutral-4);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }

    // 用户信息区域
    .userinfo-block {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px 20px 10px;
      // 头像
      .avatar-img {
        overflow: hidden;
        position: absolute;
        left: 0;
        top: -92px;
        border: 4px solid #fff;
        border-radius: 50%;
        width: 144px;
        height: 144px;

        .img-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .userinfo-line {
        display: flex;
        flex-direction: column;

        .right {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .username {
          display: flex;
          align-items: center;
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold;
          gap: 6px;

          .boot-btn {
            height: 22px;
            line-height: 12px;
            display: inline-block;
            padding: 4px 6px;
            cursor: default;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 500;
            color: var(--color-text-1);
            border: 1px solid rgb(var(--gray-6));
            color: rgb(var(--gray-6));
            display: flex;
            align-items: center;
            gap: 4px;
          }
        }

        .account-acct-area {
          display: flex;
          word-break: break-all;
          align-items: center;
          gap: 10px;
        }

        .calendar {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }

          .icon {
            font-size: 16px;
          }

          .text {
            height: 24px;
            line-height: 24px;
          }
        }

        .account-fields {
          background-color: var(--color-neutral-2);
          display: flex;
          flex-direction: column;
          margin-top: 10px;

          .account-fields-list {
            padding: 10px 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-bottom: 1px solid #ccc;

            .text-acct {
              color: rgb(var(--arcoblue-6));
            }

            &:last-child {
              border-bottom: none;
            }
          }
        }

        .follow-block {
          display: flex;
          gap: 20px;
          font-size: 15px;

          .router-item {
            display: flex;
            color: var(--color-neutral-8);
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}

.tab-nav {
  width: 100%;
  border-bottom: 1px solid var(--color-neutral-3);
  line-height: 36px;
  display: flex;

  .nav-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 8px 0;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease-out;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .item-text {
      color: var(--color-text-2);
      width: 100%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-weight: 700;
      font-size: 15px;
    }

    &:hover {
      background-color: var(--color-neutral-3);
    }

    &.active {
      &::before {
        content: ' ';
        display: block;
        background: rgb(var(--arcoblue-6));
        width: 56px;
        height: 4px;
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .item-text {
        color: var(--color-text-1);
      }
    }
  }
}

@include respond('phone') {
  .avatar-img {
    width: 80px;
    height: 80px;
  }
}
</style>
