<template>
  <div class="cards-container">
    <div
      v-for="mob in props.mobs"
      :key="mob.index"
    >
      <MobCard
        :name="mob.name.toLowerCase()"
        :alignment="mob.alignment"
        :size="mob.size.toLowerCase()"
        :type="mob.type"
        :ability-scores="[
          { str: mob.strength },
          { dex: mob.dexterity },
          { con: mob.constitution },
          { int: mob.intelligence },
          { wis: mob.wisdom },
          { cha: mob.charisma },
        ]"
        :base-hp="mob.hit_points"
        :armor-class="mob.armor_class"
        :challenge-rating="mob.challenge_rating"
        :xp-gained="mob.xp"
        :damage-vulnerabilities="mob.damage_vulnerabilities"
        :damage-resistances="mob.damage_resistances"
        :damage-immunities="mob.damage_immunities"
        :condition-immunities="mob.condition_immunities"
        :special-abilities="mob.special_abilities"
        :actions="mob.actions"
        :actions-legendary="mob.legendary_actions"
        :speed="mob.speed"
        :senses="mob.senses"
        :lang="mob.languages"
      />
    </div>
  </div>
</template>

<script setup>
import MobCard from './MobCard.vue'
const props = defineProps({
  mobs: { type: Object, default: () => {} }
})
</script>

<style>
  .cards-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    place-content: start;
    gap: var(--space-xxxl);
    padding: var(--space-xxxl);
  }
</style>
