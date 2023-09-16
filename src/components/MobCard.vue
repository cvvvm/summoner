<template>
  <div class="mob-card">
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
  </div>
</template>

<script setup>
import MobBio from './MobBio.vue'
import MobHpControls from './MobHpControls.vue'
import MobAbilityScores from './MobAbilityScores.vue'
import MobArmorClass from './MobArmorClass.vue'

const props = defineProps({
  avatar: { type: String, default: '' },
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  baseHp: { type: Number, default: 0 },
  armorClass: { type: Array, default: () => [''] },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  abilityScores: { type: Array, default: () => [''] },
  challengeRating: { type: Number, default: 0 },
  xpGained: { type: Number, default: 0 }
})

</script>

<style>
.mob-card {
  display: grid;
  gap: var(--space-md);
/*   grid-template-areas:
  'bio ability ability'
  'type armor hp'; */
  grid-template-columns: 1fr 1fr;/* repeat(1, 200px); */
  grid-template-rows: auto;
  padding: var(--space-md);
  background: white;
  border: var(--border-w) black;
  border-radius: var(--space-lg);
}
</style>
