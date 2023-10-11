<template>
  <div
    className="backdrop"
    @click.self="closeModal"
  >
    <div class="summon-mob-container">
      <button @click="$emit('close')">
        X
      </button>
      <input
        v-model="mobSearch"
        placeholder="search for mobs..."
        @keypress.enter="$emit('summonMob', mobSearch); $emit('close')"
      >
      <button
        type="submit"
        @click="$emit('summonMob', mobSearch); $emit('close')"
      >
        Add
      </button>
      <ul>
        <li
          v-for="mob in props.searchList"
          :key="mob"
        >
          {{ mob.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['close', 'summonMob'])
const mobSearch = ref('Androsphinx')

const props = defineProps({
  searchList: { type: Array, default: () => {} }
})

function closeModal () {
  emit('close')
}
</script>

<style>
  .summon-mob-container {
    position: relative;
    flex: 0 1 auto;
    max-width: 800px;
    height: fit-content;
    padding: 2rem;
    top: 25%;
    border-radius: var(--space-lg);
    background: white;
  }
  .backdrop {
    overflow: auto;
    position: fixed;
    display: flex;
    place-content: center;
    place-items: flex-start;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background: rgba(0,0,0,.5);
  }
</style>
