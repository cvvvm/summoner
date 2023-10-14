<template>
  <!-- card -->
  local: {{ toggledLocalPanel }} |
  global: {{ props.toggleGlobalCardPanel }} |
  <div
    class="grid grid-cols-1 gap-4
      p-4 rounded-xl
    bg-black"
  >
    <!-- clone / dupe + container -->
    <div
      class="flex flex-row gap-2 justify-end"
    >
      <CloneMob
        :mob-index="props.mobIndex"
        :name="props.name"
        @pass-mob="$emit('passMob', $event);
                   console.log($event.type + ' index ' +
                     $event.data +' passed from card')"
      />
      <BanishMob
        :mob-index="props.mobIndex"
        :name="props.name"
        @pass-mob="$emit('passMob', $event);
                   console.log($event.type + ' index ' +
                     $event.data +' passed from card')"
      />
    </div>

    <!-- name -->
    <div
      class="flex-grow
      px-4 py-2 pb-3
      text-3xl text-zinc-200"
    >
      {{ props.name }}
    </div>

    <div class="grid grid-cols-[.8fr_1fr] gap-4">
      <MobHpControls :base-hp="props.baseHp" />
      <MobArmor :armor="props.armor" />
    </div>

    <!-- toggles -->
    <div class="grid grid-cols-3 gap-0">
      <!--  -->
      <!-- MAKE ONE TOGGLE VARIable?? -->
      <!-- idk what the layout looks like yet. -->
      <!--  -->
      <button
        class="rounded-s-md rounded-e-none"
        :class="toggledLocalPanel == 'details' ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 ' : 'border border-zinc-600 bg-zinc-950'"
        @click="toggledLocalPanel == 'details' ? toggledLocalPanel = '' : toggledLocalPanel = 'details'"
      >
        details
      </button>
      <button
        class="rounded-none"
        :class="toggledLocalPanel == 'abilities' ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : 'border border-zinc-600 bg-zinc-950'"
        @click="toggledLocalPanel == 'abilities' ? toggledLocalPanel = '' : toggledLocalPanel = 'abilities'"
      >
        abilities
      </button>
      <button
        class="rounded-s-none rounded-e-md"
        :class="toggledLocalPanel == 'actions' ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : 'border border-zinc-600 bg-zinc-950'"
        @click="toggledLocalPanel == 'actions' ? toggledLocalPanel = '' : toggledLocalPanel = 'actions'"
      >
        actions
      </button>
    </div>

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

      <!-- left col -->
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

      <!-- right col -->
      <div class="grid grid-cols-1 gap-4 place-content-start">
        <MobSenses :senses="props.senses" />
        <MobLanguages
          :lang="props.lang"
        />
      </div>
    </div>
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

    <!-- card end -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

import BanishMob from '../components-functions/BanishMob'
import CloneMob from '@/components-functions/CloneMob.vue'

import MobBio from './MobBio.vue'
import MobHpControls from './MobHpControls.vue'
import MobAbilityScores from './MobAbilityScores.vue'
import MobArmor from './MobArmor.vue'
import MobDefenses from './MobDefenses.vue'
import MobSpecialAbilities from './MobSpecialAbilities.vue'
import MobSpeed from './MobSpeed.vue'
import MobSenses from './MobSenses.vue'
import MobLanguages from './MobLanguages.vue'
import MobActions from './MobActions.vue'
import MobActionsLegendary from './MobActionsLegendary.vue'

defineEmits(['passMob'])

const props = defineProps({
  toggleGlobalCardPanel: { type: String, default: '' },
  mobIndex: { type: Number, default: 0 },
  /* bio */
  name: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  xpGained: { type: Number, default: 0 },
  challengeRating: { type: Number, default: 0 },
  /* HP */
  baseHp: { type: Number, default: 0 },
  /* armor */
  armor: { type: Object, default: () => {} },
  /* scores */
  abilityScores: { type: Object, default: () => {} },
  abilitySaves: { type: Object, default: () => {} },
  /* speed */
  speed: { type: Object, default: () => {} },
  /* senses */
  senses: { type: String, default: '' },
  /* defenses */
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
const toggledLocalPanel = ref('details')

</script>

<style>

</style>
