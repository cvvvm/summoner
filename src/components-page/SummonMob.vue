<template>
  <!-- search backdrop -->
  <div
    class="fixed flex-initial flex
      place-content-center place-items-center
      top-0 left-0 h-full w-full
      bg-zinc-700 bg-opacity-75"
    @click.self="closeModal"
  >
    <!-- search container -->
    <div
      class="
      relative flex-initial
      max-w-sm
      p-8 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
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

      <!-- {{ searchList }} -->

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

/* function onChange () {
  searchSuggRes.value = props.searchList.filter(item => item.toLowerCase().indexOf(searchSuggRes.value.toLowerCase()) > -1)
} */
</script>

<style>
</style>
