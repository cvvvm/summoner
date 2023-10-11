<template>
  <div class="senses-container">
    <div
      v-for="(senseVal, senseType, index) in props.senses"
      :key="index"
      class="label"
    >
      {{ senseType.replace('_', ' ') }}:
      <span class="val-sm">
        {{ senseVal }}
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  senses: { type: Object, default: () => { } }
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
