<template>
  <div class="mob-card container-lvl0">
    <div class="col-2 container-lvl1">
      <RemoveMob
        :mob-index="props.mobIndex"
        :name="props.name"
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
    <div class="col-2 container-lvl1">
      <!-- speed -->
      <MobSpeed :speed="props.speed" />
      <!-- senses -->
      <MobSenses :senses="props.senses" />
    </div>
    <!-- languages -->
    <MobLanguages :lang="props.lang" />

    <div class="col-2 container-lvl1">
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
import RemoveMob from '../components-functions/RemoveMob'

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

// const emit = defineEmits(['emitRemoveMobCard'])

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
  emit('removeMob', indx)
  console.log(indx)
} */

</script>

<style>

.mob-card {
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  place-items: stretch;
}

</style>
