<template>
  <!-- LANGUAGES -->
  <div class="flex flex-wrap gap-2 items-center">
    <span class="text-sm py-0.5 px-2 bg-neutral-900">languages: </span>
    <span
      v-if="lang && lang !== '—'"
      class="text-sm text-neutral-200"
    >{{ props.lang.toLowerCase() }}</span>
    <span
      v-if="!lang || lang === '—'"
      class="text-sm text-neutral-200"
    >none</span>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: '' }
})
</script>

<style>
</style>
