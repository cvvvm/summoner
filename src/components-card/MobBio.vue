<template>
  <!-- attributes -->
  <div class="flex place-content-between gap-1 label">
    <p>
      {{ props.size }} {{ props.type.toLowerCase() }}
    </p>
    <p>
      {{ props.alignment }}
    </p>
    <p>
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
