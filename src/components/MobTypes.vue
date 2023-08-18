<template>
  <div class="mob-types-container">
    <div class="mob-type-col">
      <p>size: </p>
      <p>
        {{ props.size }}
      </p>
    </div>

    <div class="mob-type-col">
      <p>
        type:
      </p>
      <p>
        {{ props.type }}
      </p>
    </div>

    <div class="mob-type-col">
      <p>alignment: </p>
      <p>
        {{ props.alignment }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' }
})
</script>

<style>
.mob-types-container {
  grid-area: type;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--space-md);
  background: black;
}
.mob-type-col {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
