<template>
  <!-- values + attack button container -->
  <div
    class="grid grid-cols-[1fr_.25fr] gap-2
        rounded-md"
  >
    <!-- values container -->
    <div
      class="grid grid-cols-[90px_1fr] gap-4
          place-items-center
          px-4 pt-2 pb-3 rounded-lg
          bg-neutral-950
          overflow-clip"
    >
      <!-- hit col -->
      <div class="text-sm font-light">
        <span>hit: </span>
        <span class="text-lg text-amber-400">{{ hitResult }}</span>
      </div>

      <!-- dmg col -->
      <div class="text-sm font-light">
        <span>dmg: </span>
        <span class="text-lg text-amber-400">{{ dmgResult }}</span>
      </div>
    </div>

    <!-- atk roll button -->
    <button
      class="warn hover:text-red-200 hover:bg-red-600 active:text-red-200 active:bg-red-700"
      @click="rollAttackDmg(props.dice, numDmgs, props.dmgMod, props.hitMod)"
    >
      attack
    </button>
  </div>
  <!-- MATH CONTAINER -->
  <!------------------------------------------------>
  <div
    class="grid grid-cols-1
            gap-8 gap-y-2
            pt-2 pl-2
            "
  >
    <!-- hit roll -->
    <div class="flex text-sm text-neutral-500">
      hit:<span
        class="px-1 mr-1 bg-neutral-950 self-start"
      >1d20</span>{{ hitRollMath }}
    </div>

    <!-- dmg roll -->
    <div class="flex flex-row flex-wrap text-sm text-neutral-500 overflow-x-hidden">
      dmg:<span
        v-for="roll in props.dice"
        :key="roll"
        class="px-1 mr-1 bg-neutral-950 self-start"
      >{{ roll }}</span>{{ dmgRollMath }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '../functions/funcDiceRolls'

const dmgResult = ref(0)
const dmgRollMath = ref('')
const hitResult = ref(0)
const hitRollMath = ref('')
const props = defineProps({
  hitMod: { type: Number, default: 0 },
  dice: { type: Array, default: () => [] },
  dmgMod: { type: Number, default: 0 }
})

const numDmgs = props.dice.length

function rollAttackDmg (diceArray, numDmgs, rollDmgMod, rollAtkMod) {
  const dmgRoll = mobFunctions.sumDmg(diceArray, numDmgs, rollDmgMod)
  const hitRoll = mobFunctions.rollDice(1, 20, rollAtkMod)
  hitResult.value = hitRoll[0]
  hitRollMath.value = hitRoll[1]
  dmgResult.value = dmgRoll[0]
  dmgRollMath.value = dmgRoll[1]
}
</script>

<style>
</style>
