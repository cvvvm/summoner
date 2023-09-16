<template>
  <!-- SPECIAL ABILITIES -->
  <div class="sp-abilities-container sub-container">
    <h2 class="section-title">
      abilities
    </h2>
    <div
      v-for="ability in props.specialAbilities"
      :key="ability"
      class="sp-ability-container"
    >
      <h4>{{ ability.name.toLowerCase() }}</h4>
      <div class="sp-ability-desc-container">
        <p>{{ ability.desc.toLowerCase() }}</p>
        <div v-if="ability.usage">
          <p>
            {{ ability.usage.type }}: <span
              v-for="index in ability.usage.times"
              :key="index"
            >
              <input type="checkbox">
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  specialAbilities: { type: Array, default: () => [''] }
})

</script>

<style>
.sp-abilities-container {
    /* grid-area: bio; */
    grid-column: span 1;
    display: grid;
    grid-template-columns: 1fr ;
    gap: var(--space-lg);
    padding: var(--space-lg);
    border-radius: var(--space-sm);
    place-items: start;
  }
  .sp-ability-container {
    display: grid;
    gap: var(--space-md);
    place-content: start;
    padding: var(--space-md);
    border-radius: var(--space-xs);
    background: var(--grey-dk);
  }
  .sp-ability-desc-container {
    display: grid;
    gap: var(--space-md);
    color: var(--grey-lt);
}

</style>
