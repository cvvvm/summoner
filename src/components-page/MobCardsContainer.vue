<template>
  <div class="cards-container">
    <div
      v-for="mob, index in props.mobs"
      :key="mob"
    >
      <MobCard
        :mob-index="index"
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
        :ability-saves="[
          { str: mob.strength_save },
          { dex: mob.dexterity_save },
          { con: mob.constitution_save },
          { int: mob.intelligence_save },
          { wis: mob.wisdom_save },
          { cha: mob.charisma_save },
        ]"
        :base-hp="mob.hit_points"
        :armor="[{
          class: mob.armor_class,
          desc: mob.armor_desc,
        }]"
        :challenge-rating="mob.cr"
        :xp-gained="mob.xp"
        :damage-vulnerabilities="mob.damage_vulnerabilities"
        :damage-resistances="mob.damage_resistances"
        :damage-immunities="mob.damage_immunities"
        :condition-immunities="mob.condition_immunities"
        :special-abilities="mob.special_abilities"
        :actions="mob.actions"
        :legendary-actions="mob.legendary_actions"
        :legendary-desc="mob.legendary_desc"
        :speed="mob.speed"
        :senses="mob.senses"
        :lang="mob.languages"
      />
    </div>
  </div>
</template>

<script setup>
import MobCard from '../components-card/MobCard.vue'
const props = defineProps({
  mobs: { type: Object, default: () => {} }
})
</script>

<style>
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minMax(350px, 450px));
    grid-template-rows: auto;
    place-content: start;
    gap: var(--space-xxxl);
    padding: var(--space-xxxl);
  }
</style>
