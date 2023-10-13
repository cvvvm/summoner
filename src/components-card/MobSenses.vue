<template>
  <div class="grid grid-cols-1 gap-1">
    <div
      v-for="(senseVal, senseType, index) in props.senses.split(',')"
      :key="index"
      class="label"
    >
      {{ senseVal.toLowerCase() }}
      <!-- <span class="val-sm"> -->
      <!-- add value when able to parse -->
      <!-- </span> -->
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  senses: { type: String, default: '' }
})
</script>

<style>
</style>
