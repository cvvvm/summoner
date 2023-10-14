<template>
  <div class="grid gap-1">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
      class="label"
    >
      <span>{{ speedType }}:</span>
      <span class="val-sm">
        {{ speedVal }}
      </span>
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
