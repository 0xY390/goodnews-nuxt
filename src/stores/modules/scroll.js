import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useScrollStore = defineStore('scroll', () => {
  const scrollCache = ref({})

  const setScrollCache = (key, value) => {
    scrollCache.value[key] = value
  }

  const getScrollCache = (key) => {
    return scrollCache.value[key]
  }

  return { scrollCache, setScrollCache, getScrollCache }
})
