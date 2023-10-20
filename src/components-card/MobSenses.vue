<template>
  <div
    class="flex flex-wrap
          justify-items-start gap-2"
  >
    <div
      v-for="(senseVal, senseType, index) in props.senses.split(',')"
      :key="index"
      class="py-0.5 px-2 text-sm text-neutral-400 bg-neutral-900"
    >
      {{ senseVal.toLowerCase().replace('\'', ' ft.') }}
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
