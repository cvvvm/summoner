<template>
  <div class="speed-container">
    <div
      v-for="(speedVal, speedType, index) in props.speed"
      :key="index"
      class="label"
    >
      {{ speedType }}:
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
  .speed-container {
    display: flex;
    gap: var(--space-sm);
    place-items: stretch;
    place-content: stretch;
    place-self: stretch;
  }

</style>
