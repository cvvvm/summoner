<template>
  <div
    class="grid
          grid-cols-3
          gap-2 place-content-start"
  >
    <!-- roll math container -->
    <div
      class="grid
            grid-cols-2
            col-span-3
            justify-evenly
            gap-x-4 gap-y-2
            text-sm
            "
    >
      <div class="flex gap-2 items-center">
        dice: <span class="grow h-[28px] px-2 p-1 rounded-md bg-neutral-900 text-neutral-200">{{ abilityRollResult[1] }}</span>
      </div>
      <div class="flex gap-2 items-center">
        roll: <span class="grow h-[28px] px-2 p-1 rounded-md bg-neutral-900 text-neutral-200"> {{ abilityRollResult[0] }}</span>
      </div>
    </div>
    <!-- ABILITY SCORES MAP -->
    <!------------------------------------------------>
    <div
      v-for="(ability, index) in props.abilityScores"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="grid"
      >
        <!-- score button -->
        <!------------------------------------------------>
        <button
          class="grid grid-cols-[2fr_1fr]
                gap-x-2 gap-y-1
                justify-items-start items-center
                p-2 rounded-md
             bg-neutral-800"
          :class="abilityButtonHover"
          @click="abilityRoll(Math.floor((scoreValue.score - 10) / 2))"
        >
          <div
            class="
            flex gap-1
            justify-self-center items-center
            rounded-sm
            text-sm font-bold text-neutral-200"
          >
            {{ abilityName }}<span class="text-sm text-neutral-400 font-normal">{{ calcAbilityMod(scoreValue.score) }}</span>
          </div>
          <div
            class="
            flex gap-1
            justify-center justify-self-stretch
            rounded-sm
            bg-neutral-950"
          >
            <div
              class="
                  px-2
                  text-xl font-medium
                text-neutral-400"
            >
              {{ scoreValue.score }}
            </div>
          </div>
        </button>

        <!-- save button -->
        <!------------------------------------------------>
        <button
          class="flex justify-center
                  gap-2
                  p-1 pt-0.5 mt-1 rounded-md
                  text-sm text-neutral-400
                  bg-neutral-900"
          :class="abilityButtonHover"
          @click="abilityRoll(scoreValue.saveMod ? scoreValue.saveMod : Math.floor((scoreValue.score - 10) / 2))"
        >
          save<span class="val-sm">{{ scoreValue.saveMod ? '+' + scoreValue.saveMod : calcAbilityMod(scoreValue.score) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { mobFunctions } from '@/functions/funcDiceRolls'

const abilityRollResult = ref(0)
const abilityButtonHover = ('hover:outline hover:outline-2 hover:outline-yellow-500 ' +
                            'hover:bg-neutral-700 hover:text-yellow-500 ' +
                            'active:bg-neutral-900 active:text-neutral-300 transition-colors')

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
