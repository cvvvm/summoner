<template>
  <div
    class="grid grid-cols-1 gap-1
            justtify-items-stretch
            p-2 rounded-xl
            bg-neutral-700
            border-2
            transition-colors
            "
    :class="numDiceToRoll > 0 ? 'border-orange-500' : 'border-neutral-800'"
  >
    <button
      class="w-full
            px-2 rounded-lg
            text-sm tracking-wide
            text-orange-950 hover:text-orange-900 active:text-orange-950
            bg-orange-500 hover:bg-orange-400 active:bg-orange-500"
      @click="
        $emit('rollSingleDie')"
    >
      d{{ props.dieType }}
    </button>

    <!-- increase -->
    <button
      class="
      py-1 px-2 rounded-lg
      text-xl
      text-neutral-950 hover:text-neutral-950 active:text-neutral-950
      bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-400"
      @click="numDiceToRoll++; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
      +
    </button>
    <!-- input number -->
    <input
      v-model="numDiceToRoll"
      type="number"
      class="w-full
      py-1 rounded-md
      border border-solid border-neutral-950
      hover:border-neutral-400
      bg-neutral-950
      text-center hover:text-neutral-100"
      @change="$emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
    <!-- decrease -->
    <button
      class="
      py-1 px-2 rounded-lg
      text-xl
      text-neutral-950 hover:text-neutral-950 active:text-neutral-950
      bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-400"
      @click="numDiceToRoll > 1 ? numDiceToRoll-- : numDiceToRoll = 0; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
      -
    </button>
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
