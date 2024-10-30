<script setup>
import { registerApi } from '@/api/login'
import { useLoginModalStore } from '@/stores'
import { watchEffect } from 'vue'
const { t } = useI18n()
const loginModalStore = useLoginModalStore()
const router = useRouter()
const route = useRoute()

const countdown = ref(3)
let intervalId = null
const initCountdown = () => {
  intervalId = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(intervalId)
    }
  }, 1000)
}

const token = route.query?.token
const requesting = ref(false)
const isError = ref(false)
;(async () => {
  try {
    requesting.value = true
    const res = await registerApi(token)
    isError.value = false
  } catch (error) {
    isError.value = true
  } finally {
    requesting.value = false
  }
  if (!isError.value) {
    initCountdown()
  }
})()
watch(countdown, (newVal, oldVal) => {
  if (oldVal && newVal === 0) {
    goLogin()
  }
})

const goLogin = () => {
  router.push('/')
  loginModalStore.openLoginModal()
}

watchEffect(() => {
  if (countdown.value === 0 && intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="word-frame" v-show="!requesting">
    <svg-icon class="icons" name="logo"></svg-icon>
    <h1>
      {{
        isError
          ? t('register.activationLinkIncorrect')
          : t('register.emailVerifiedSuccess')
      }}
    </h1>
    <div>
      <a-button type="text" @click="goLogin">
        {{
          isError
            ? t('register.clickToLoginPage')
            : t('register.secondsToLogin', { count: countdown })
        }}
      </a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-spin {
  width: 800px;
  margin: auto;
  overflow: hidden;
  display: block;
  padding-top: 100px;
}
.word-frame {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  .icons {
    font-size: 180px;
  }
}
.jump-home {
  cursor: pointer;
}
</style>
