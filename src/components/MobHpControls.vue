<template>
  <div class="hp-controls-container">
    <!-- HP display -->
    <div class="hp-display-container">
      <span class="hp-display-label">HP:</span>
      <span
        v-show="!isDead"
        class="hp-current-display"
      >
        {{ props.baseHp - hpLost }}
      </span>
      <span
        v-show="isDead"
        class="hp-current-display"
      >
        DEAD
      </span>
    </div>

    <!-- HP toggles -->
    <div
      class="creature-hp-buttons-container"
      @click="checkDead()"
    >
      <button
        v-show="!isDead"
        class="creature-hp-button"
        @click.exact="dmgMob(1)"
        @click.shift="dmgMob(5)"
      >
        -1
      </button>
      <button
        v-show="!isDead"
        class="creature-hp-button"
        @click.exact="healMob(1)"
        @click.shift="healMob(5)"
      >
        +1
      </button>
      <button
        v-show="!isDead"
        class="creature-hp-button kill"
        @click="hpLost = props.baseHp"
      >
        KILL
      </button>
      <button
        v-show="isDead"
        class="creature-hp-button revive"
        @click="hpLost = props.baseHp - 1"
      >
        REVIVE
      </button>
      <button
        v-show="isDead"
        class="creature-hp-button revive"
        @click="hpLost = 0"
      >
        FULL HP
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const hpLost = ref(0)
const isDead = ref(false)

const props = defineProps({
  baseHp: { type: Number, default: 0 }
})

function healMob (amountHeal) {
  hpLost.value = hpLost.value - amountHeal
}
function dmgMob (amountDmg) {
  hpLost.value = hpLost.value + amountDmg
}
function checkDead () {
  if (hpLost.value >= props.baseHp) {
    isDead.value = true
    hpLost.value = props.baseHp
  } else {
    isDead.value = false
  }
}
</script>

<style>
.hp-controls-container {
  grid-area: hp-buttons;
  display: grid;
  background: black;
  border-radius: var(--space-md);
}

.hp-display-container {
  display: grid;
  grid-template-columns: min-content 1fr;
  padding: var(--space-md) var(--space-lg);
  place-items: center;
}

.hp-display-label {
  text-align: center;
  font-size: var(--h-size-sm);
  color: var(--text-md);
}

.hp-current-display {
  color: white;
  font-size: var(--h-size-md);
  font-weight: 500;
}

.creature-hp-buttons-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-sm);
  justify-content: space-evenly;
  margin: var(--space-sm);
  margin-top: 0;
}

.creature-hp-button {
  font-weight: 600;
  padding: var(--space-sm);
}

.creature-hp-button.kill {
  grid-column: span 2;
  background: red;
  color: white;
}

.creature-hp-button.revive {
  grid-column: span 2;
  background: green;
  color: white;
}
</style>
