<template>
  <!-- ARMOR -->

  <!-- NO EQUIPPED ARMOR -->
  <div v-if="!props.armorClass.armor">
    <div
      v-for="(armorKey, index) in props.armorClass"
      :key="index"
      class="val-container"
    >
      <div>armor</div>
      <div class="val-lg">
        {{ armorKey.value }}
      </div>
      <span class="label">{{ armorKey.type }}</span>
    </div>
  </div>

  <!-- IF EQUIPPED ARMOR -->
  <div
    v-if="props.armorClass.armor"
    class="armor-container"
  >
    <div class="val-container">
      <div>armor</div>
      <div class="val-lg">
        {{ props.armorClass.value }}
      </div>
      <div class="label">
        {{ props.armorClass.type }}
      </div>
    </div>

    <!-- EQUIPPED ITEMS -->
    <div class="armor-equipped-container">
      <div
        v-for="equipArmor in props.armorClass.armor"
        :key="equipArmor.index"
        class="armor-equipped-item"
      >
        <p>{{ equipArmor.name.toLowerCase() }}</p>
        <!-- <p>
          URL: {{ equipArmor.url }}
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  armorClass: { type: Object, default: () => { } }
})
</script>

<style>
  .armor-container {
  /* grid-area: armor; */
  display: grid;
  grid-template-columns: min-content 1fr;
  gap: var(--space-md);
  place-items: start stretch;
}

.armor-equipped-container {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--space-sm);
}

.armor-equipped-item {
  color: var(--grey-lt);
  background: var(--grey-dk);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--space-sm);
}
</style>
