<template>
  <!-- duplicate + remove -->
  <div
    class="grid grid-cols-1 gap-2
    p-5 rounded-xl
    bg-zinc-800
    border border-zinc-400"
  >
    <div
      class="flex flex-row place-content-between
    px-2 pb-2"
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
    <!-- bio -->
    <MobBio
      :name="props.name"
      :desc="props.desc"
      :avatar="props.avatar"
      :size="props.size"
      :type="props.type"
      :alignment="props.alignment"
      :challenge-rating="props.challengeRating"
      :xp-gained="props.xpGained"
    />
    <div class="grid grid-cols-2 gap-1">
      <!-- speed -->
      <MobSpeed :speed="props.speed" />
      <!-- senses -->
      <MobSenses :senses="props.senses" />
      <!-- languages -->
      <MobLanguages
        :lang="props.lang"
        class="col-span-2"
      />
    </div>

    <div class="grid grid-cols-[1fr_.75fr] gap-2">
      <!-- armor score -->
      <MobArmor :armor="props.armor" />
      <!-- HP controls -->
      <MobHpControls :base-hp="props.baseHp" />
    </div>

    <!-- ability scores -->
    <MobAbilityScores
      :ability-scores="props.abilityScores"
      :ability-saves="props.abilitySaves"
    />

    <!-- defense -->
    <MobDefenses
      :damage-vulnerabilities="props.damageVulnerabilities"
      :damage-resistances="props.damageResistances"
      :damage-immunities="props.damageImmunities"
      :condition-immunities="props.conditionImmunities"
    />
    <!-- special abilities -->
    <MobSpecialAbilities :special-abilities="props.specialAbilities" />

    <!-- actions -->
    <MobActions :actions="props.actions" />

    <!-- actions (legendary) -->
    <MobActionsLegendary
      :legendary-actions="props.legendaryActions"
      :legendary-desc="props.legendaryDesc"
    />
  </div>
</template>

<script setup>
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

/* function removeMobCard (indx) {
  emit('emitRemoveMobCard', indx)
  console.log(indx + ' card')
} */

</script>

<style>

</style>
