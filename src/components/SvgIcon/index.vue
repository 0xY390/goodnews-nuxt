<!--
 * @Descripttion: svg-icon组件
 * @Author: Harley
 * @Date: 2023-11-23 17:38:15
 * @LastEditors: Harley
 * @LastEditTime: 2023-11-23 17:50:54
-->
<template>
  <svg :class="svgClass" v-bind="attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { defineComponent, computed, useAttrs } from 'vue'
defineComponent({
  name: 'SvgIcon'
})
const props = defineProps({
  name: { type: String, required: true },
  color: { type: String, default: '' }
})
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
const attrs = useAttrs()
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
