import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useTransferStore = defineStore('transfer', () => {
  const roleId = ref('')
  const roleName = ref('')
  const notificationsNum = ref(0)
  const followRequestsNum = ref(0)
  const manuallyApprovesFollower = ref(0)

  const setRoleId = roleId => {
    roleId.value = roleId
  }
  const setRoleName = roleName => {
    roleName.value = roleName
  }
  const setNotificationsNum = notificationsNum => {
    notificationsNum.value = notificationsNum
  }
  const setFollowRequestsNum = followRequestsNum => {
    followRequestsNum.value = followRequestsNum
  }
  const setManuallyApprovesFollower = num => {
    manuallyApprovesFollower.value = num
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
