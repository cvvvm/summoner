<template>
  <!-- LANGUAGES -->
  <div class="flex flex-wrap gap-2 items-center">
    <span class="text-sm py-0.5 px-2 bg-zinc-900">languages: </span>
    <span
      v-if="lang"
      class="text-sm text-zinc-200"
    >{{ props.lang.toLowerCase() }}</span>
    <span
      v-if="!lang"
      class="text-sm text-zinc-200"
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
