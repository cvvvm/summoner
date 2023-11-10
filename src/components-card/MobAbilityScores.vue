<template>
  <div
    class="
    flex flex-row
    gap-2 place-content-start"
  >
    <!-- roll math container -->
    <!------------------------------------------------>
    <div
      class="
      grid grid-cols-1
      gap-3
      p-1 pb-0
      "
    >
      <div
        class="
            grid grid-rows-[min-content,_1fr] gap-1
            p-1 pt-1 rounded-xl
            text-sm
          bg-neutral-800
            shadow-[-1px_-1px_3px_2px] shadow-neutral-950"
      >
        <span class="place-self-center px-5 text-neutral-400">1d20</span>
        <span
          class="
          flex place-items-center place-content-center
          px-2 rounded-b-xl
          text-neutral-300
          bg-gradient-to-t from-neutral-900 to-neutral-950"
        >
          {{ abilityRollResult[1] }}
        </span>
      </div>

      <div
        class="
            grid grid-rows-[min-content,_1fr] gap-1
            p-1 rounded-xl
            text-sm
          bg-neutral-800
            shadow-[-1px_-1px_3px_2px] shadow-neutral-950"
      >
        <span class="place-self-center px-5 text-neutral-400">roll</span>
        <span
          class="
          flex place-items-center place-content-center
          px-2 rounded-b-xl
          text-neutral-300
          bg-gradient-to-t from-neutral-900 to-neutral-950"
        >
          {{ abilityRollResult[0] }}
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
            class="grid grid-cols-1 gap-1
                justify-items-start items-center
                p-2 pt-1.5 rounded-xl
              bg-neutral-400"
            :class="abilityButtonHover"
            @click="abilityRoll(Math.floor((scoreValue.score - 10) / 2))"
          >
            <div
              class="
            flex gap-1
            justify-self-center items-baseline
            rounded-sm
            text-sm text-neutral-950"
            >
              {{ abilityName }}
              <span class="text-sm text-neutral-800">
                {{ calcAbilityMod(scoreValue.score) }}
              </span>
            </div>
            <div
              class="
            justify-center justify-self-stretch
            text-base
            pt-1 pb-0.5 rounded-md
            bg-gradient-to-b from-neutral-950 to-neutral-900"
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
const abilityButtonHover = ('hover:outline hover:outline-1 hover:outline-yellow-500 ' +
                            'hover:bg-neutral-500 ' +
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
