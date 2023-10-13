<template>
  <div
    class="grid grid-cols-1 gap-3
          p-4 rounded-lg
        bg-zinc-950"
  >
    <h1
      class="py-2
    font-med
    text-3xl text-center text-zinc-50"
    >
      {{ props.name }}
    </h1>

    <div class="grid grid-cols-2 gap-1">
      <p class="label">
        {{ props.size }} {{ props.type.toLowerCase() }}
      </p>
      <p class="label">
        {{ props.alignment }}
      </p>
      <p class="col-span-2 label">
        challenge rating: {{ props.challengeRating }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  avatar: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  challengeRating: { type: Number, default: 0 }
})

</script>

<style>
</style>
