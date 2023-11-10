<template>
  <div
    class="grid grid-cols-1 gap-1
            justify-items-center
            p-1 rounded-xl
            bg-neutral-800
            border"
    :class="numDiceToRoll > 0 ? 'border-orange-500' : 'border-neutral-800'"
  >
    <button
      class="w-full
            px-2 rounded-lg
            bg-neutral-600"
      @click="
        $emit('rollSingleDie')"
    >
      d{{ props.dieType }}
    </button>

    <!-- input buttons container -->
    <!------------------------------------------------>
    <div class="grid grid-cols-[1fr,50px,1fr] gap-1">
      <button
        class="py-1 px-3 rounded-lg text-neutral-950 bg-neutral-500"
        @click="numDiceToRoll > 1 ? numDiceToRoll-- : numDiceToRoll = 0; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
      >
        -
      </button>
      <!-- input number -->
      <input
        v-model="numDiceToRoll"
        type="number"
        class="w-full
      rounded-md
      border border-solid border-neutral-950
      hover:border-neutral-400
      bg-neutral-950
      text-center hover:text-neutral-100"
        @change="$emit('updateDiceNum', {type: props.dieType, num: numDiceToRoll})"
      >
      <button
        class="py-1.5 px-3 rounded-lg text-neutral-950 bg-neutral-500"
        @click="numDiceToRoll++; $emit('updateDiceNum', { type: props.dieType, num: numDiceToRoll })"
      >
        +
      </button>
    </div>
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
