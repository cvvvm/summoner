<template>
  <div
    :class="numDiceToRoll > 0 ? 'border-orange-500' : 'border-neutral-700'"
    class="flex flex-row gap-1.5
            items-center content-center
            p-1 pr-2 rounded-full
            bg-neutral-700
            border-2
            transition-colors
            "
  >
    <button
      class="
      w-[64px] min-w-[64px]
      px-2 mr-4 rounded-xxxl
      text-sm tracking-wide
      text-orange-950 hover:text-orange-900 active:text-orange-950
      bg-orange-500 hover:bg-orange-400 active:bg-orange-500"
      @click="
        $emit('rollSingleDie')"
    >
      d{{ props.dieType }}
    </button>
    <!-- decrease -->
    <button
      class="
      py-0 px-2 rounded-xxl
      text-xl
      text-neutral-950 hover:text-neutral-950 active:text-neutral-950
      bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-400"
      @click="numDiceToRoll > 1 ? numDiceToRoll-- : numDiceToRoll = 0; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
      -
    </button>

    <!-- input number -->
    <input
      v-model="numDiceToRoll"
      class="w-full
      py-1 rounded-md
      border border-solid border-neutral-950
      hover:border-neutral-400
      bg-neutral-950
      text-center hover:text-neutral-100"
      type="number"
      @change="$emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
    <!-- increase -->
    <button
      class="
      py-0 px-2 rounded-xxl
      text-xl
      text-neutral-950 hover:text-neutral-950 active:text-neutral-950
      bg-neutral-400 hover:bg-neutral-300 active:bg-neutral-400"
      @click="numDiceToRoll++; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
    >
      +
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits( ['updateDiceNum', 'rollSingleDie'] )
const props = defineProps( {
  dieType: { type: Number, default: 0 }
} )

const numDiceToRoll = ref( 0 )
</script>
