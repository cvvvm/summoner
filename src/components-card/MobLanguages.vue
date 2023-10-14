<template>
  <!-- LANGUAGES -->
  <div class="grid gap-2">
    <span class="label">languages: </span>
    <span class="px-2 val-sm">{{ props.lang.toLowerCase() }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: '' }
})
</script>

<style>
</style>
