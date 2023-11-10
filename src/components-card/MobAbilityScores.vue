<template>
  <div
    class="
    flex flex-row
    gap-2 place-content-start
    p-2 rounded-xxl
    bg-neutral-500
    border-shadow"
  >
    <!-- roll math container -->
    <!------------------------------------------------>
    <div
      class="
      grid grid-cols-1 row-span-2
      gap-2
      "
    >
      <div
        class="
            grid grid-rows-[min-content,_1fr] gap-1
            rounded-xl
          bg-neutral-800
            border-shadow"
      >
        <span class="place-self-center px-5 pt-2 pb-1 text-neutral-400 text-sm">roll</span>
        <span
          class="
          grid grid-rows-2 place-items-center
          py-2 rounded-b-xl
          bg-neutral-950"
        >
          <span class="text-lg text-neutral-300">
            {{ abilityRollResult[0] }}
          </span>
          <span class="text-sm text-neutral-400">
            {{ abilityRollResult[1] }}
          </span>
        </span>
      </div>
    </div>

    <!-- ABILITY SCORES MAP -->
    <!------------------------------------------------>
    <!-- scores wrapper -->
    <div class="grid grid-cols-3 gap-1 grow">
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
            grid grid-cols-1 gap-1
            justify-items-start items-center
            p-2 pt-1.5 rounded-xl
            bg-neutral-600"
            :class="abilityButtonHover"
            @click="abilityRoll(Math.floor((scoreValue.score - 10) / 2))"
          >
            <div
              class="
            flex gap-1
            justify-self-center items-baseline
            rounded-sm
            text-sm text-neutral-200"
            >
              {{ abilityName }}
              <span class="text-sm text-neutral-300">
                {{ calcAbilityMod(scoreValue.score) }}
              </span>
            </div>
            <div
              class="
            justify-center justify-self-stretch
            text-base
            pt-1 pb-0.5 rounded-md
            bg-neutral-950"
            >
              {{ scoreValue.score }}
            </div>
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
const abilityButtonHover = ('hover:bg-neutral-700 ' +
                            'active:bg-neutral-600 active:text-neutral-300 transition-colors')

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
