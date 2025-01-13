<template>
  <!-- attributes -->
  <div class="flex flex-wrap gap-2">
    <p class="label">
      {{ props.size }}
      {{ props.type.toLowerCase() }}
    </p>
    <p class="label">
      {{ props.alignment ? props.alignment : 'unaligned' }}
    </p>
    <p class="label">
      CR {{ props.challengeRating }}
    </p>
  </div>
</template>
<script setup>
const props = defineProps( {
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  challengeRating: { type: Number, default: 0 }
} )

</script>

<style>
</style>
