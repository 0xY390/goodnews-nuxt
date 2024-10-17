import { defineStore } from 'pinia'

export const useLoginModalStore = defineStore('loginModal', () => {
  const isShowLogin = ref(false)

  const openLoginModal = () => {
    isShowLogin.value = true
  }

  const closeLoginModal = () => {
    isShowLogin.value = false
  }

  return { isShowLogin, openLoginModal, closeLoginModal }
})