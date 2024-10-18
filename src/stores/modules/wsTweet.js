export const useWsTweetStore = defineStore('wsTweet', () => {
  const state = reactive({
    home: [],
    public: [],
    local: []
  })
  const addTweet = (type, tweet) => {
    state[type].unshift(tweet)
  }

  // 丢出数据，同时清空
  const popData = (type) => {
    const data = state[type]
    state[type] = []
    return data
  }
  const getData = (type) => {
    return state[type]
  }

  const clearAll = () => {
    state.home = []
    state.public = []
    state.local = []
  }
  return { state, addTweet, popData, getData, clearAll }
})
