<template>
  <div class="right-plane">
    <SearchLayout />
    <StartPolymerizationPanel />
    <AboutInstructions :showData="['about', 'github', 'version']" />
  </div>
</template>

<script setup>
import SearchLayout from '@/components/SearchLayout/index.vue'
import StartPolymerizationPanel from '@/components/StartPolymerizationPanel/index.vue'
import AboutInstructions from '@/components/AboutInstructions/index.vue'
</script>

<style scoped lang="scss">
.right-plane {
  max-height: 100vh;
  overflow-y: auto;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
