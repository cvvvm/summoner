<template>
  <!-- card container -->
  <div
    class="relative
          grid grid-cols-[repeat(_auto-fill,_minmax(320px,_525px))]
          content-start gap-8
          p-2 sm:p-4"
  >
    <div
      v-show="props.mobs.length === 0"
      class="col-span-full text-center"
    >
      summon a monster to begin your command
    </div>
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
          { str: {'score': mob.strength, 'saveMod': mob.strength_save} },
          { dex: {'score': mob.dexterity, 'saveMod': mob.dexterity_save} },
          { con: {'score': mob.constitution, 'saveMod': mob.constitution_save} },
          { int: {'score': mob.intelligence, 'saveMod': mob.intelligence_save} },
          { wis: {'score': mob.wisdom, 'saveMod': mob.wisdom_save} },
          { cha: {'score': mob.charisma, 'saveMod': mob.charisma_save} },
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
                   console.log($event.type + ' index ' + $event.data + ' passed from container');"
      />
    </div>
  </div>
</template>

<script setup>
import MobCard from './MobCard.vue'

defineEmits(['passMob'])
const props = defineProps({
  mobs: { type: Object, default: () => {} },
  toggleGlobalCardPanel: { type: String, default: '' }
})

</script>

<style>
</style>
