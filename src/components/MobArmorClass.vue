<template>
  <!-- ARMOR -->

  <!-- NO EQUIPPED ARMOR -->
  <div v-if="!props.armorClass.armor">
    <div
      v-for="(armorKey, index) in props.armorClass"
      :key="index"
      class="armor-container"
    >
      <span class="armor-label">AC:</span>
      {{ armorKey.value }}
      <span class="armor-label">{{ armorKey.type }}</span>
    </div>
  </div>

  <!-- IF EQUIPPED ARMOR -->
  <div
    v-if="props.armorClass.armor"
    class="armor-container"
  >
    <span class="armor-label">AC:</span>
    {{ props.armorClass.value }}
    <span class="armor-label">{{ props.armorClass.type }}</span>

    <!-- EQUIPPED ITEMS -->
    <div class="armor-equipped-container">
      <div
        v-for="equipArmor in props.armorClass.armor"
        :key="equipArmor.index"
        class="armor-equipped-item"
      >
        <p>+ {{ equipArmor.name.toLowerCase() }}</p>
        <!-- <p>
          URL: {{ equipArmor.url }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  armorClass: { type: Array, default: () => [''] }
})
</script>

<style>
  .armor-container {
  /* grid-area: armor; */
  display: grid;
  grid-template-columns: min-content .5fr 1fr;
  padding: var(--space-md);
  row-gap: var(--space-sm);
  place-items: center;
  background: black;
  border-radius: var(--space-md);

  color: white;
  font-size: var(--h-size-md);
  font-weight: 700;
}

.armor-label {
  text-align: center;
  font-size: var(--p-size-sm);
  color: var(--md-grey);
}

.armor-equipped-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-column: span 3;
  row-gap: var(--space-sm);
  place-self: stretch;
  color: var(--md-grey);
}

.armor-equipped-item {
  border-radius: var(--space-xs);
  padding: var(--space-sm);
  background: var(--dk-grey);
}
</style>
