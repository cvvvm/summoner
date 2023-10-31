<template>
  <div
    class="grid grid-cols-1 gap-2
            justify-items-center
            p-1 rounded-md
            bg-neutral-700
            border-2"
    :class="numDiceToRoll > 0 ? 'border-yellow-500' : 'border-neutral-700'"
  >
    <button
      class="w-full
            px-2
            bg-neutral-950
            border-2 border-solid border-neutral-950
            hover:border-yellow-500"
      @click="$emit('rollSingleDie')"
    >
      d{{ props.dieType }}
    </button>
    <input
      v-model="numDiceToRoll"
      type="number"
      class="w-full
            rounded-md
            border-2 border-solid border-neutral-800
            hover:border-neutral-500
            bg-neutral-800 bg-opacity-50
            text-center hover:text-neutral-100"
      @change="$emit('updateDiceNum', {type: props.dieType, num: numDiceToRoll})"
    >
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['updateDiceNum', 'rollSingleDie'])
const props = defineProps({
  dieType: { type: Number, default: 0 }
})

const numDiceToRoll = ref(0)
</script>
