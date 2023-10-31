<template>
  <!-- page placement container -->
  <div
    class="fixed right-0 bottom-0 z-10
            grid grid-cols-1 gap-2
            justify-items-end
            w-full max-w-[600px]
            p-2"
  >
    <Transition name="dice-roller">
      <!-- roller card -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <div
        v-show="diceRollerOpen"
        class="z-40
            grid grid-cols-7 items-center justify-between
            gap-x-2 gap-y-4
            flex-grow
            p-4 rounded-xl
            border border-solid border-yellow-500
            bg-neutral-900"
      >
        <div
          v-for="die in diceTypes"
          :key="die"
        >
          <InputNumDice
            :key="forceRefeshKey"
            :die-type="die"
            @update-dice-num="updateDiceNums"
            @roll-single-die="rollSingleDie(die)"
          />
        </div>

        <!-- buttons + math container -->
        <div
          class="flex gap-2
                  col-span-full"
        >
          <!-- reset dice button -->
          <button
            class="flex justify-center
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
            class="py-2 px-4 rounded-md"
            @click="rollAllDice"
          >
            roll
          </button>
        </div>
      <!-- end buttons + math container -->
      </div> <!-- end roller card -->
    </Transition>

    <!-- toggle open/close button -->
    <!------------------------------------------------>
    <Transition name="dice-roller">
      <button
        class="z-50 p-3 mr-1 mb-3 rounded-xl text-yellow-950 bg-yellow-600"
        @click="toggleDiceRoller"
      >
        <svg
          v-show="!diceRollerOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
          />
        </svg>
        <svg
          v-show="diceRollerOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { mobFunctions } from '../mobFunctions'
import { ref, reactive } from 'vue'
import InputNumDice from './InputNumDice'

const forceRefeshKey = ref(0)
const diceRollerOpen = ref(true)
const diceRollResult = ref(0)
const diceRollMath = ref('waiting...')
const diceTypes = [4, 6, 8, 10, 12, 20, 100]
// const diceToRoll = reactive({ 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0, 100: 0 })
const diceToRoll = reactive({ 4: 4, 6: 0, 8: 0, 10: 2, 12: 0, 20: 0, 100: 1 })

// toggle open/close
function toggleDiceRoller () {
  diceRollerOpen.value = !diceRollerOpen.value
}

// reset dice values
function resetDice () {
  forceRefeshKey.value += 1
  Object.keys(diceToRoll).forEach(die => {
    diceToRoll[die] = 0
  })
  diceRollMath.value = 'waiting...'
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
  diceRollMath.value = 'd' + dieType + ': ' + mobFunctions.rollDice(1, dieType)[0]
}

</script>

<style>
.dice-roller-leave-active {
  transition:
    transform 150ms ease-out,
}
.dice-roller-enter-active {
  transition:
    transform 200ms ease-out,
}
.dice-roller-leave-to,
.dice-roller-enter-from {
  transform: translateX(150%);
}
</style>
