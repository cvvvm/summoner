<template>
  <!-- open modal button -->
  <button
    class="
    p-2 text-base leading-none
    hover:bg-blue-700 hover:text-emerald-200"
    @click="$emit('passMob', { data: slug, type: 'clone' });
            console.log('clone ' + slug + ' passed from button')"
  >
    <i class="bi bi-copy" />
  </button>
</template>

<script setup>
defineEmits(['passMob'])
defineProps({
  mobIndex: { type: Number, default: 0 },
  slug: { type: String, default: '' }
})

</script>

<style></style>
