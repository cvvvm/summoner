<template>
  <!-- card -->
  <div
    class="grid grid-cols-1 gap-2
          min-w-[350px] max-w-[500px]
          p-4 pt-0 rounded-xl
        bg-black"
  >
    <!-- full screen + name container -->
    <div
      class="flex
      pt-4
      top-14
      bg-black"
    >
      <!-- FULL CARD -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
      <MobCardFull
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
      />
      <!-- name -->
      <h1
        class="flex-grow place-self-center
                px-4
                text-xl text-neutral-200"
      >
        {{ props.name }}
      </h1>
      <!-- clone / dupe -->
      <div
        class="flex flex-row gap-2 justify-end items-start"
      >
        <CloneMob
          :mob-index="props.mobIndex"
          :slug="props.slug"
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
    </div>

    <!-- armor, HP -->
    <!------------------------------------------------>
    <div class="grid grid-cols-2 gap-3">
      <MobArmor :armor="props.armor" />
      <MobHpControls
        :base-hp="props.baseHp"
      />
    </div>

    <!-- panel toggles -->
    <!------------------------------------------------>
    <div class="flex gap-2 mt-2">
      <button
        v-show="props.actions || props.legendaryActions"
        class="flex-1 rounded-md border"
        :class="toggledLocalPanel == 'actions' ? 'bg-yellow-500 text-yellow-950 border-yellow-600 hover:bg-yellow-600 hover:text-yellow-950' : 'text-neutral-400 bg-neutral-950 border-neutral-950 hover:border-b-yellow-500'"
        @click="toggledLocalPanel == 'actions' ? toggledLocalPanel = '' : toggledLocalPanel = 'actions'"
      >
        actions
      </button>

      <button
        v-show="props.specialAbilities"
        class="flex-1 rounded-md border"
        :class="toggledLocalPanel == 'abilities' ? 'bg-yellow-500 text-yellow-950 border-yellow-600 hover:bg-yellow-600 hover:text-yellow-950' : 'text-neutral-400 bg-neutral-950 border-neutral-950 hover:border-b-yellow-500'"
        @click="toggledLocalPanel == 'abilities' ? toggledLocalPanel = '' : toggledLocalPanel = 'abilities'"
      >
        abilities
      </button>

      <button
        class="flex-1 rounded-md border"
        :class="toggledLocalPanel == 'details' ? 'bg-yellow-500 text-yellow-950 border-yellow-600 hover:bg-yellow-600 hover:text-yellow-950' : 'text-neutral-400 bg-neutral-950 border-neutral-950 hover:border-b-yellow-500'"
        @click="toggledLocalPanel == 'details' ? toggledLocalPanel = '' : toggledLocalPanel = 'details'"
      >
        details
      </button>
    </div>

    <!--  PANELS  -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- special abilities -->
    <transition
      name="slide-down"
      appear
    >
      <MobSpecialAbilities
        v-show="toggledLocalPanel == 'abilities'"
        class="pt-2"
        :special-abilities="props.specialAbilities"
      />
    </transition>

    <!-- actions -->
    <transition
      name="slide-down"
      appear
    >
      <MobActions
        v-show="toggledLocalPanel == 'actions'"
        class="pt-2"
        :actions="props.actions"
      />
    </transition>

    <!-- actions (legendary) -->
    <MobActionsLegendary
      v-show="toggledLocalPanel == 'actions'"
      class="pt-2"
      :legendary-actions="props.legendaryActions"
      :legendary-desc="props.legendaryDesc"
    />

    <!-- details-->
    <transition
      name="slide-down"
      appear
    >
      <div
        v-show="toggledLocalPanel == 'details'"
        class="grid gap-y-4 gap-x-2
              grid-cols-1 xs:grid-cols-[.8fr_1fr]
              pt-2"
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
          class="xs:col-span-2 mt-2"
        />
        <!-- details col 1 -->
        <div class="grid gap-4 content-start col-span-2 xs:col-span-1">
          <MobSenses
            :senses="props.senses"
          />
        </div>

        <!-- details col 2 -->
        <div class="grid gap-4 gap-y-2 content-start col-span-2 xs:col-span-1">
          <MobSpeed
            :speed="props.speed"
          />
          <MobLanguages
            :lang="props.lang"
          />
        </div>

        <MobDefenses
          v-if="props.damageVulnerabilities || props.damageResistances || props.damageImmunities || props.conditionImmunities"
          :damage-vulnerabilities="props.damageVulnerabilities"
          :damage-resistances="props.damageResistances"
          :damage-immunities="props.damageImmunities"
          :condition-immunities="props.conditionImmunities"
          class="xs:col-span-2"
        />
      </div> <!-- end details  -->
    </transition>
  </div> <!-- card end -->
</template>

<script setup>
import { ref } from 'vue'

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
  slug: { type: String, default: '' },
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
const toggledLocalPanel = ref(props.toggleGlobalCardPanel)

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
