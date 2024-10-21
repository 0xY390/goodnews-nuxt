<script setup>
const loadingCanvas = ref(null)

onMounted(async () => {
  await nextTick()
  try {
    new rive.Rive({
      src: '/rive/loading_light.riv',
      canvas: loadingCanvas.value,
      autoplay: true
    })
  } catch (error) {}
})
</script>

<template>
  <div class="loading-canvas-block">
    <Icon icon="line-md:loading-twotone-loop" />
    <!-- <canvas ref="loadingCanvas" class="canvas"></canvas> -->
  </div>
</template>

<style scoped lang="scss">
.loading-canvas-block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 30px;
  color: rgb(var(--arcoblue-6));
  .canvas {
    width: 100px;
    margin: 0 auto;
  }
}
</style>
