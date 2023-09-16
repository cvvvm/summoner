<template>
  <!-- DEFENSES -->
  <div
    v-if="props.damageVulnerabilities.length != 0"
    class="defenses-container sub-container"
  >
    <h4>damage vunerabilities</h4>
    <div
      v-for="vulnerability in props.damageVulnerabilities"
      :key="vulnerability"
    >
      <p class="defense-type">
        {{ vulnerability }}<span class="defense-label">vul</span>
      </p>
    </div>
  </div>

  <div
    v-if="props.damageResistances.length != 0"
    class="defenses-container sub-container"
  >
    <h4>damage resistances</h4>
    <div
      v-for="resistance in props.damageResistances"
      :key="resistance"
    >
      <p class="defense-type">
        {{ resistance }}<span class="defense-label">res</span>
      </p>
    </div>
  </div>

  <div
    v-if="props.damageImmunities.length != 0"
    class="defenses-container sub-container"
  >
    <h4>damage immunities</h4>
    <div
      v-for="immunity in props.damageImmunities"
      :key="immunity"
    >
      <p class="defense-type">
        {{ immunity }}<span class="defense-label">imm</span>
      </p>
    </div>
  </div>

  <div
    v-if="props.conditionImmunities.length != 0"
    class="defenses-container sub-container"
  >
    <h4>condition immunities</h4>
    <div
      v-for="immunity in props.conditionImmunities"
      :key="immunity"
    >
      <p class="defense-type">
        {{ immunity }}<span class="defense-label">imm</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  damageVulnerabilities: { type: Array, default: () => [''] },
  damageResistances: { type: Array, default: () => [''] },
  damageImmunities: { type: Array, default: () => [''] },
  conditionImmunities: { type: Array, default: () => [''] }
})

</script>

<style>

.defenses-container {
    display: flex;
    flex-flow: row wrap;
    place-items: flex-start;
    gap: var(--space-md);
    border-radius: var(--space-sm);
    padding: var(--space-lg);
}

.score-value {
    font-size: var(--h-size-sm);
    font-weight: 600;
    color: white;
}

.defense-type {
    font-weight: 600;
}

.defense-label {
    font-weight: 300;
    font-size: var(--p-size-xs);
    color: var(--grey-dk);
    margin: var(--space-xs);
    padding: var(--space-xxs) var(--space-xs);
    border-radius: var(--space-xs);
    background: var(--HP-low);
}
</style>
