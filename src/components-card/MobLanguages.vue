<template>
  <!-- LANGUAGES -->
  <div class="label-val">
    <span class="label">
      languages
    </span>
    <span
      v-if="lang && lang !== '—'"
    >
      {{ props.lang.toLowerCase() }}
    </span>
    <span
      v-if="!lang || lang === '—'"
    >
      none
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  lang: { type: String, default: '' }
})
</script>

<style>
</style>
