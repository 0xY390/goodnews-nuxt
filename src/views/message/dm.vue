<script setup>
import ChatFrame from './components/ChatFrame/index.vue'
const route = useRoute()
const chatId = route.params.id
</script>

<template>
  <ChatFrame :chatId="chatId"></ChatFrame>
</template>

<style scoped lang="scss"></style>
