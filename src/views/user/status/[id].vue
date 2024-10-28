<script setup>
import {
  getTweetDetail,
  getTweetContext,
  replyToTweet,
  getTweetReplyList
} from '@/api/tweet'
import { useUserStore } from '@/stores'
import { useLoginModalStore } from '@/stores'

import useScroll from '@/hooks/useScroll.js'
import { useCacheDataStore } from '@/stores'
import { computed } from 'vue'
import { ref } from 'vue'
import { watchEffect } from 'vue'
const { t } = useI18n()

const route = useRoute()
const cacheDataStore = useCacheDataStore()
const { tweetList: tweetListStore } = storeToRefs(cacheDataStore)
const id = computed(() => route.params.id)
const params = computed(() => ({
  acct: route.params.acct,
  id: id.value
}))

const p1 = () => {
  const detail = tweetListStore.value?.[id.value]
  console.log(`output->detail`, detail)
  if (!detail) {
    return getTweetDetail(params.value)
  }
  return detail
}
const p2 = () => {
  return getTweetContext(id.value)
}

const tweetList = ref([])
;(async () => {
  const [p1res, p2res] = await Promise.all([p1(), p2()])
  const result = [...(p2res?.ancestors || []), p1res]
  result.reduce((acc, item, index) => {
    item.replyLineBottom = index !== result.length - 1
    item.replyLineTop = index !== 0
    acc[item.id] = item
    return acc
  }, {})
  tweetList.value = result
  getList()
})()
watchEffect(async () => {
  tweetList.value // 监听tweetList的变化
  await nextTick()
  try {
    // 自动滚动至当前推文
    const mainTop = mainDom.value?.offsetTop
    const currentTweet = tweetDomList.value[id.value]
    const top = currentTweet?.offsetTop - mainTop

    useScroll().toScroll(top)
  } catch (error) {
    console.log(`拦截报错`, error)
    // console.log(error);
  }
})

const tweetDomList = ref({})
const mainDom = ref(null)
onMounted(async () => {
  await nextTick()
  const res = await getTweetDetail(params.value)
  tweetListStore.value = {
    ...tweetListStore.value,
    [id.value]: res
  }
})

const replyEditorMaxLength = computed(() => {
  const max = 500
  const acct = `@${route.params.acct} `
  const acctLength = acct.length
  return max - acctLength
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const loginModalStore = useLoginModalStore()
const replyTweet = ref('')
const tweetByReplyLoading = ref(false)

const sendTweetByReply = async () => {
  console.log(userInfo)
  if (!userInfo.value) {
    loginModalStore.openLoginModal()
    return
  }

  tweetByReplyLoading.value = true
  const content = `@${route.params.acct} ${replyTweet.value}`

  const params = {
    content: content,
    reply_to_id: id,
    is_sensitive: false,
    attachments: []
  }

  const newReplyTweet = await replyToTweet(params).finally(() => {
    tweetByReplyLoading.value = false
  })

  replyTweetList.value.unshift(newReplyTweet)

  replyTweet.value = ''
}

const replyTweetList = ref([])
const tweetFinished = ref(false)
const tweetLoading = ref(false)
const maxId = ref('')
const getList = async max_id => {
  const getParams = () => {
    if (!!max_id) {
      return { max_id }
    }
    return {}
  }
  tweetLoading.value = true
  const res = await getTweetReplyList(params.value, getParams()).finally(() => {
    tweetLoading.value = false
  })
  console.log(`output->re11`, res)
  tweetFinished.value = res.data.length < 30
  replyTweetList.value.push(...res.data)
}
const getReplyTweetListData = () => {
  if (replyTweetList.value?.length > 0) {
    maxId.value =
      replyTweetList.value[replyTweetList.value.length - 1]?.id || ''
    // 刷新数据
    getList(maxId.value)
  }
}

provide('tweetMode', ref('detail'))

const tweetUpdate = e => {
  const item = tweetList.value.find(item => item.id === e.id)
  if (item) {
    Object.assign(item, e)
  }
}
</script>

<template>
  <div class="status-view">
    <PageHeader>{{ t('public.tweet') }}{{ t('common.detail') }}</PageHeader>
    <div class="main" ref="mainDom">
      <template v-for="(item, i) in tweetList" :key="item.id">
        <div
          class="tweet-item"
          :ref="el => (tweetDomList[item.id] = el)"
          :id="item.id"
        >
          <tweetMessage :status="item" :index="i" @reTweet="tweetUpdate" />
        </div>
      </template>

      <div class="reply-handle">
        <div class="mention">
          <a-tag color="arcoblue">@{{ route.params.acct }}</a-tag>
        </div>
        <a-textarea
          v-model="replyTweet"
          :placeholder="t('tweet.writeYourComment')"
          allow-clear
          :max-length="replyEditorMaxLength"
          show-word-limit
          :auto-size="{
            minRows: 3
          }"
        />
        <div style="text-align: right">
          <a-button
            type="primary"
            :loading="tweetByReplyLoading"
            @click="sendTweetByReply"
            >{{ t('tweet.comment') }}</a-button
          >
        </div>
      </div>
    </div>
    <div class="replyList">
      <TweetMessages
        viewKey="local"
        :tweetList="replyTweetList"
        :loading="tweetLoading"
        @load="getReplyTweetListData"
        :finished="tweetFinished"
        class="replyTweetsList"
      ></TweetMessages>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.replyList {
  min-height: 800px;
}
.reply-handle {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
