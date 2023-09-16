<template>
  <div class="bio-container sub-container">
    <h1 class="name">
      {{ props.name }}
    </h1>

    <div class="types-container">
      <p>{{ props.size }} {{ props.type }}</p>
      <p>{{ props.alignment }}</p>
      <p>{{ props.xpGained }} XP</p>
      <p>chal. {{ props.challengeRating }}</p>
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
  grid-template-columns: 1fr max-content;
  gap: var(--space-xxxl);
  padding: var(--space-lg);
}

.name {
  place-self: center;
  padding: var(--space-sm) var(--space-xl);
  font-size: var(--h-size-xl);
}

.types-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
  place-content: center;
}

.types-container > p {
  flex: 1 0 auto;
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--space-xs);
  background: var(--grey-dk);
}
</style>
