<template>
  <div
    className="backdrop"
    @click.self="closeModal"
  >
    <!-- search container -->
    <div class="summon-mob-container">
      <button @click="$emit('close')">
        X
      </button>
      <input
        v-model="mobSearch"
        placeholder="who to summon?"
        @input="onChange"
        @keypress.enter="$emit('summonMob', mobSearch); $emit('close')"
      >
      <button
        type="submit"
        @click="$emit('summonMob', mobSearch); $emit('close')"
      >
        Add
      </button>
      <h3>result list</h3>
      <ul>
        <li
          v-for="mob in searchSuggRes"
          :key="mob"
        >
          {{ mob.name }}
        </li>
      </ul>

      {{ searchList }}

      <!-- mob search list -->
      <h3>full list</h3>
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
const searchSuggRes = ref([])

const props = defineProps({
  searchList: { type: Array, default: () => {} }
})

function closeModal () {
  emit('close')
}

function onChange () {
  searchSuggRes.value = props.searchList.filter(item => item.toLowerCase().indexOf(searchSuggRes.value.toLowerCase()) > -1)
}
</script>

<style>
  .summon-mob-container {
    position: relative;
    flex: 0 1 auto;
    max-width: 90vw;
    height: 90vh;
    padding: 2rem;
    top: 15%;
    border-radius: var(--space-md);
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
