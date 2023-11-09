<template>
  <div
    class="flex flex-wrap
          justify-items-start gap-1"
  >
    <div
      v-for="(senseVal, senseType, index) in props.senses"
      :key="index"
      class="label-val"
    >
      <span class="label">{{ senseType.toLowerCase().replace(/_/, ' ') }}</span><span class="val">{{ senseVal }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  senses: { type: String, default: '' }
})
</script>
