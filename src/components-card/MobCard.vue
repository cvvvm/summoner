<template>
  <div class="mob-card container">
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

    <!-- speed -->
    <MobSpeed :speed="props.speed" />
    <!-- senses -->
    <MobSenses :senses="props.senses" />
    <!-- languages -->
    <MobLanguages :lang="props.lang" />

    <div class="row3">
      <!-- armor score -->
      <MobArmor :armor="props.armor" />

      <!-- HP controls -->
      <MobHpControls :base-hp="props.baseHp" />

      <!-- ability scores -->
      <MobAbilityScores
        :ability-scores="props.abilityScores"
        :ability-saves="props.abilitySaves"
      />
    </div>

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
    <!--     <MobActionsLegendary
      :actions-legendary="props.actionsLegendary"
    /> -->
  </div>
</template>

<script setup>
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
// import MobActionsLegendary from './MobActionsLegendary.vue'

const props = defineProps({
  /* bio */
  name: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  xpGained: { type: Number, default: 0 },
  challengeRating: { type: String, default: '' },
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
  actionsLegendary: { type: Object, default: () => {} }

})

</script>

<style>

.row3 {
  display: flex;
  gap: var(--space-md);
}

.mob-card {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  place-items: stretch;
  padding: var(--space-md);
}

</style>
