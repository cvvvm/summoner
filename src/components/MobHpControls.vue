<template>
  <div
    class="hp-controls-container sub-container"
  >
    <!-- HP display -->
    <div
      class="hp-display-container"
    >
      <span class="hp-display-label">HP:</span>
      <span
        class="hp-current-display"
        :style="{ color: HPcolor }"
      >
        {{ props.baseHp - hpChange }}
      </span>
    </div>

    <!-- HP toggles -->
    <div
      class="hp-buttons-container"
      @click="checkHP()"
    >
      <button
        v-show="!isDead"
        class="hp-button"
        @click.exact="dmgMob(1)"
        @click.shift="dmgMob(5)"
      >
        -1
      </button>
      <button
        v-show="!isDead"
        class="hp-button kill"
        @click="hpChange = props.baseHp"
      >
        KILL
      </button>
      <button
        v-show="!isDead"
        class="hp-button"
        @click.exact="healMob(1)"
        @click.shift="healMob(5)"
      >
        +1
      </button>
      <button
        v-show="isDead"
        class="hp-button revive"
        @click="hpChange = props.baseHp - 1"
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
.hp-controls-container {
  /* grid-area: hp; */
  display: grid;
  background: black;
  place-content: start stretch;
}

.hp-display-container {
  display: grid;
  grid-template-columns: min-content 1fr;
  padding: var(--space-md);
  place-items: center;
}

.hp-display-label {
  text-align: center;
  font-size: var(--p-size-md);
  color: var(--grey-md);
}

.hp-current-display {
  color: white;
  font-size: var(--h-size-md);
  font-weight: 700;
}

.hp-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-sm);
  justify-content: space-evenly;
  margin: var(--space-md);
  margin-top: 0;
}

.hp-button {
  font-weight: 600;
  padding: var(--space-sm);
}

.hp-button.kill {
  background: var(--HP-crit);
  color: white;
}

.hp-button.revive {
  grid-column: span 3;
  background: green;
  color: white;
}
</style>
