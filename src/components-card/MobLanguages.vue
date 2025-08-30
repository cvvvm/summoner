<template>
  <!-- LANGUAGES -->
  <div class="label-val">
    <span class="label">
      languages
    </span>
    <span
      v-if="lang && lang !== '—'"
      class="val"
    >
      {{ props.lang }}
    </span>
    <span
      v-if="!lang || lang === '—'"
      class="val"
    >
      none
    </span>
  </div>
</template>

<script setup>
const props = defineProps( {
  lang: { type: String, default: '' }
} )
</script>

<style>
</style>
