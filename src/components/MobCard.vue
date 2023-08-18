<template>
  <div class="mob-card">
    <!-- edit -->
    <div class="mob-edit-buttons-container">
      <button class="mob-edit-button">
        edit
      </button>
      <button class="mob-edit-button">
        duplicate
      </button>
    </div>
    <!-- bio -->
    <MobBio
      :name="props.name"
      :desc="props.desc"
      :avatar="props.avatar"
    />
    <!-- HP controls -->
    <MobHpControls :base-hp="props.baseHp" />
  </div>
</template>

<script setup>
import MobHpControls from './MobHpControls.vue'
import MobBio from './MobBio.vue'

const props = defineProps({
  name: { type: String, default: '' },
  desc: { type: String, default: '' },
  baseHp: { type: Number, default: 0 },
  avatar: { type: String, default: '' },
  items: { type: Array, default: () => {} }
})

</script>

<style>
.mob-card {
  display: grid;
  gap: 16px;
  grid-template-areas:
    'edit edit edit'
    'bio bio bio'
    'bio bio bio'
    'hp-buttons . .';
  grid-template-columns: 150px 1fr 1fr;
  grid-template-rows: .25fr .75fr 1fr auto;
  padding: var(--space-lg);
  background: white;
  border: var(--border-w) black;
  border-radius: var(--space-md);
}

.mob-edit-buttons-container {
  grid-area: edit;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr 1fr;
  justify-content: space-evenly;
}

.mob-edit-button {
  padding: 8px 16px;
}
</style>
