<template>
  <div class="mob-ability-scores-container">
    <div
      v-for="(ability, index) in props.abilityScores"
      :key="index"
    >
      <div
        v-for="(scoreValue, abilityName, scoreIndex) in ability"
        :key="scoreIndex"
        class="mob-ability-name"
      >
        {{ abilityName.substring(0, 3) }}
        <div class="mob-score-value">
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
  .mob-ability-scores-container {
    /* grid-area: ability; */
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: var(--space-sm);
  }
  .mob-ability-name {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    place-items: center;
    place-self: stretch;
    color: var(--md-grey);
    padding: var(--space-md) var(--space-lg);
    background: black;
    border-radius: var(--space-sm);
  }
  .mob-score-value {
    font-size: var(--h-size-sm);
    font-weight: 600;
    color: white;
  }
</style>
