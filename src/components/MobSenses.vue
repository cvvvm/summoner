<template>
  <div class="senses-container">
    <div
      v-for="(senseVal, senseType, index) in props.senses"
      :key="index"
    >
      <div class="label">
        {{ senseType.replace('_', ' ') }}:
        <span class="val-sm">
          {{ senseVal }}
        </span>
      </div>
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
        display: grid;
        gap: var(--space-sm);
    }
</style>
