<template>
  <div class="senses-container">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
    >
      <div class="label">
        {{ speedType }}:
        <span class="val-sm">
          {{ speedVal }}
        </span>
      </div>
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
