<template>
  <div class="atk-container">
    <div class="atk-roll-container sub-container">
      <p>hit: <span class="val-md">{{ hitResult }}</span></p>
      <p>
        dmg: <span class="val-md">{{ dmgResult }}</span>
      </p>
      <p
        class="label"
        style="justify-content: center;"
      >
        {{ hitRollMath }}
      </p>
      <p
        class="label"
        style="justify-content: center;"
      >
        {{ dmgRollMath }}
      </p>
    </div>

    <!-- atk roll button -->
    <button @click="rollAttackDmg(props.dice, numDmgs, props.dmgMod, props.hitMod)">
      attack
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '../mobFunctions'
const dmgResult = ref(0)
const dmgRollMath = ref('dmg math')
const hitResult = ref(0)
const hitRollMath = ref('hit math')
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
.atk-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  border-radius: var(--space-sm);
  place-items: baseline stretch;
}
.atk-roll-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--space-md);
    padding: var(--space-lg);
    border-radius: var(--space-sm);
    place-items: baseline center;
}

.atk-roll-container > * {
  overflow: auto;
}
</style>
