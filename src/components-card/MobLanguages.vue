<template>
  <!-- LANGUAGES -->
  <div class="grid gap-2">
    <span class="label">languages: </span>
    <span
      v-if="lang"
      class="px-2 val-sm"
    >{{ props.lang.toLowerCase() }}</span>
    <span
      v-if="!lang"
      class="px-2 val-sm"
    >none spoken</span>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: '' }
})
</script>

<style>
</style>
