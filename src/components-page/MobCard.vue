<template>
  <!-- card -->
  <div
    class="grid grid-cols-1 gap-2
      p-4 pt-0 rounded-xl
    bg-black"
  >
    <!-- full screen + name container -->

    <div
      class="flex sticky
            pt-4 pb-2
            top-14
            bg-black
            shadow-[0px_4px_12px] shadow-black"
    >
      <button
        class="justify-self-start self-start
              px-1
              hidden md:inline-block"
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
        class="flex-grow place-self-center
                px-4
                text-xxl text-zinc-200 text-center"
      >
        {{ props.name }}
      </h1>
      <!-- clone / dupe -->
      <div
        class="flex flex-row gap-2 justify-end items-start"
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
    </div>

    <!-- armor, HP -->
    <!------------------------------------------------>
    <div class="grid grid-cols-2 gap-3">
      <MobArmor :armor="props.armor" />
      <MobHpControls :base-hp="props.baseHp" />
    </div>

    <!-- panel toggles -->
    <!------------------------------------------------>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <button
        v-for="panel in panelsList"
        :key="panel"
        class="rounded-md"
        :class="toggledLocalPanel == panel ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : 'text-zinc-400 border bg-zinc-950 border-zinc-700'"
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

    <!-- special abilities -->
    <transition
      name="slide-down"
      appear
    >
      <MobSpecialAbilities
        v-show="toggledLocalPanel == 'abilities'"
        class="pt-4"
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
        class="pt-4"
        :actions="props.actions"
      />
    </transition>

    <!-- actions (legendary) -->
    <MobActionsLegendary
      v-show="toggledLocalPanel == 'actions'"
      class="pt-4"
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
        class="grid grid-cols-1 xs:grid-cols-[.8fr_1fr] gap-4
            pt-4"
      >
        <MobAbilityScores
          :ability-scores="props.abilityScores"
          :ability-saves="props.abilitySaves"
          class="xs:col-span-2"
        />
        <MobBio
          :size="props.size"
          :type="props.type"
          :alignment="props.alignment"
          :challenge-rating="props.challengeRating"
          class="col-span-2"
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

  <!-- FULL CARD -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <transition name="fade">
    <MobCardFull
      v-show="isFullCardOpen"
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
      @pass-toggle-full-card="toggleFullCard"
    />
  </transition>
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

const panelsList = ['actions', 'abilities', 'details']
const toggledLocalPanel = ref(props.toggleGlobalCardPanel)

const isFullCardOpen = ref(false)
function toggleFullCard () {
  isFullCardOpen.value = !isFullCardOpen.value
}
</script>

<style>
/* FADE */
.fade-leave-active, .fade-enter-active {
transition: opacity .2s ease-out;/* cubic-bezier(1, 0.5, 0.8, 1); */
}
.fade-leave-to, .fade-enter-from {
  opacity: 0;
}

/* SCALE FADE */
.scale-fade-enter-active .inner{
transition: transform .2s ease-out;/* cubic-bezier(1, 0.5, 0.8, 1); */
}
.scale-fade-leave-active {}
.scale-fade-enter-from .inner{
  transform: scale(.2);
}
.scale-fade-leave-to {}

/* SLIDE DOWN */
.slide-down-leave-active {
  transition: transform 0s ease-in, opacity 0s ease-in;
}
.slide-down-enter-active {
  transition: transform 0.25s ease-out, opacity 0.25s ease-out;
}
.slide-down-enter-from, .v-leave-to{
  transform: translateY(-10px);
  opacity: 0;
}

</style>
