<template>
  <div class="bio-container">
    <h2 class="name">
      {{ props.name }}
    </h2>
    <div class="challenge-container">
      <p>{{ props.challengeRating }}</p>
      <p>{{ props.xpGained }}</p>
    </div>

    <div class="types-container">
      <div class="type-col">
        <p>
          {{ props.size }}
        </p>
      </div>

      <div class="type-col">
        <p>
          {{ props.type }}
        </p>
      </div>

      <div class="type-col">
        <p>
          {{ props.alignment }}
        </p>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="types-container">
    <div class="type-col">
      <p>
        {{ props.size }}
      </p>
    </div>

    <div class="type-col">
      <p>
        {{ props.type }}
      </p>
    </div>

    <div class="type-col">
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
.types-container {

  grid-column: span 2; /* temp layout */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--space-md);
  background: black;
}
.type-col {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
 -->

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
  grid-template-columns: 1fr .25fr;
  place-content: center;
  background: black;
  border-radius: var(--space-md);
  overflow: hidden;
}

.name {
  place-self: end start;
  padding: var(--space-md) var(--space-xl);
  color: white;
  font-size: var(--h-size-md);
}

.challenge-container {
  color: white;
}

.types-container {

  grid-column: span 2; /* temp layout */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  color: white;
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--space-md);
  background: black;
}
.type-col {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>
