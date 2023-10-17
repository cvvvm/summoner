<template>
  <!-- backdrop -->
  <div
    class="fixed top-0 left-0
        z-[9999]
        h-full w-full
        flex-initial flex place-content-center place-items-center
        p-12
        bg-zinc-700 bg-opacity-75"
    @click.self="$emit('passToggleFullCard')"
  >
    <!--  COLUMN 1  -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="relative w-full h-full
            grid grid-cols-1 lg:grid-cols-[450px_1fr]
            gap-12
            content-start items-start
            p-4 rounded-xl
            bg-black"
    >
      <div
        class="flex flex-col gap-4 content-start
                md:row-span-2
                overflow-y-auto h-full"
      >
        <!-- close + name container -->
        <div
          class="flex sticky top-0
                    bg-black"
        >
          <!-- close button -->
          <button
            class="justify-self-center self-start px-1"
            @click="$emit('passToggleFullCard')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
              />
            </svg>
          </button>

          <!-- name -->
          <h1
            class="flex-grow
                py-4
                text-center
                text-xxl text-zinc-200"
          >
            {{ props.name }}
          </h1>
        </div>

        <!-- armor, HP -->
        <div class="grid grid-cols-2 gap-4">
          <MobArmor :armor="props.armor" />
          <MobHpControls :base-hp="props.baseHp" />
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
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-4 content-start">
            <MobSpeed :speed="props.speed" />
            <MobLanguages :lang="props.lang" />
            <MobSenses :senses="props.senses" />
          </div>
          <div class="grid gap-4 content-start">
            <MobDefenses
              :damage-vulnerabilities="props.damageVulnerabilities"
              :damage-resistances="props.damageResistances"
              :damage-immunities="props.damageImmunities"
              :condition-immunities="props.conditionImmunities"
            />
          </div>
        </div>
      </div> <!-- end column 1 -->

      <!-- COLUMN 2 -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <div
        class="grid gap-8
                items-start
                h-full
                overflow-y-auto"
      >
        <!-- toggle buttons -->
        <div
          class="sticky top-0
                    flex justify-center
                    gap-4
                    pb-4
                    bg-black"
        >
          <button
            v-for="panel in panelsList"
            :key="panel"
            class="rounded-md min-w-[45%]"
            :class="toggledLocalPanel == panel ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : 'text-zinc-400 border bg-zinc-950 border-zinc-700'"
            @click="toggledLocalPanel == panel ? toggledLocalPanel = 'collapse' : toggledLocalPanel = panel"
          >
            {{ panel }}
          </button>
        </div>

        <!-- ACTIONS -->
        <!------------------------------------------------>
        <div v-show="toggledLocalPanel == 'actions'">
          <h2 class="text-lg px-2">
            actions
          </h2>
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
          <h2 class="text-lg px-2">
            abilities
          </h2>
          <MobSpecialAbilities
            :special-abilities="props.specialAbilities"
          />
        </div>
      </div> <!-- end col 2 -->
    </div> <!-- card end -->
  </div> <!-- backdrop end -->
</template>

<script setup>

// import BanishMob from '../components-functions/BanishMob'
// import CloneMob from '@/components-functions/CloneMob.vue'

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

defineEmits(['passMob', 'passToggleFullCard'])

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

const panelsList = ['actions', 'abilities']
const toggledLocalPanel = ref(panelsList[0])

</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 225ms ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
