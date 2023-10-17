<template>
  <div class="flex flex-row flex-wrap gap-3">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
      class="flex gap-1 items-center"
    >
      <span class="py-0.5 px-2 rounded-sm bg-zinc-900 text-sm">{{ speedType }}:</span>
      <span class="text-sm text-zinc-50">{{ speedVal }}</span>
    </div>
  </div>

  <!-- SPEED -->
  <!-- <div>
    <h3>speed</h3>

    <p>{{ speedType }}: {{ speedVal }}</p>
  </div> -->
</template>

<script setup>
const props = defineProps({
  speed: { type: Object, default: () => {} }
})
</script>

<style>
</style>
