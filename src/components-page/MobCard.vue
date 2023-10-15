<template>
  local: {{ toggledLocalPanel }} |
  global: {{ props.toggleGlobalCardPanel }} |
  <!-- card -->
  <div
    class="grid grid-cols-1 gap-4
      p-4 rounded-xl
    bg-black"
  >
    <!-- full screen + name container -->
    <div class="flex">
      <button
        class="px-1 justify-self-start self-start"
        @click="toggleFullCard"
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
            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
          />
        </svg>
      </button>

      <!-- name -->
      <h1
        class="flex-grow
                px-4 py-2 pt-3
                text-2xl text-zinc-200 text-center"
      >
        {{ props.name }}
      </h1>
    </div>

    <!-- armor, HP -->
    <!------------------------------------------------>
    <div class="grid grid-cols-[min-content_1.5fr_1.2fr] gap-3">
      <!-- clone / dupe -->
      <div
        class="flex flex-col gap-2 justify-center"
      >
        <CloneMob
          :mob-index="props.mobIndex"
          :name="props.name"
          @pass-mob="$emit('passMob', $event);
                     console.log($event.type + ' index ' +
                       $event.data + ' passed from card')"
        />
        <BanishMob
          :mob-index="props.mobIndex"
          :name="props.name"
          @pass-mob="$emit('passMob', $event);
                     console.log($event.type + ' index ' +
                       $event.data + ' passed from card')"
        />
      </div>
      <MobArmor :armor="props.armor" />
      <MobHpControls :base-hp="props.baseHp" />
    </div>

    <!-- panel toggles -->
    <!------------------------------------------------>
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="panel in panelsList"
        :key="panel"
        class="rounded-md"
        :class="toggledLocalPanel == panel ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : 'bg-zinc-900'"
        @click="toggledLocalPanel == panel ? toggledLocalPanel = 'collapse' : toggledLocalPanel = panel"
      >
        {{ panel }}
      </button>
    </div>

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

    <!--  PANELS  -->

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

    <!-- details-->

    <div
      v-show="toggledLocalPanel == 'details'"
      class="grid grid-cols-[1fr_.9fr] gap-4"
    >
      <MobAbilityScores
        :ability-scores="props.abilityScores"
        :ability-saves="props.abilitySaves"
        class="col-span-2"
      />
      <MobBio
        :size="props.size"
        :type="props.type"
        :alignment="props.alignment"
        :challenge-rating="props.challengeRating"
        class="col-span-2"
      />

      <!-- left details col -->
      <div class="grid grid-cols-1 gap-4 place-content-start">
        <MobSpeed
          :speed="props.speed"
        />
        <MobDefenses
          :damage-vulnerabilities="props.damageVulnerabilities"
          :damage-resistances="props.damageResistances"
          :damage-immunities="props.damageImmunities"
          :condition-immunities="props.conditionImmunities"
        />
      </div>

      <!-- right details col -->
      <div class="grid grid-cols-1 gap-4 place-content-start">
        <MobSenses :senses="props.senses" />
        <MobLanguages
          :lang="props.lang"
        />
      </div>
    </div> <!-- end details  -->

    <!-- special abilities -->
    <MobSpecialAbilities
      v-show="toggledLocalPanel == 'abilities'"
      :special-abilities="props.specialAbilities"
    />

    <!-- actions -->
    <MobActions
      v-show="toggledLocalPanel == 'actions'"
      :actions="props.actions"
    />

    <!-- actions (legendary) -->
    <MobActionsLegendary
      v-show="toggledLocalPanel == 'actions'"
      :legendary-actions="props.legendaryActions"
      :legendary-desc="props.legendaryDesc"
    />
  </div> <!-- card end -->

  <!-- FULL CARD -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <MobCardFull
    v-show="isFullCardOpen"
    :mob-index="props.mobIndex"
    :name="props.name"
    :alignment="props.alignment"
    :size="props.size"
    :type="props.type"
    :ability-scores="props.abilityScores"
    :ability-saves="props.abilitySaves"
    :base-hp="props.baseHp"
    :armor="props.armor"
    :challenge-rating="props.challengeRating"
    :damage-vulnerabilities="props.damageVulnerabilities"
    :damage-resistances="props.damageResistances"
    :damage-immunities="props.damageImmunities"
    :condition-immunities="props.conditionImmunities"
    :special-abilities="props.specialAbilities"
    :actions="props.actions"
    :legendary-actions="props.legendaryActions"
    :legendary-desc="props.legendaryDesc"
    :speed="props.speed"
    :senses="props.senses"
    :lang="props.lang"

    @pass-toggle-full-card="toggleFullCard"
  />
</template>

<script setup>
import { ref, reactive } from 'vue'

import BanishMob from '../components-functions/BanishMob'
import CloneMob from '@/components-functions/CloneMob.vue'
import MobCardFull from './MobCardFull.vue'

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

defineEmits(['passMob'])

const props = defineProps({
  toggleGlobalCardPanel: { type: String, default: '' },
  mobIndex: { type: Number, default: 0 },

  name: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  xpGained: { type: Number, default: 0 },
  challengeRating: { type: Number, default: 0 },
  baseHp: { type: Number, default: 0 },
  armor: { type: Object, default: () => {} },
  abilityScores: { type: Object, default: () => {} },
  abilitySaves: { type: Object, default: () => {} },
  speed: { type: Object, default: () => {} },
  senses: { type: String, default: '' },
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' },
  specialAbilities: { type: Object, default: () => {} },
  lang: { type: String, default: '' },
  actions: { type: Object, default: () => {} },
  legendaryActions: { type: Object, default: () => {} },
  legendaryDesc: { type: String, default: '' }

})

const panelsList = reactive(['details', 'abilities', 'actions'])
const toggledLocalPanel = ref(props.toggleGlobalCardPanel)

const isFullCardOpen = ref(false)
function toggleFullCard () {
  isFullCardOpen.value = !isFullCardOpen.value
}
</script>

<style>

</style>
