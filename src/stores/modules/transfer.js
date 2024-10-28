import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTransferStore = defineStore('transfer', () => {
  const roleId = ref('')
  const roleName = ref('')
  const notificationsNum = ref(0)
  const followRequestsNum = ref(0)
  const manuallyApprovesFollower = ref(0)

  const setRoleId = data => {
    roleId.value = data
  }
  const setRoleName = data => {
    roleName.value = data
  }
  const setNotificationsNum = data => {
    notificationsNum.value = data
  }
  const setFollowRequestsNum = data => {
    followRequestsNum.value = data
  }
  const setManuallyApprovesFollower = data => {
    manuallyApprovesFollower.value = data
  }

  return {
    roleId,
    roleName,
    notificationsNum,
    followRequestsNum,
    manuallyApprovesFollower,
    setRoleId,
    setRoleName,
    setNotificationsNum,
    setFollowRequestsNum,
    setManuallyApprovesFollower
  }
},
  {
    persist: true
  }
)
