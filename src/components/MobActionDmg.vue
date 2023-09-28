<template>
  <!-- SPECIAL ABILITIES -->
  <div class="atk-roll-container sub-container">
    <button @click="rollAttackDmg(props.dmgActions, numDmgs)">
      attack
    </button>

    <p>hit: <span class="val-md">{{ hitResult }}</span></p>
    <p>dmg: <span class="val-md">{{ dmgResult }}</span></p>
    <p style="grid-column: span 3;">
      {{ dmgRollMath.replace(/\(/, '').replace(/:,/g, '\(').replace(/\,\)/g, ')').replace(/\)\,\(/g, ') + ').replace(/,/g, '+') }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '../mobFunctions'
const dmgResult = ref(0)
const dmgRollMath = ref('awaiting roll...')
const hitResult = ref(0)
// const rollAtkMath = ref('')
const props = defineProps({
  dmgActions: { type: Object, default: () => { } }
})

const numDmgs = props.dmgActions.length
function rollAttackDmg (obj, numDmgs) {
  const rolls = mobFunctions.sumDmg(obj, numDmgs)
  hitResult.value = mobFunctions.rollDice(1, 20)
  dmgResult.value = rolls[0]
  dmgRollMath.value = rolls[1] + ''
}

</script>

<style>
.atk-roll-container {
    grid-column: span 2;
    display: grid;
    grid-template-columns: .75fr 1fr 1fr;
    gap: var(--space-xl) var(--space-lg);
    padding: var(--space-lg);
    border-radius: var(--space-sm);
    place-items: baseline center;
}

.atk-roll-container > * {
  overflow: auto;
}
</style>
