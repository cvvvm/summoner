<template>
  <!-- values + attack button container -->
  <div
    class="grid grid-cols-[1fr_.5fr] gap-2
        rounded-md"
  >
    <!-- values container -->
    <div
      class="grid grid-cols-[90px_1fr] gap-4
          place-items-center
          px-4 pt-2 pb-3 rounded-lg
          bg-zinc-950
          overflow-clip"
    >
      <!-- hit col -->
      <div>
        hit: <span class="val-md">{{ hitResult }}</span>
      </div>

      <!-- dmg col -->
      <div>
        dmg: <span class="val-md">{{ dmgResult }}</span>
      </div>
    </div>

    <!-- atk roll button -->
    <button @click="rollAttackDmg(props.dice, numDmgs, props.dmgMod, props.hitMod)">
      attack
    </button>
  </div>
  <!-- math container -->
  <div
    class="flex gap-2 place-content-evenly
        pt-2"
  >
    <div class="text-sm text-zinc-500">
      hit {{ hitRollMath }}
    </div>
    <div class="text-sm text-zinc-500">
      dmg {{ dmgRollMath }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '../mobFunctions'
const dmgResult = ref(0)
const dmgRollMath = ref('roll')
const hitResult = ref(0)
const hitRollMath = ref('roll')
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
