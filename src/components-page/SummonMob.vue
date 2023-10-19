<template>
  <!-- backdrop -->
  <div
    class="fixed z-[9999]
      flex-initial flex flex-wrap gap-12
      place-content-center place-items-center
      top-0 bottom-0 left-0 right-0
      max-h-full h-full w-full
      bg-zinc-700 bg-opacity-75"
    @click.self="$emit('closeSummonModal')"
    @keypress.esc="$emit('closeSummonModal')"
  >
    <!-- summon container -->
    <div
      class="
      relative flex-initial
      grid grid-cols-1 gap-4
      max-w-sm
      p-6 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
      <input
        v-model="mobSearchInput"
        placeholder="who to summon?"
        class="p-2 rounded-md
        text-zinc-700"
        @input="updateSearchSuggest()"
        @keypress.enter="$emit('summonMob', mobSearchInput); $emit('closeSummonModal')"
      >
      <!-- buttons -->
      <div class="grid grid-cols-2 gap-4">
        <button @click="$emit('closeSummonModal')">
          cancel
        </button>
        <button
          type="submit"
          class="warn"
          @click="$emit('summonMob', mobSearchInput); $emit('closeSummonModal')"
        >
          summon
        </button>
      </div>
    </div>

    <!-- mob search list -->
    <Transition
      name=""
      slide-down
    >
      <div
        class="relative flex-initial
      flex flex-row flex-wrap gap-4
      max-h-[50vh] max-w-[95vw]
      p-4 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600
      overflow-y-auto"
      >
        <ul
          class="flex flex-row flex-wrap gap-4
              max-h-full"
        >
          <li
            v-for="mob in searchSuggest"
            :key="mob"
            class="px-3 py-1 bg-zinc-700 hover:bg-zinc-500 hover:text-zinc-800 transition-colors"
            @click="mobSearchInput = mob.slug"
          >
            {{ mob.name }}
            {{ mob.hit_points }}
          </li>
        </ul>
      </div> <!-- end search list -->
    </Transition>
  </div> <!-- end backdrop -->
</template>

<script setup>
// import { mobNames } from '../open5e-monster-names'
import { allMobs } from '../open5e-monsters'
import { ref } from 'vue'
defineEmits(['closeSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const searchSuggest = ref()

function updateSearchSuggest () {
  searchSuggest.value = allMobs.list.filter(mob => mob.name.includes(mobSearchInput.value))
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
