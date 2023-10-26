<template>
  <!-- summon card -->
  <!------------------------------------------------>
  <div
    class="grid grid-cols-1 gap-4
            items-start justify-items-stretch
            w-full
            p-6 rounded-xl
            bg-black"
  >
    <!-- input/buttons container -->
    <!------------------------------------------------>
    <div class="flex gap-4 items-center">
      <!-- buttons -->
      <button
        class="px-1 hover:bg-red-600 hover:text-red-300"
        @click="$emit('toggleSummonModal')"
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
        class="flex-1
                p-2 rounded-md
                text-neutral-800
                bg-neutral-300"
        @input="updateSearchSuggest()"
      >
    </div>

    <p class="place-self-center">
      monsters: {{ searchSuggest.length }}
    </p>
    <!-- mob search list -->
    <div
      class="flex flex-row flex-wrap gap-2
                place-content-start
                h-[40vh] xs:h-[12rem]
                overflow-y-auto"
    >
      <button
        v-for="mob in searchSuggest"
        :key="mob"
        class="px-4 py-2 rounded-sm text-base bg-neutral-800 hover:bg-yellow-500 hover:text-yellow-950 transition-colors"
        @click="$emit('summonMob', mob.slug)"
      >
        {{ mob.name }}
      </button>
    </div><!-- end search list -->
  </div><!-- end summon card -->
</template>

<script setup>
import { mobNames } from '../open5e-monster-names'
// import { allMobs } from '../../public/mobs-txt/open5e-monsters'
import { ref } from 'vue'
defineEmits(['toggleSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const searchSuggest = ref()

function updateSearchSuggest () {
  searchSuggest.value = mobNames.list.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
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
