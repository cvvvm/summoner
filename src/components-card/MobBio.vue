<template>
  <div class="bio-container container-lvl1">
    <h1 class="name">
      {{ props.name }}
    </h1>

    <div class="types-container">
      <p class="label">
        {{ props.size }} {{ props.type.toLowerCase() }}
      </p>
      <p class="label">
        {{ props.alignment }}
      </p>
    </div>
    <p class="label">
      challenge rating: {{ props.challengeRating }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  avatar: { type: String, default: '' },
  size: { type: String, default: '' },
  type: { type: String, default: '' },
  alignment: { type: String, default: '' },
  challengeRating: { type: Number, default: 0 }
})

</script>

<style>
.bio-container {
  /* grid-area: bio; */
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xxxl);
  padding: var(--space-lg);
}

.name {
  font-size: var(--h-size-xl);
  text-align: center;
}

.types-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
  place-content: center;
}
</style>
