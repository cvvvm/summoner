<template>
  <div class="mob-card">
    <!-- type -->
    <MobTypes
      :size="props.size"
      :type="props.type"
      :alignment="props.alignment"
    />
    <!-- bio -->
    <MobBio
      :name="props.name"
      :desc="props.desc"
      :avatar="props.avatar"
    />
    <!-- HP controls -->
    <MobHpControls :base-hp="props.baseHp" />
    <!-- ability scores -->
    <MobAbiliyScores :ability-scores="props.abilityScores" />
  </div>
</template>

<script setup>
import MobTypes from './MobTypes.vue'
import MobBio from './MobBio.vue'
import MobHpControls from './MobHpControls.vue'
import MobAbiliyScores from './MobAbilityScores.vue'

const props = defineProps({
  avatar: { type: String, default: '' },
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  baseHp: { type: Number, default: 0 },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  abilityScores: { type: Array, default: () => [''] }
})

</script>

<style>
.mob-card {
  display: grid;
  gap: 16px;
  grid-template-areas:
  'bio bio bio'
  'bio bio bio'
  'type type type'
  'ability ability hp-buttons';
  grid-template-columns: 150px 1fr 1fr;
  grid-template-rows: .75fr 1fr .25fr auto;
  padding: var(--space-lg);
  background: white;
  border: var(--border-w) black;
  border-radius: var(--space-md);
}
</style>
