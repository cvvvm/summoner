<template>
  <!-- page placement container -->
  <div
    class="fixed bottom-0 z-8000
            flex place-content-start
            p-4"
  >
    <!-- roller card -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="grid grid-cols-7 items-center justify-between
            gap-x-2 gap-y-4
            flex-grow
            max-w-[600px]
            p-4 rounded-xl
            border border-solid border-yellow-500
            bg-neutral-900"
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
        class="flex gap-2
                  col-span-full"
      >
        <!-- reset dice button -->
        <button
          class="flex justify-center self-center
                    p-2 rounded-md
                    hover:bg-red-500 hover:text-red-950"
          @click="resetDice"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>

        <!-- roll math -->
        <!------------------------------------------------>
        <div
          class="overflow-x-auto break-normal
                flex-grow
                px-4 py-2 rounded-md
                text-sm
                bg-neutral-950"
        >
          {{ diceRollMath }}
        </div>

        <!-- roll dice button -->
        <button
          class="py-2 px-4 rounded-md self-center"
          @click="rollAllDice"
        >
          roll
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
</style>
