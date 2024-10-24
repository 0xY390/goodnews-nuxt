import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import { getUserInfo } from '@/api/account'
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const getUser = computed(() => user.value)

  const userInfo = computed(() => user.value)

  const setUser = (newUser) => {
    user.value = newUser
  }

  const login = async ({ email, password }) => {

    return new Promise(async (resolve, reject) => {
      try {
        const userData = await loginApi({ email, password })
        setUser(userData.account)
        setToken(userData.token, userData.expire)
        resolve(userData)
      } catch (error) {
        reject(error)
      }
    })
  }

  const updateUserInfo = async () => {
    try {
      const res = await getUserInfo(user.value.acct);
      user.value = res.account;
      setUser(user.value, 86400)
      return res
    } catch (error) {
      console.error('Failed to update user info:', error)
    }
  }

  const logout = () => {
    user.value = null
    removeToken(null)
  }

  return {
    user,
    userInfo,
    getUser,
    setUser,
    login,
    logout,
    updateUserInfo
  }
},
  {
    persist: true
  }
)
