<template>
  <!-- card -->

  <div
    class="
    relative
    max-w-[425px] sm:max-w-[400px]
    grid grid-cols-1 gap-2
    p-2 rounded-xxxl
    bg-neutral-700
    border-4 border-neutral-800"
  >
    <!-- full screen + name container -->
    <div
      class="px-1 py-1 flex gap-2"
    >
      <!-- CARD -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <!-- name -->
      <h1
        class="
        pl-1
        flex-grow place-self-center
        tracking-tight
        text-xl text-neutral-200
        truncate"
      >
        {{ props.name }}
      </h1>
      <!-- clone / banish -->
      <div
        class="flex flex-row gap-2 justify-end items-center"
      >
        <!-- FULL CARD -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
        <!--    <MobCardFull
          :mob-index="props.mobIndex"
          :name="props.name"
          :alignment="props.alignment"
          :size="props.size"
          :type="props.type"
          :ability-scores="props.abilityScores"
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
          @pass-hp-card="updateHpVal($event)"
        /> -->
        <CloneMob
          :mob-index="props.mobIndex"
          :url="props.url"
          @pass-mob="$emit('passMob', $event)"
        />
        <BanishMob
          :mob-index="props.mobIndex"
          :name="props.name"
          @pass-mob="$emit('passMob', $event)"
        />
      </div>
    </div>

    <!-- armor, HP -->
    <!------------------------------------------------>
    <div
      class="
      grid grid-cols-[1fr,_.65fr] gap-2
      "
    >
      <MobArmor :armor="props.armor" />
      <MobHpControls
        :base-hp="props.baseHp"
      />
    </div>

    <!-- panel toggles -->
    <!------------------------------------------------>
    <div class="flex gap-2">
      <button
        v-show="props.actions.length > 0 || props.legendaryActions.length > 0"
        :class="toggledLocalPanel === 'actions' ? 'panel-btn-active' : 'panel-btn-inactive'"
        class="flex-1"
        @click="toggledLocalPanel === 'actions' ? toggledLocalPanel = '' : toggledLocalPanel = 'actions'"
      >
        actions
      </button>

      <button
        v-show="props.specialAbilities.length > 0"
        :class="toggledLocalPanel === 'abilities' ? 'panel-btn-active' : 'panel-btn-inactive'"
        class="flex-1"
        @click="toggledLocalPanel === 'abilities' ? toggledLocalPanel = '' : toggledLocalPanel = 'abilities'"
      >
        abilities
      </button>

      <button
        :class="toggledLocalPanel === 'details' ? 'panel-btn-active' : 'panel-btn-inactive'"
        class="flex-1"
        @click="toggledLocalPanel === 'details' ? toggledLocalPanel = '' : toggledLocalPanel = 'details'"
      >
        details
      </button>
    </div>

    <!--  PANELS  -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- special abilities -->
    <!------------------------------------------------>

    <transition
      appear
      name="slide-down"
    >
      <MobSpecialAbilities
        v-show="toggledLocalPanel === 'abilities' && props.specialAbilities.length > 0"
        :special-abilities="props.specialAbilities"
        class="pb-4 pt-1"
      />
    </transition>

    <!-- actions -->
    <!------------------------------------------------>
    <transition
      appear
      name="slide-down"
    >
      <MobActions
        v-show="toggledLocalPanel === 'actions' && props.actions.length > 0"
        :actions="props.actions"
        class="pb-4 pt-1"
      />
    </transition>

    <!-- actions (legendary) -->
    <MobActionsLegendary
      v-show="toggledLocalPanel === 'actions' && props.legendaryActions.length > 0"
      :legendary-actions="props.legendaryActions"
      :legendary-desc="props.legendaryDesc"
      class="pb-4 pt-1"
    />

    <!-- details-->
    <!------------------------------------------------>
    <transition
      appear
      name="slide-down"
    >
      <div
        v-show="toggledLocalPanel === 'details'"
        class="
        grid gap-2
        grid-cols-1
        pb-4 pt-1"
      >
        <MobAbilityScores
          :ability-saves="props.abilitySaves"
          :ability-scores="props.abilityScores"
        />
        <div
          class="
          grid grid-cols-1 gap-2
          p-2 rounded-lg
          bg-neutral-800
          border-shadow
          "
        >
          <MobBio
            :alignment="props.alignment"
            :challenge-rating="props.challengeRating"
            :size="props.size"
            :type="props.type"
          />
          <!-- details col 1 -->
          <div class="grid gap-2 content-start">
            <MobSenses
              :senses="props.senses"
            />
          </div>

          <!-- details col 2 -->
          <div class="grid gap-2 content-start">
            <MobSpeed
              :speed="props.speed"
            />
            <MobLanguages
              :lang="props.lang"
            />
          </div>

          <MobDefenses
            v-if="props.damageVulnerabilities.length > 0 || props.damageResistances.length > 0 || props.damageImmunities.length > 0 || props.conditionImmunities.length > 0"
            :condition-immunities="props.conditionImmunities"
            :damage-immunities="props.damageImmunities"
            :damage-resistances="props.damageResistances"
            :damage-vulnerabilities="props.damageVulnerabilities"
            class=""
          />
        </div>
      </div> <!-- end details  -->
    </transition>
  </div> <!-- card end -->
</template>

<script setup>
import { ref } from 'vue'

import BanishMob from '../components-functions/BanishMob'
import CloneMob from '@/components-functions/CloneMob'
// import MobCardFull from './MobCardFull'

import MobBio from '../components-card/MobBio.vue'
import MobHpControls from '../components-card/MobHpControls.vue'
import MobAbilityScores from '../components-card/MobAbilityScores'
import MobArmor from '../components-card/MobArmor.vue'
import MobDefenses from '../components-card/MobDefenses.vue'
import MobSpecialAbilities from '../components-card/MobSpecialAbilities.vue'
import MobSpeed from '../components-card/MobSpeed.vue'
import MobSenses from '../components-card/MobSenses.vue'
import MobLanguages from '../components-card/MobLanguages.vue'
import MobActions from '../components-card/MobActions.vue'
import MobActionsLegendary from '../components-card/MobActionsLegendary.vue'

defineEmits( ['passMob'] )

const props = defineProps( {
  toggleGlobalCardPanel: { type: String, default: '' },
  mobIndex: { type: Number, default: 0 },

  name: { type: String, default: '' },
  url: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  xpGained: { type: Number, default: 0 },
  challengeRating: { type: Number, default: 0 },
  baseHp: { type: Number, default: 0 },
  armor: {
    type: Object,
    default: () => {
    }
  },
  abilityScores: {
    type: Object,
    default: () => {
    }
  },
  abilitySaves: {
    type: Object,
    default: () => {
    }
  },
  speed: {
    type: Object,
    default: () => {
    }
  },
  senses: { type: String, default: '' },
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' },
  specialAbilities: {
    type: Object,
    default: () => {
    }
  },
  lang: { type: String, default: '' },
  actions: {
    type: Object,
    default: () => {
    }
  },
  legendaryActions: {
    type: Object,
    default: () => {
    }
  },
  legendaryDesc: { type: String, default: '' }

} )
const toggledLocalPanel = ref( props.toggleGlobalCardPanel )

// HP update from full card
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* const currHP = ref()
function updateHpVal (e) {
  currHP.value = e
  console.log(e)
} */

</script>

<style>
</style>
