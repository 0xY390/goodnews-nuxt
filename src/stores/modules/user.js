import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginApi } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
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
    logout
  }
},
  {
    persist: true
  }
)
