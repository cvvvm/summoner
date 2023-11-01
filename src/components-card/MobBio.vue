<template>
  <!-- attributes -->
  <div class="flex flex-wrap gap-2">
    <p class="py-0.5 px-2 bg-neutral-900">
      {{ props.size }} {{ props.type.toLowerCase() }}
    </p>
    <p class="py-0.5 px-2 bg-neutral-900">
      {{ props.alignment ? props.alignment : 'unaligned' }}
    </p>
    <p class="py-0.5 px-2 bg-neutral-900">
      challenge: {{ props.challengeRating }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  challengeRating: { type: Number, default: 0 }
})

</script>

<style>
</style>
