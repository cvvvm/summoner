<template>
  <!-- open modal button -->
  <button
    @click="$emit('passMob', { data: name, type: 'clone' });
            console.log('clone ' + name + ' passed from button')"
  >
    clone
  </button>
</template>

<script setup>
defineEmits(['passMob'])
defineProps({
  mobIndex: { type: Number, default: 0 },
  name: { type: String, default: '' }
})

</script>

<style></style>
