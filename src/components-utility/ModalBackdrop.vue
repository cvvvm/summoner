<template>
  <div
    class="fixed
        flex-initial flex flex-wrap gap-12
        place-content-center place-items-center
        top-0 bottom-0 left-0 right-0
        max-h-full h-screen w-screen
        bg-zinc-700 bg-opacity-75"
  />

  <!-- @click.self="$emit(closeEmit)"
      @keypress.esc="$emit(closeEmit)" -->
</template>

<script setup>
defineProps({
  closeEmit: { type: String, default: '' }
})
</script>
