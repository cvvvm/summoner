<template>
  <div class="flex flex-row flex-wrap gap-2">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
      class="flex gap-1 items-center"
    >
      <div
        v-if="speedVal != 0"
        class="label-val-container"
      >
        <span class="label"> {{ speedType }}</span>{{ speedVal }}
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
