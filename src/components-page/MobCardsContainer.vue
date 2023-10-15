<template>
  <!-- card container -->
  {{ props.toggleGlobalCardPanel }}
  <div
    class="grid grid-cols-[repeat(_auto-fill,_minmax(320px,_500px))] gap-8
          p-8"
  >
    <div
      v-for="mob, index in props.mobs"
      :key="mob"
    >
      <MobCard
        :toggle-global-card-panel="props.toggleGlobalCardPanel"
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
        @pass-mob="$emit('passMob', $event);
                   console.log($event.type + ' index ' + $event.data + ' passed from container')"
      />

      <MobCardFull
        :toggle-global-card-panel="props.toggleGlobalCardPanel"
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
        @pass-mob="$emit('passMob', $event);
                   console.log($event.type + ' index ' + $event.data + ' passed from container')"
      />
    </div>
  </div>
</template>

<script setup>
import MobCard from './MobCard.vue'
import MobCardFull from './MobCardFull.vue'
defineEmits(['passMob'])
const props = defineProps({
  mobs: { type: Object, default: () => {} },
  toggleGlobalCardPanel: { type: String, default: '' }
})

</script>

<style>
</style>
