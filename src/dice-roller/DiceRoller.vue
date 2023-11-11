<template>
  <!-- page placement container -->
  <div
    class="
    pointer-events-none
    fixed bottom-20 sm:bottom-24 z-[9000]
    flex place-content-center place-items-center
    w-full"
  >
    <!-- roller card -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      pointer-events-auto
      grid grid-cols-2 xs:grid-cols-3
      items-center justify-between
      gap-2
      h-min w-max max-w-[300px] xs:max-w-[450px]
      p-2 rounded-xl
      border-2 border-solid border-orange-600
      bg-neutral-600"
    >
      <div
        v-for="die, name in diceToRoll2"
        :key="die"
      >
        <InputNumDice
          :key="forceRefeshKey"
          :die-type="parseInt(name)"
          @update-dice-num="updateDiceNums"
          @roll-single-die="rollSingleDie(parseInt(name))"
        />
      </div>

      <!-- buttons + math container -->
      <div
        class="
        grid grid-cols-[1fr,min-content] gap-1
        col-span-2
        pt-1"
      >
        <!-- roll math -->
        <!------------------------------------------------>
        <div
          class="
          overflow-x-auto break-normal whitespace-nowrap
          col-span-full
          h-min w-full
          px-4 py-2 rounded-md
          text-sm
          bg-neutral-950"
        >
          {{ diceRollMath }}
        </div>
        <!-- roll dice button -->
        <button
          class="py-2 px-4 rounded-xxxl justify-items-center"
          @click="rollAllDice"
        >
          roll
        </button>
        <!-- reset dice button -->
        <button
          class="icon-btn"
          @click="resetDice"
        >
          <i class="bi bi-arrow-counterclockwise" />
        </button>
      </div>
      <!-- end buttons + math container -->
    </div> <!-- end roller card -->
  </div>
</template>

<script setup>
import { mobFunctions } from '../functions/funcDiceRolls'
import { ref, reactive } from 'vue'
import InputNumDice from './InputNumDice'

const forceRefeshKey = ref(0)
const diceRollResult = ref(0)
const diceRollMath = ref('waiting...')
const diceToRoll = reactive({ 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0, 100: 0 })

// use this instead??
// eslint-disable-next-line
const diceToRoll2 = reactive({
  4: { num: 0, result: 0, math: '' },
  6: { num: 0, result: 0, math: '' },
  8: { num: 0, result: 0, math: '' },
  10: { num: 0, result: 0, math: '' },
  12: { num: 0, result: 0, math: '' },
  20: { num: 0, result: 0, math: '' },
  100: { num: 0, result: 0, math: '' }
})

// reset dice values
function resetDice () {
  forceRefeshKey.value += 1
  Object.keys(diceToRoll).forEach(die => {
    diceToRoll[die] = 0
  })
  diceRollMath.value = 'dice reset!'
  setTimeout(() => { diceRollMath.value = 'waiting...' }, '1000')
}

// update diceToRoll obj
function updateDiceNums (e) {
  diceToRoll[e.type] = e.num
}

// roll all dice
function rollAllDice () {
  const currentRollMath = []
  // roll each die if value
  Object.keys(diceToRoll).forEach(die => {
    const numDice = diceToRoll[die]
    if (numDice !== 0) {
      const dieValue = die
      currentRollMath.push(numDice + 'd' + die)
      currentRollMath.push(mobFunctions.rollDice(numDice, dieValue))
    }
  })
  diceRollResult.value = 0
  // update values if dice selected
  if (currentRollMath.length === 0) diceRollMath.value = 'no dice selected!'
  else diceRollMath.value = currentRollMath
}

// roll single die
function rollSingleDie (dieType) {
  diceRollMath.value = '1d' + dieType + ': ' + mobFunctions.rollDice(1, dieType)[0]
}

</script>

<style>
/* dice roller modal */
.dice-roller-leave-active {
  transition:
    transform 150ms ease-in,
    scale 200ms ease-in-out
    ;
}
.dice-roller-enter-active {
  transition:
    transform 200ms ease-out,
    scale 200ms ease-in-out
    ;
}
.dice-roller-leave-to,
.dice-roller-enter-from {
  transform: translateY(150%);
  scale: .9;
}
</style>
