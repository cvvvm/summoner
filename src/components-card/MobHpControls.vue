<template>
  <div
    class="grid grid-cols-1 grid-rows-[1fr_min-content] gap-1
    p-4 pt-2 rounded-lg
    bg-zinc-950"
    :class="HPbgColor"
  >
    <div
      class="grid grid-cols-[1fr_2fr] place-content-center place-items-center"
    >
      <!-- HP VALUE -->
      <h4 class="text-xl text-zinc-200">
        HP
      </h4>

      <!-- HP VALUE CONTAINER-->
      <div class="grid grid-cols-1 place-content-center place-items-baseline">
        <p
          :class="HPcolor"
          class="text-xl font-medium transition-colors"
        >
          {{ currHP }}<span class="text-xl text-zinc-400 font-light">/{{ props.baseHp }}</span>
        </p>
      </div>
    </div>

    <!-- math & buttons container -->
    <div
      class="grid grid-cols-[.25fr_minmax(35px,_1fr)_.25fr] gap-1 place-self-center"
      @click="checkHP()"
    >
      <button
        class="rounded-md"
        @click.exact="dmgMob(hpChange)"
      >
        -
      </button>
      <input
        v-model="hpChange"
        type="number"
        class="text-center
        px-1 rounded-md
        text-zinc-950 bg-zinc-400
          border border-zinc-500"
      >
      <button
        class="rounded-md"
        @click.exact="healMob(hpChange)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  baseHp: { type: Number, default: 0 }
})
const hpChange = ref(1)
const HPcolor = ref('text-zinc-200')
const HPbgColor = ref('bg-zinc-950')
const currHP = ref(props.baseHp)

// WIP HP CODE
/* function rollHP(x) {
  const splitVal = x.split('d')
  const numDice = parseInt(splitVal[0])
  const diceVal = parseInt(splitVal[1].split('+')[0])
  const rollMod = parseInt(splitVal[1].split('+')[1])
  // const totalHP = parseInt(mobFunctions.rollDice(numDice, diceVal, rollMod))
  return parseInt(mobFunctions.rollDice(numDice, diceVal, rollMod)) // return [totalHP, numDice, diceVal, rollMod]
} */

function healMob (amountHeal) {
  currHP.value += amountHeal
}
function dmgMob (amountDmg) {
  currHP.value -= amountDmg
}
function checkHP () {
  /* reset if less than 0 */
  if (currHP.value <= 0) currHP.value = 0
  /* bonus HP */ if (currHP.value > props.baseHp) {
    HPcolor.value = 'text-emerald-400 drop-shadow-[0px_0px_10px_teal]'
    HPbgColor.value = 'outline-2 outline outline-emerald-500' // drop-shadow-[0px_0px_4px_teal]'
  } /* dead */ else if (currHP.value < (props.baseHp * 0.2)) {
    HPcolor.value = 'text-red-500'
    HPbgColor.value = 'outline-2 outline outline-red-500'
  } /* low */ else if (currHP.value < (props.baseHp * 0.6) && currHP.value >= (props.baseHp * 0.3)) {
    HPcolor.value = 'text-yellow-500'
    HPbgColor.value = 'outline-2 outline outline-yellow-500'
  } /* critical */ else if (currHP.value < (props.baseHp * 0.3) && currHP.value >= 0.2) {
    HPcolor.value = 'text-orange-500'
    HPbgColor.value = 'outline-2 outline outline-orange-500'
  } else {
    HPcolor.value = 'text-white'
    HPbgColor.value = ''
  }
}
</script>

<style>

.hp-val-container {
  display: grid;
  grid-template-columns: 1fr;

  place-content: center;
  place-items: center;
}

.hp-button.kill {
  grid-column: span 2;
  background: var(--HP-crit);
  color: white;
}

.hp-button.revive {
  grid-column: span 2;
  background: green;
  color: white;
}
</style>
