<template>
  <div
    class="grid
          grid-cols-3 xs:grid-cols-6
          gap-2 place-content-start mt-2"
  >
    <!-- roll math container -->
    <div
      class="grid
            grid-cols-2
            col-span-3 xs:col-span-6
            justify-evenly
            gap-x-4 gap-y-2
            text-sm
            "
    >
      <div class="flex gap-2 items-center">
        dice: <span class="grow h-[28px] px-2 p-1 rounded-md bg-zinc-900 text-zinc-200">{{ abilityRollResult[1] }}</span>
      </div>
      <div class="flex gap-2 items-center">
        roll: <span class="grow h-[28px] px-2 p-1 rounded-md bg-zinc-900 text-zinc-200"> {{ abilityRollResult[0] }}</span>
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
          class="grid
                grid-cols-[.75fr_1fr] xs:grid-cols-1
                justify-items-start items-center xs:place-items-center
                p-2 pb-2 rounded-md
              text-zinc-400 bg-zinc-800"
          :class="abilityButtonHover"
          @click="abilityRoll(Math.floor((scoreValue.score - 10) / 2))"
        >
          <div class="justify-self-center px-1">
            {{ abilityName }}
          </div>
          <div class="flex gap-1 items-center">
            <div class="val-lg">
              {{ scoreValue.score }}
            </div>
            <span class="text-sm text-zinc-400">{{ calcAbilityMod(scoreValue.score) }}</span>
          </div>
        </button>

        <!-- save button -->
        <!------------------------------------------------>
        <button
          class="flex justify-center
                  gap-2 xs:gap-1
                  p-1 pt-0.5 mt-1 rounded-md
                  text-sm text-zinc-400
                  bg-zinc-900"
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
import { mobFunctions } from '@/mobFunctions'

const abilityRollResult = ref(0)
const abilityBgColor = 'zinc'
const abilityButtonHover = 'hover:outline hover:outline-2 hover:outline-yellow-500 hover:bg-' + abilityBgColor + '-900 hover:text-' + abilityBgColor + '-100 active:bg-' + abilityBgColor + '-800 active:text-' + abilityBgColor + '-300 transition-colors'

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
