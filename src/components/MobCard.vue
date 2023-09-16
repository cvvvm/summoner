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
    <!-- ability scores -->
    <MobAbilityScores :ability-scores="props.abilityScores" />

    <!-- HP controls -->
    <MobHpControls :base-hp="props.baseHp" />
    <!-- armor score -->
    <MobArmorClass :armor-class="props.armorClass" />

    <MobDefenses
      :damage-vulnerabilities="props.damageVulnerabilities"
      :damage-resistances="props.damageResistances"
      :damage-immunities="props.damageImmunities"
      :condition-immunities="props.conditionImmunities"
    />
    <MobSpecialAbilities :special-abilities="props.specialAbilities" />
  </div>
</template>

<script setup>
import MobBio from './MobBio.vue'
import MobHpControls from './MobHpControls.vue'
import MobAbilityScores from './MobAbilityScores.vue'
import MobArmorClass from './MobArmorClass.vue'
import MobDefenses from './MobDefenses.vue'
import MobSpecialAbilities from './MobSpecialAbilities.vue'

const props = defineProps({
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
  armorClass: { type: Array, default: () => [''] },
  /* ability scores */
  abilityScores: { type: Array, default: () => [''] },
  /* defenses */
  damageVulnerabilities: { type: Array, default: () => [''] },
  damageResistances: { type: Array, default: () => [''] },
  damageImmunities: { type: Array, default: () => [''] },
  conditionImmunities: { type: Array, default: () => [''] },
  specialAbilities: { type: Array, default: () => [''] }

})

</script>

<style>
.mob-card {
/*   grid-template-areas:
  'bio ability ability'
  'type armor hp'; */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  place-items: start;
  padding: var(--space-md);
}

</style>
