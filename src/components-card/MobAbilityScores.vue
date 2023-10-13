<template>
  <div class="grid grid-cols-6 gap-0 gap-x-2">
    <div
      v-for="(ability, index) in props.abilityScores"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="grid grid-cols-1 place-items-center
        p-2 pb-2 rounded-t-md
        bg-zinc-950"
      >
        <div>{{ abilityName.substring(0, 3) }}</div>
        <div class="val-lg">
          {{ scoreValue }}
        </div>
      </div>
    </div>

    <!-- saving throws -->
    <div
      v-for="(ability, index) in props.abilitySaves"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="grid grid-cols-1 place-items-center
        py-1 rounded-b-md
        bg-zinc-900"
      >
        <div class="text-sm">
          save
        </div>
        <span class="val-sm">+{{ (scoreValue == null) ? 0 : scoreValue }}</span>
      </div>
    </div>
  </div>
</template>

<!-- <template v-for="(value, index) in otherclients">
  <li v-for="(note, note_index) in value.doc.notes">{{ note.text }}</li>
</template> -->

<script setup>
const props = defineProps({
  abilityScores: { type: Object, default: () => {} },
  abilitySaves: { type: Object, default: () => {} }
})

</script>

<style>
</style>
