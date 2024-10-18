import { defineStore } from 'pinia';

export const useArticleStore = defineStore('articleStore', () => {
  const readArticleIds = ref([])
  const addArticleId = (id) => {
    if (!readArticleIds.value.includes(id)) {
      readArticleIds.value.push(id)
    }
  }
  const clearArticleIds = () => {
    readArticleIds.value = []
  }
  return {
    readArticleIds,
    addArticleId,
    clearArticleIds
  }
})
