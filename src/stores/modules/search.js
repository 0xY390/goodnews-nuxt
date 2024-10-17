import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const history = ref([])

  const searchHistory = info => {
    if (history.value.length.length > 10) {
      history.value.pop()
    }
    history.value.unshift(info)
  }

  const removeHistory = index => {
    history.value.splice(index, 1)
  }

  const removeAll = () => {
    history.value = []
  }

  return { history, searchHistory, removeHistory, removeAll }
})
