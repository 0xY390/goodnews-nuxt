import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationsNumStore = defineStore('notificationsNum', () => {
  const notificationsNum = ref(0)

  const getNotificationsNum = computed(() => notificationsNum.value)

  const setNotificationsNum = (newNotificationsNum) => {
    notificationsNum.value = newNotificationsNum
  }

  return { notificationsNum, getNotificationsNum, setNotificationsNum }
})
