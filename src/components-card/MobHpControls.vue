<template>
  <div
    class="
    grid grid-cols-1 grid-rows-[1fr_min-content]
    rounded-xl
    bg-neutral-800
    border-shadow
    transition-colors"
    :class="HPbgColor"
  >
    <!-- container wrapper -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div class="">
      <!-- HP CONTAINER -->
      <!------------------------------------------------>
      <div
        class="grid grid-cols-[max-content_2fr] gap-2
              content-center items-baseline
              px-3 pb-1 pt-1.5 rounded-t-[.625rem]
              bg-neutral-950
              "
      >
        <!-- HP VALUE -->
        <h4 class="text-base">
          HP
        </h4>

        <!-- HP VALUE CONTAINER-->
        <div class="grid grid-cols-1 items-baseline justify-self-end">
          <p
            :class="HPcolor"
            class="text-lg font-medium transition-colors"
          >
            {{ currHpVal }}<span class="text-base text-neutral-400 font-light">/{{ props.baseHp }}</span>
          </p>
        </div>
      </div>

      <!-- math & buttons container -->
      <div
        class="
        grid grid-cols-[.25fr_minmax(35px,_1fr)_.25fr] gap-1
        p-2 pt-1.5 rounded-b-xl"
        @click="checkHP(); $emit('passHpFullCard', currHP)"
      >
        <button
          class="px-3 rounded-lg hover:bg-red-700 hover:text-red-200 active:bg-red-800 active:text-red-400"
          @click.exact="dmgMob(hpChange)"
          @click.shift="dmgMob(10)"
        >
          -
        </button>
        <!-- HP MOD INPUT -->
        <!------------------------------------------------>
        <input
          v-model="hpChange"
          type="number"
          class="
        px-1 pt-0.5 rounded-lg
        text-center text-neutral-200
        border-y-2 border-x border-neutral-900 hover:border-yellow-600
        bg-neutral-950
        transition-colors"
        >
        <button
          class="px-3 rounded-lg hover:bg-green-700 hover:text-green-200 active:bg-green-900 active:text-green-400"
          @click.exact="healMob(hpChange)"
          @click.shift="healMob(10)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  baseHp: { type: Number, default: 0 }
  /* currHp: { type: Number, default: 0 } */
})
defineEmits(['passHpFullCard'])

const hpChange = ref(1)
const HPcolor = ref('text-neutral-200')
const HPbgColor = ref('')
const currHpVal = ref(props.baseHp)

function healMob (amountHeal) {
  currHpVal.value = parseInt(currHpVal.value)
  currHpVal.value += amountHeal
}
function dmgMob (amountDmg) {
  currHpVal.value = parseInt(currHpVal.value)
  currHpVal.value -= amountDmg
}
function checkHP () {
  /* reset if less than 0 */
  if (currHpVal.value <= 0) currHpVal.value = 0
  /* bonus HP */ if (currHpVal.value > props.baseHp) {
    HPcolor.value = 'text-emerald-400 drop-shadow-[0px_0px_10px_teal]'
    HPbgColor.value = 'outline-2 outline outline-emerald-500' // drop-shadow-[0px_0px_4px_teal]'
  } /* dead */ else if (currHpVal.value < (props.baseHp * 0.2)) {
    HPcolor.value = 'text-red-500'
    HPbgColor.value = 'outline-2 outline outline-red-500'
  } /* low */ else if (currHpVal.value < (props.baseHp * 0.6) && currHpVal.value >= (props.baseHp * 0.3)) {
    HPcolor.value = 'text-yellow-500'
    HPbgColor.value = 'outline-2 outline outline-yellow-500'
  } /* critical */ else if (currHpVal.value < (props.baseHp * 0.3) && currHpVal.value >= 0.2) {
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
