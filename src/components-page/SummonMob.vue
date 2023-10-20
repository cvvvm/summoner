<template>
  <!-- backdrop -->
  <div
    class="fixed z-[9999]
      flex-initial flex flex-wrap gap-12
      place-content-center place-items-center
      top-0 bottom-0 left-0 right-0
      max-h-full h-full w-full
      bg-zinc-700 bg-opacity-75
      scoll"
    @click.self="$emit('closeSummonModal')"
    @keypress.esc="$emit('closeSummonModal')"
  >
    <!-- summon card -->
    <div
      class="grid grid-cols-1 gap-8
      items-start justify-items-stretch
      max-h-[75vh] w-[30rem] max-w-[95vw]
      p-6 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
      <!-- input/buttons container -->
      <div class="grid grid-cols-1 gap-4">
        <!-- buttons -->
        <button
          class="place-self-start px-1 hover:bg-red-600 hover:text-red-300"
          @click="$emit('closeSummonModal')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <input
          v-model="mobSearchInput"
          placeholder="who to summon?"
          class="p-2 rounded-md
        text-zinc-700"
          @input="updateSearchSuggest()"
          @keypress.enter="$emit('summonMob', mobSearchInput); $emit('closeSummonModal')"
        >
      </div>

      <!-- mob search list -->

      <div
        class="flex flex-row flex-wrap gap-3
                max-h-[50vh]
                overflow-y-auto"
      >
        <button
          v-for="mob in searchSuggest"
          :key="mob"
          class="px-3 py-1 rounded-sm text-base bg-zinc-700 hover:bg-yellow-500 hover:text-yellow-950 transition-colors"
          @click="$emit('summonMob', mob.slug)"
        >
          {{ mob.name }}
        </button>
      </div><!-- end search list -->
    </div><!-- end summon card -->
  </div> <!-- end backdrop -->
</template>

<script setup>
import { mobNames } from '../open5e-monster-names'
// import { allMobs } from '../../public/mobs-txt/open5e-monsters'
import { ref } from 'vue'
defineEmits(['closeSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const searchSuggest = ref()

function updateSearchSuggest () {
  searchSuggest.value = mobNames.list.filter(mob => mob.name.includes(mobSearchInput.value))
  // alphabetize list
  searchSuggest.value = searchSuggest.value.sort((a, b) => {
    const fa = a.name.toLowerCase(); const fb = b.name.toLowerCase()
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
}

updateSearchSuggest()

</script>

<style>
</style>
