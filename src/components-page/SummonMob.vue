<template>
  <!-- backdrop -->
  <div
    class="fixed flex-initial flex
      place-content-center place-items-center
      top-0 left-0 h-full w-full
      bg-zinc-700 bg-opacity-75"
    @click.self="closeSummonModal"
    @keypress.esc="closeSummonModal"
  >
    <!-- summon container -->
    <div
      class="
      relative flex-initial
      grid grid-cols-1 gap-4
      max-w-sm
      p-8 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
      <input
        v-model="mobSearch"
        placeholder="who to summon?"
        class="p-2 rounded-md
        text-zinc-700"
        @input="onChange"
        @keypress.enter="$emit('summonMob', mobSearch); $emit('close')"
      >
      <div class="flex place-content-between gap-4">
        <button @click="$emit('close')">
          cancel
        </button>
        <button
          type="submit"
          class="warn"
          @click="$emit('summonMob', mobSearch); $emit('close')"
        >
          summon
        </button>
      </div>
    </div>

    <!-- {{ searchList }} -->

    <!-- mob search list -->
    <div
      class="relative flex-initial
      grid grid-cols-1 gap-4
      max-w-sm
      p-8 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
      <h3>full list</h3>
      <ul>
        <li
          v-for="mob in props.searchList"
          :key="mob"
          @click="mobSearch = mob.name"
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
// const searchSuggRes = ref([])

const props = defineProps({
  searchList: { type: Array, default: () => {} }
})

function closeSummonModal () {
  emit('close')
}

/* function onChange () {
  searchSuggRes.value = props.searchList.filter(item => item.toLowerCase().indexOf(searchSuggRes.value.toLowerCase()) > -1)
} */
</script>

<style>
</style>
