import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNotificationsNumStore = defineStore('notificationsNum', () => {
  const notificationsNum = ref({
    notifications: 0,
    direct_messages: 0,
    follow_requests: 0
  })

  const getNotificationsNum = computed(() => notificationsNum.value)

  const setNotificationsNum = (newNotificationsNum) => {
    notificationsNum.value = newNotificationsNum
  }

  return { notificationsNum, getNotificationsNum, setNotificationsNum }
})
