<template>
  <!-- DEFENSES -->
  <div class="container-lvl1">
    <!-- dmg vul -->
    <div
      v-if="props.damageVulnerabilities.length != 0"
      class="defenses-container"
    >
      <div
        v-for="vulnerability in props.damageVulnerabilities.split(';')"
        :key="vulnerability"
      >
        <p class="label">
          {{ vulnerability }}<span class="defense-label">vul</span>
        </p>
      </div>
    </div>

    <!-- dmg res -->
    <div
      v-if="props.damageResistances.length != 0"
      class="defenses-container"
    >
      <div
        v-for="resistance in props.damageResistances.split(';')"
        :key="resistance"
      >
        <p class="label">
          {{ resistance }}<span class="defense-label">res</span>
        </p>
      </div>
    </div>

    <!-- dmg imm -->
    <div
      v-if="props.damageImmunities.length != 0"
      class="defenses-container "
    >
      <div
        v-for="immunity in props.damageImmunities.split(';')"
        :key="immunity"
      >
        <p class="label">
          {{ immunity }}<span class="defense-label">imm</span>
        </p>
      </div>
    </div>

    <!-- cond imm -->
    <div
      v-if="props.conditionImmunities.length != 0"
      class="defenses-container"
    >
      <div
        v-for="immunity in props.conditionImmunities.split(';')"
        :key="immunity"
      >
        <p class="label">
          {{ immunity }}<span class="defense-label">imm</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' }
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
