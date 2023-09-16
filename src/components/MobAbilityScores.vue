<template>
  <div class="ability-scores-container">
    <div
      v-for="(ability, index) in props.abilityScores"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="ability-name sub-container"
      >
        {{ abilityName.substring(0, 3) }}
        <div class="score-value">
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
  abilityScores: { type: Array, default: () => [''] }
})

</script>

<style>
  .ability-scores-container {
    /* grid-area: ability; */
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-sm);
  }
  .ability-name {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    place-self: stretch;
    color: var(--grey-md);
    padding: var(--space-sm) var(--space-xl) var(--space-md);
    background: black;
  }
  .score-value {
    font-size: var(--h-size-sm);
    font-weight: 600;
    color: white;
  }
</style>
