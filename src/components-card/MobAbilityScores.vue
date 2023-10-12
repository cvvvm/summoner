<template>
  <div class="ability-scores-container">
    <div
      v-for="(ability, index) in props.abilityScores"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="val-container"
      >
        <div>{{ abilityName.substring(0, 3) }}</div>
        <div class="val-lg">
          {{ scoreValue }}
        </div>
      </div>
    </div>

    <div
      v-for="(ability, index) in props.abilitySaves"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="val-container"
      >
        <div>save</div>
        <div class="val-lg">
          {{ scoreValue }}
        </div>
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
  .ability-scores-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-sm);
    place-items: center;
  }
</style>
