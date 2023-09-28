<template>
  <div
    class="val-container"
  >
    <!-- HP VALUE -->
    <div>health</div>
    <div
      class="val-lg"
      :style="{color: HPcolor}"
    >
      {{ props.baseHp - hpChange }}
    </div>

    <!-- HP toggles -->
    <div
      class="hp-buttons-container"
      @click="checkHP()"
    >
      <button
        class="hp-button"
        @click.exact="dmgMob(1)"
        @click.shift="dmgMob(5)"
      >
        -1
      </button>
      <button
        class="hp-button"
        @click.exact="healMob(1)"
        @click.shift="healMob(5)"
      >
        +1
      </button>
      <button
        v-show="!isDead"
        class="hp-button kill"
        @click="hpChange = props.baseHp"
      >
        KILL
      </button>
      <button
        v-show="isDead"
        class="hp-button revive"
        @click="hpChange = 0"
      >
        REVIVE
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const hpChange = ref(0)
const HPcolor = ref('white')
const isDead = ref(false)
const isHPBonus = ref(false)
const isHPLow = ref(false)
const isHPcrit = ref(false)

const props = defineProps({
  baseHp: { type: Number, default: 0 }
})

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
  hpChange.value = hpChange.value - amountHeal
}
function dmgMob (amountDmg) {
  hpChange.value = hpChange.value + amountDmg
}
function checkHP () {
  /* bonus HP */ if (hpChange.value < 0) {
    isHPBonus.value = true
    isHPLow.value = false
    isHPcrit.value = false
    isDead.value = false
    HPcolor.value = 'var(--HP-bonus)'
  } /* dead */ else if (hpChange.value >= props.baseHp) {
    isHPBonus.value = false
    isHPLow.value = false
    isHPcrit.value = false
    isDead.value = true
    hpChange.value = props.baseHp
    HPcolor.value = 'var(--HP-crit)'
  } /* low */ else if (hpChange.value >= (props.baseHp * 0.6) && hpChange.value < (props.baseHp * 0.8)) {
    isHPBonus.value = false
    isHPLow.value = true
    isHPcrit.value = false
    isDead.value = false
    HPcolor.value = 'var(--HP-low)'
  } /* critical */ else if (hpChange.value >= (props.baseHp * 0.8)) {
    isHPBonus.value = false
    isHPLow.value = false
    isHPcrit.value = true
    isDead.value = false
    HPcolor.value = 'var(--HP-crit)'
  } else {
    isHPBonus.value = false
    isHPLow.value = false
    isHPcrit.value = false
    isDead.value = false
    HPcolor.value = 'white'
  }
}
</script>

<style>
.hp-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  margin-top: var(--space-xs);
}

.hp-button {
  font-weight: 600;
  padding: var(--space-xs) var(--space-md);
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
