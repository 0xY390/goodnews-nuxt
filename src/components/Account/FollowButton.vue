<template>
  <div class="follow-button">
    <a-button
      v-if="!modelValue"
      @click.stop="follow"
      type="primary"
      :loading="loading"
    >
      {{ t('account.following') }}
    </a-button>
    <a-button v-else @click.stop="unFollow" :loading="loading">
      {{ t('account.unFollow') }}
    </a-button>
  </div>
</template>
<script setup>
import { follow as followApi, unfollow as unfollowApi } from '@/api/account'
const { t } = useI18n()
const props = defineProps({
  accountId: {
    type: [String, Number],
    default: ''
  }
})
const loading = ref(false)
const modelValue = defineModel()

async function follow() {
  loading.value = true

  await followApi({ account_id: props.accountId }).finally(() => {
    loading.value = false
  })

  modelValue.value = true
}

async function unFollow() {
  loading.value = true
  await unfollowApi({ account_id: props.accountId }).finally(() => {
    loading.value = false
  })

  modelValue.value = false
}
</script>
