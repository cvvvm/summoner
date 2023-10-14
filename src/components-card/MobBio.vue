<template>
  <!-- attributes -->
  <div class="flex gap-1">
    <p class="label">
      {{ props.size }} {{ props.type.toLowerCase() }}
    </p>
    <p class="label">
      {{ props.alignment }}
    </p>
    <p class="label">
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
