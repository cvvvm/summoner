<template>
  <div class="bio-container sub-container">
    <h2 class="name">
      {{ props.name }}
    </h2>

    <div class="types-container">
      <p>{{ props.size }} {{ props.type }}</p>
      <p>{{ props.alignment }}</p>
      <p>{{ props.xpGained }} XP</p>
      <p>challenge: {{ props.challengeRating }}</p>
    </div>
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
  challengeRating: { type: Number, default: 0 },
  xpGained: { type: Number, default: 0 }
})

</script>

<style>
.bio-container {
  /* grid-area: bio; */
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr auto;
  place-items: center start;
  gap: var(--space-md);
  padding: var(--space-xl);
}

.name {
  place-self: end start;
  font-size: var(--h-size-md);
}

.challenge-container {
  color: white;
}

.types-container {
  grid-column: span 2; /* temp layout */
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: var(--space-md);
  place-self: start stretch;
  place-items: center space-between;
}
</style>
