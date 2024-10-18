export const useCacheDataStore = defineStore(
  'cacheData',
  () => {
    const accountInfo = ref({})
    const tweetList = ref({})
    const updateAccountInfo = info => {
      accountInfo.value = info
    }
    const updateTweetList = list => {
      tweetList.value = list
    }
    return { accountInfo, tweetList, updateAccountInfo, updateTweetList }
  },
  {
    persist: true,
    storage: 'session'
  }
)
