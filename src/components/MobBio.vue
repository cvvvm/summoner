<template>
  <div class="mob-bio-container">
    <div class="mob-avatar-frame">
      <img
        :src="props.avatar"
        alt=""
        class="mob-avatar"
      >
    </div>
    <div class="mob-name-desc-container">
      <h2 class="mob-name">
        {{ props.name }}
      </h2>
      <p class="mob-desc">
        {{ props.desc }}
      </p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  avatar: { type: String, default: '' }
})

</script>

<style>
.mob-bio-container {
  grid-area: bio;
  display: grid;
  grid-template-columns: 1fr 2fr;
  background: black;
  border-radius: var(--space-md);
  overflow: hidden;
}

.mob-name-desc-container {
  display: grid;
  gap: var(--space-md);
  color: white;
  padding: var(--space-lg);
}

.mob-name {
  font-size: var(--h-size-md);
  place-self: end start;
}

.mob-desc {
  font-size: var(--p-size-md);
}

.mob-avatar-frame {
  aspect-ratio: 1/1.5;
  overflow: hidden;

}

.mob-avatar {
  object-fit: cover;
  width: 100%;
  height: 100%;

}
</style>
