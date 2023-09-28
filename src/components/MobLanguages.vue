<template>
  <!-- LANGUAGES -->
  <div class="label">
    <span>languages:</span>
    <span class="val-sm">{{ props.lang.toLowerCase() }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: '' }
})
</script>

<style></style>
