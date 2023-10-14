<template>
  <!-- SPECIAL ABILITIES -->
  <div class="sp-abilities-container container-lvl1 py-4">
    <h2 class="text-lg px-4">
      abilities
    </h2>
    <div
      v-for="ability in props.specialAbilities"
      :key="ability"
      class="sp-ability-block container-lvl2"
    >
      <h3 class="text-zinc-100">
        {{ ability.name.toLowerCase() }}
      </h3>
      <div class="sp-ability-desc-block">
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
    grid-template-columns: 1fr;
    place-items: start stretch;
  }
  .sp-ability-block {
    display: grid;
    gap: var(--space-md);
    place-content: start;
    padding: var(--space-md);
    border-radius: var(--space-xs);
    background: var(--grey-dk);
  }
  .sp-ability-desc-block {
    display: grid;
    gap: var(--space-md);
    color: var(--grey-lt);
}

</style>
