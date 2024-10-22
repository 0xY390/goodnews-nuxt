<script setup>
import loadingIcon from '~/components/loadingIcon/index.vue'
import { getBookmarks, removeAllBookmark } from '@/api/bookmarks.js'
import { ref } from 'vue'
import { watchEffect } from 'vue'

const { t } = useI18n()

const handleCommand = key => {
  if (key === 'removeAll') {
    removeAll()
  }
}

const removeAll = async () => {
  await removeAllBookmark()
  refresh()
}

// const pullLoading = ref(false)
const state = ref({
  data: [],
  maxId: '',
  finished: false,
  loading: false,
  pullLoading: false,
  limit: 10
})
const getList = async () => {
  console.log(`output->state.value.maxId`, state.value.maxId)
  state.value.loading = true
  const getParams = () => {
    if (state.value.maxId) {
      return { max_id: state.value.maxId, limit: state.value.limit }
    }
    return { limit: state.value.limit }
  }
  const res = await getBookmarks(getParams()).finally(() => {
    state.value.loading = false
    state.value.pullLoading = false
  })
  state.value.data.push(...res.data)
  state.value.finished = res.data.length < state.value.limit
}
const onLoad = () => {
  if (tweetList.value.length) {
    state.value.maxId = tweetList.value?.[tweetList.value.length - 1].id
  }
}
watchEffect(() => {
  state.value.maxId
  getList()
})

const tweetList = computed(() => {
  return state.value?.data || []
})

const tweetUpdate = e => {
  const result = state.value.data || []
  const index = result.findIndex(item => item.status.id === e.id)
  result.splice(index, 1)
}

const onRefresh = async () => {
  state.value.pullLoading = true

  if (!maxId.value) {
    maxId.value = ''
    refresh()
    return
  }

  maxId.value = ''
}

const router = useRouter()
const route = useRoute()
const nextPageHref = computed(() => {
  const routes = router.getRoutes()
  const currentIndex = routes.find(r => r.path === route.path)
  return (
    currentIndex?.path +
    '?max_id=' +
    tweetList.value[tweetList.value.length - 1]?.id
  )
})
watchEffect(() => {
  if (route.query.max_id) {
    maxId.value = route.query.max_id || ''
  }
})
</script>

<template>
  <div>
    <div class="page">
      <PageHeader>
        {{ $t('bookmark.title') }}
        <template #right>
          <a-dropdown trigger="click" @select="handleCommand">
            <a-button type="text" shape="circle" class="dropdown-btn">
              <SvgIcon name="gengduo"></SvgIcon>
            </a-button>
            <template #content>
              <a-doption value="removeAll">
                {{ $t('bookmark.clearAllBookmarks') }}
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </PageHeader>
      <div class="content">
        <van-pull-refresh
          v-model="state.pullLoading"
          @refresh="onRefresh"
          head-height="75"
        >
          <RealList
            @reach-bottom="onLoad"
            :scrollbar="!state.finished"
            class="hashtag-list"
            :showFooter="false"
            :loading="state.loading"
          >
            <TweetMessage
              class="tweet-item"
              v-for="tweet in tweetList"
              :status="tweet.status"
              @reTweet="tweetUpdate"
              :key="tweet.id"
            >
            </TweetMessage>
          </RealList>
          <router-link :to="nextPageHref" class="nuxt-link-2">{{
            t('public.nextPage')
          }}</router-link>
          <template #loading>
            <loadingIcon></loadingIcon>
          </template>
        </van-pull-refresh>
        <div
          v-show="!tweetList?.length && !state.loading"
          class="bookmarks-null-list"
        >
          <div class="title">{{ $t('bookmark.savePostsForLater') }}</div>
          <div class="subtitle">{{ $t('bookmark.addPostsFindAgain') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nuxt-link-2 {
  display: none;
}

.content {
  .bookmarks-null-list {
    display: flex;
    padding: 12px;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 60px;

    .title {
      font-size: 31px;
      line-height: 36px;
      font-weight: 800;
      margin-bottom: 10px;
      color: rgb(var(--gray-7));
    }

    .subtitle {
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      color: rgb(var(--gray-8));
    }
  }
}
</style>
