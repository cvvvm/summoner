<template>
  <div class="bio-container sub-container">
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
      <p class="label">
        chal. {{ props.challengeRating }}
      </p>
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
  challengeRating: { type: String, default: '' }

})

</script>

<style>
.bio-container {
  /* grid-area: bio; */
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: var(--space-xxxl);
  padding: var(--space-lg);

  align-content: center;
  align-items: center;
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
</style>
