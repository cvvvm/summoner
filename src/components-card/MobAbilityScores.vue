<template>
  <div
    class="
    flex flex-row
    gap-2 place-content-start
    p-2 rounded-xxl
    bg-neutral-800
    border-shadow"
  >
    <!-- roll math container -->
    <!------------------------------------------------>
    <div
      class="
      grid grid-cols-1
      gap-2
      "
    >
      <div
        class="
        grid grid-rows-[min-content,_1fr]
        rounded-xl
        border-shadow
        bg-neutral-950
        "
      >
        <span class="place-self-center px-5 pt-1 pb-0 text-neutral-400 text-sm font-light">roll</span>
        <span
          class="
          grid grid-rows-2 place-items-center
          py-1 rounded-b-xl"
        >
          <span class="text-lg text-blue-400">
            {{ abilityRollResult[0] }}
          </span>
          <span class="text-sm text-neutral-300">
            {{ abilityRollResult[1] }}
          </span>
        </span>
      </div>
    </div>

    <!-- ABILITY SCORES MAP -->
    <!------------------------------------------------>
    <!-- scores wrapper -->
    <div class="grid grid-cols-3 gap-2 grow">
      <div
        v-for="(ability, index) in props.abilityScores"
        :key="index"
        class=""
      >
        <div
          v-for="(scoreValue, abilityName, scoreIndex) in ability"
          :key="scoreIndex"
          class="grid grid-cols-1"
        >
          <!-- score button -->
          <!------------------------------------------------>
          <button
            class="
            overflow-hidden
            grid grid-cols-2 gap-y-1
            place-items-center place-content-center
            py-2 rounded-lg
            text-lg leading-none
            bg-neutral-950 hover:bg-neutral-950 active:bg-neutral-950
            border-2 border-neutral-400 hover:border-neutral-500"
            :class="abilityButtonHover"
            @click="abilityRoll(Math.floor((scoreValue.score - 10) / 2))"
          >
            <!-- name, ability score, modifier -->
            <span class="leading-none col-span-2 text-base text-blue-400">{{ abilityName }}</span>
            <span class="justify-self-end">{{ scoreValue.score }}</span>
            <span class="justify-self-start pl-1 leading-none text-sm text-neutral-400 font-normal">{{ calcAbilityMod(scoreValue.score) }}</span>
          </button>
        </div>
      </div>
    </div> <!-- end scores wrapper -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '@/functions/funcDiceRolls'

const abilityRollResult = ref(0)
const abilityButtonHover = ('active:text-neutral-300 ' +
                            'hover:bg-neutral-500 active:bg-neutral-600 ' +
                            'transition-colors ')

function abilityRoll (mod) {
  abilityRollResult.value = mobFunctions.rollDice(1, 20, mod)
}

const props = defineProps({
  abilityScores: { type: Object, default: () => {} },
  abilitySaves: { type: Object, default: () => {} }
})

function calcAbilityMod (scoreVal) {
  const modAmt = Math.floor((scoreVal - 10) / 2)
  if (modAmt < 0) return modAmt
  else return '+' + modAmt
}
</script>

<style>
</style>
