<template>
  <div class="flex flex-row flex-wrap gap-2">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
    >
      <div
        v-if="speedVal != 0"
        class="label-val"
      >
        <span class="label"> {{ speedType }}</span>
        <span class="val">{{ speedVal }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  speed: { type: Object, default: () => {} }
})
</script>

<style>
</style>
