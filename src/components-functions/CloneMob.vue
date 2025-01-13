<template>
  <!-- open modal button -->
  <button
    class="
    icon-btn
    hover:bg-blue-700 hover:text-emerald-200"
    @click="$emit('passMob', { data: url, type: 'clone' });
            console.log('clone ' + url + ' passed from button')"
  >
    <i class="bi bi-copy leading-none" />
  </button>
</template>

<script setup>
defineEmits( ['passMob'] )
defineProps( {
  mobIndex: { type: Number, default: 0 },
  url: { type: String, default: '' }
} )

</script>

<style></style>
