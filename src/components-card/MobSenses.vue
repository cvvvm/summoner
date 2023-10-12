<template>
  <div class="senses-container">
    <div
      v-for="(senseVal, senseType, index) in props.senses.split(',')"
      :key="index"
      class="label"
    >
      {{ senseVal.toLowerCase() }}
      <!-- <span class="val-sm"> -->
      <!-- add value when able to parse -->
      <!-- </span> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  senses: { type: String, default: '' }
})
</script>

<style>
    .senses-container {
      display: flex;
      gap: var(--space-sm);
      place-items: stretch;
      place-content: stretch;
      place-self: stretch;
    }
</style>
