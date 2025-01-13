<template>
  <!-- roller card -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- bottom-20 sm:bottom-[5.5rem] [@media(min-width:1150px)]:bottom-4 -->
  <div
    class="
    pointer-events-none
    fixed z-[8000]
    top-0 bottom-0 left-0 right-0 [@media(min-width:500px)]:right-auto
    flex items-center
    pl-2 xs:pl-4"
  >
    <div
      class="
      pointer-events-auto
      relative
      grid gap-2
      max-w-[250px]
      p-3 rounded-[2.25rem]
      bg-neutral-950
      border-2 border-solid border-orange-600
      transition-[height_200ms_ease-in-out]"
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

      <!-- roll math -->
      <!------------------------------------------------>
      <div
        class="
      overflow-x-auto
      col-span-full
      h-min w-full
      px-4 py-2 rounded-xl
      text-sm break-normal whitespace-nowrap
      bg-neutral-950"
      >
        {{ diceRollMath }}
      </div>
      <!-- buttons container -->
      <div
        class="
        grid grid-cols-[1fr,min-content] gap-2
        col-span-full
        p-2 rounded-full
        bg-neutral-700"
      >
        <!-- roll dice button -->
        <button
          class="
          justify-items-center
          py-2 px-4 rounded-xxxl
          text-neutral-950 hover:text-neutral-950 active:text-neutral-950
          bg-neutral-400 hover:bg-neutral-500 active:bg-neutral-600"
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
    </div>
  </div>
</template>

<script setup>
import { mobFunctions } from '../functions/funcDiceRolls'
import { ref, reactive } from 'vue'
import InputNumDice from './InputNumDice'

const forceRefeshKey = ref( 0 )
const diceRollResult = ref( 0 )
const diceRollMath = ref( 'waiting...' )
const diceToRoll = reactive( { 4: 0, 6: 0, 8: 0, 10: 0, 12: 0, 20: 0, 100: 0 } )

// use this instead??
// eslint-disable-next-line
const diceToRoll2 = reactive( {
  4: { num: 0, result: 0, math: '' },
  6: { num: 0, result: 0, math: '' },
  8: { num: 0, result: 0, math: '' },
  10: { num: 0, result: 0, math: '' },
  12: { num: 0, result: 0, math: '' },
  20: { num: 0, result: 0, math: '' },
  100: { num: 0, result: 0, math: '' }
} )

// reset dice values
function resetDice () {
  forceRefeshKey.value += 1
  Object.keys( diceToRoll ).forEach( die => {
    diceToRoll[die] = 0
  } )
  diceRollMath.value = 'dice reset!'
  setTimeout( () => {
    diceRollMath.value = 'waiting...'
  }, '1000' )
}

// update diceToRoll obj
function updateDiceNums ( e ) {
  diceToRoll[e.type] = e.num
}

// roll all dice
function rollAllDice () {
  const currentRollMath = []
  // roll each die if value
  Object.keys( diceToRoll ).forEach( die => {
    const numDice = diceToRoll[die]
    if ( numDice !== 0 ) {
      const dieValue = die
      currentRollMath.push( numDice + 'd' + die )
      currentRollMath.push( mobFunctions.rollDice( numDice, dieValue ) )
    }
  } )
  diceRollResult.value = 0
  // update values if dice selected
  if ( currentRollMath.length === 0 ) diceRollMath.value = 'no dice selected!'
  else diceRollMath.value = currentRollMath
}

// roll single die
function rollSingleDie ( dieType ) {
  diceRollMath.value = '1d' + dieType + ': ' + mobFunctions.rollDice( 1, dieType )[0]
}

</script>

<style>
/* dice roller modal */
.dice-roller-leave-active {
  transition: transform 150ms ease-out,
              scale 200ms ease-out,;
}
.dice-roller-enter-active {
  transition: transform 175ms ease-out,
              scale 200ms ease-out,;
}
.dice-roller-leave-to,
.dice-roller-enter-from {
  transform: translateX(-150%);
  scale:     .8;
}
</style>
