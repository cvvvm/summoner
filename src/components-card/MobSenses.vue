<template>
  <div
    class="flex flex-wrap
          justify-items-start gap-2"
  >
    <div
      v-for="(senseVal, senseType, index) in props.senses"
      :key="index"
      class="label-val-container"
    >
      <span class="label">{{ senseType.toLowerCase().replace(/_/, ' ') }}</span>{{ senseVal }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  senses: { type: String, default: '' }
})
</script>
