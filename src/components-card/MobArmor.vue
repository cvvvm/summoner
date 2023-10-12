<template>
  <!-- ARMOR -->
  <div
    class="armor-container sub-container"
  >
    <!-- class -->
    <div class="val-container">
      <div>armor</div>
      <div class="val-lg">
        {{ props.armor[0].class }}
      </div>
    </div>
    <!-- desc -->
    <div class="armor-desc-container">
      <div
        v-for="type in props.armor[0].desc.split(',')"
        :key="type"
        class="label"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  armor: { type: Object, default: () => { } }
})
</script>

<style>
  .armor-container {
  /* grid-area: armor; */
  display: grid;
  grid-template-columns: min-content max-content;
  gap: var(--space-md);
  place-items: stretch;
  padding: var(--space-md);
}

.armor-desc-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--space-sm);
}
</style>
