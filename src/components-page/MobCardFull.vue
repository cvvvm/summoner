<template>
  <!-- open button -->
  <button
    class="
    icon-btn
    justify-self-start self-start
    hidden md:inline-block"
    @click="toggleFullCard()"
  >
    <i class="bi bi-arrows-angle-expand" />
  </button>

  <!-- CARD START -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <Transition
    appear
    name="slide-up-sm"
  >
    <!-- card container -->
    <div
      v-show="isFullCardOpen"
      class="fixed z-[9999]
      flex
      place-content-center place-items-center
      top-0 bottom-0 left-0 right-0
      max-h-full h-full w-full"
      @click.self="toggleFullCard()"
    >
      <div
        class="relative w-fit max-w-[95vw] h-fit max-h-[95vh]
            grid grid-cols-1 md:grid-cols-[minmax(425px,_500px)_minmax(300px,_500px)]
            gap-x-4 gap-y-12 lg:gap-x-8 lg:gap-y-0
            content-start items-start
            p-4 rounded-xl
            bg-neutral-700"
      >
        <!--  COLUMN 1  -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <div
          class="flex flex-col gap-4 content-start
                max-h-[90vh]
                md:row-span-2
                px-1
                overflow-y-auto h-full"
        >
          <!-- close + name container -->
          <div
            class="flex sticky top-0"
          >
            <!-- close button -->
            <button
              class="
              justify-self-center self-start
              icon-btn"
              @click="toggleFullCard()"
            >
              <i class="bi bi-arrows-angle-contract" />
            </button>

            <!-- name -->
            <h1
              class="flex-grow
                text-center
                text-xxl text-neutral-200"
            >
              {{ props.name }}
            </h1>
          </div>

          <!-- armor, HP -->
          <div class="grid grid-cols-2 gap-4">
            <MobArmor :armor="props.armor" />
            <MobHpControls
              :base-hp="props.baseHp"
              @pass-hp-full-card="$emit('passHpCard', $event)"
            />
          </div>

          <MobAbilityScores
            :ability-scores="props.abilityScores"
            :ability-saves="props.abilitySaves"
          />

          <MobBio
            :size="props.size"
            :type="props.type"
            :alignment="props.alignment"
            :challenge-rating="props.challengeRating"
          />
          <!-- details sub grid -->
          <!------------------------------------------------>
          <div class="grid grid-cols-[.8fr_1fr] gap-4 gap-y-2">
            <div class="grid gap-4 gap-y-2 content-start">
              <MobSenses :senses="props.senses" />
            </div>
            <div class="grid gap-4 gap-y-2 content-start">
              <MobSpeed :speed="props.speed" />
              <MobLanguages :lang="props.lang" />
            </div>
          </div>
          <MobDefenses
            :damage-vulnerabilities="props.damageVulnerabilities"
            :damage-resistances="props.damageResistances"
            :damage-immunities="props.damageImmunities"
            :condition-immunities="props.conditionImmunities"
          />
        </div> <!-- end column 1 -->

        <!-- COLUMN 2 -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <div
          class="grid gap-4
                max-h-[90vh]
                items-start
                overflow-y-auto"
        >
          <!-- toggle buttons -->
          <div
            class="sticky top-0
                    flex justify-center
                    gap-4
                    pt-4 pb-4"
          >
            <button
              v-show="props.actions"
              class="flex-1"
              :class="toggledLocalPanel == 'actions' ? 'panel-btn-active' : 'panel-btn-inactive'"
              @click="toggledLocalPanel = 'actions'"
            >
              actions
            </button>
            <button
              v-show="props.specialAbilities"
              class="flex-1"
              :class="toggledLocalPanel == 'abilities' ? 'panel-btn-active' : 'panel-btn-inactive'"
              @click="toggledLocalPanel = 'abilities'"
            >
              abilities
            </button>
          </div>

          <!-- ACTIONS -->
          <!------------------------------------------------>
          <div v-show="toggledLocalPanel == 'actions'">
            <MobActions
              :actions="props.actions"
            />
            <!-- actions (legendary) -->
            <MobActionsLegendary
              class="pt-8"
              :legendary-actions="props.legendaryActions"
              :legendary-desc="props.legendaryDesc"
            />
          </div>

          <!-- ABILITIES -->
          <!------------------------------------------------>
          <div v-show="toggledLocalPanel == 'abilities'">
            <MobSpecialAbilities
              :special-abilities="props.specialAbilities"
            />
          </div>
        </div> <!-- end col 2 -->
      </div> <!-- card end -->
    </div> <!-- card container end -->
  </Transition>

  <!-- backdrop -->
  <Transition
    appear
    name="fade"
  >
    <div
      v-show="isFullCardOpen"
      class="fixed z-[8000]
    flex
    place-content-center place-items-center
    top-0 bottom-0 left-0 right-0
    max-h-full h-full w-full
    bg-neutral-950 bg-opacity-75"
    />
  </Transition>
</template>

<script setup>

import MobBio from '../components-card/MobBio.vue'
import MobHpControls from '../components-card/MobHpControls.vue'
import MobAbilityScores from '../components-card/MobAbilityScores.vue'
import MobArmor from '../components-card/MobArmor.vue'
import MobDefenses from '../components-card/MobDefenses.vue'
import MobSpecialAbilities from '../components-card/MobSpecialAbilities.vue'
import MobSpeed from '../components-card/MobSpeed.vue'
import MobSenses from '../components-card/MobSenses.vue'
import MobLanguages from '../components-card/MobLanguages.vue'
import MobActions from '../components-card/MobActions.vue'
import MobActionsLegendary from '../components-card/MobActionsLegendary.vue'
import { ref } from 'vue'

defineEmits(['passMob', 'passToggleFullCard', 'passHpCard'])

const props = defineProps({
  mobIndex: { type: Number, default: 0 },

  name: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  challengeRating: { type: Number, default: 0 },
  baseHp: { type: Number, default: 0 },
  armor: { type: Object, default: () => { } },
  abilityScores: { type: Object, default: () => { } },
  abilitySaves: { type: Object, default: () => { } },
  speed: { type: Object, default: () => { } },
  senses: { type: String, default: '' },
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' },
  specialAbilities: { type: Object, default: () => { } },
  lang: { type: String, default: '' },
  actions: { type: Object, default: () => { } },
  legendaryActions: { type: Object, default: () => { } },
  legendaryDesc: { type: String, default: '' }

})

const toggledLocalPanel = ref('actions')

const isFullCardOpen = ref(false)
function toggleFullCard () {
  isFullCardOpen.value = !isFullCardOpen.value
}

</script>

<style>
</style>
