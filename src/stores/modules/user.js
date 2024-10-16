import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
  })

  const getUser = computed(() => user.value)

  const setUser = (newUser) => {
    user.value = newUser
  }

  return { user, getUser, setUser }
})
