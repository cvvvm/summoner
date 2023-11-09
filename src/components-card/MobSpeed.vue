<template>
  <div class="flex flex-row flex-wrap gap-1">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
      class="flex gap-1 items-center"
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
