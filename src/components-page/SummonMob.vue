<template>
  <!-- card page container -->
  <!------------------------------------------------>
  <div
    class="fixed z-[8000]
              max-w-[100dvw] sm:max-w-[600px]
              h-[100dvh]
              p-4"
  >
    <!-- summon card -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="grid grid-cols-1 gap-4
            items-start justify-items-stretch
            h-full
            p-6 rounded-xl
            bg-black
            border-2 border-yellow-500"
    >
      <!-- input/buttons container -->
      <!------------------------------------------------>
      <div
        class="flex flex-row flex-wrap gap-4 items-center"
      >
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

        <!-- seach bar -->
        <input
          v-model="mobSearchInput"
          placeholder="who to summon?"
          class="flex-1
                p-2 rounded-md
                text-neutral-800
                bg-neutral-300"
          @input="updateSearchSuggest()"
        >
        <!-- results number -->
        <p class="text-center w-full">
          monsters: {{ searchSuggest.length }}
        </p>
      </div>

      <!-- mob search list -->
      <div
        class="flex flex-row flex-wrap gap-2
                place-content-start
                h-full
                overflow-y-auto"
      >
        <button
          v-for="mob in searchSuggest"
          :key="mob"
          class="px-4 py-2 rounded-sm text-base bg-neutral-800 hover:bg-yellow-500 hover:text-yellow-950 transition-colors"
          @click="$emit('summonMob', mob.slug); confirmSummon(mob);"
        >
          {{ mob.name }}
        </button>
      </div><!-- end search list -->
    </div><!-- end summon card -->
  </div> <!-- end card page container -->
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
// fire on load, loads all monsters
updateSearchSuggest()

function confirmSummon (x) {
  const nameHold = x.name
  x.name = 'summoned'
  setTimeout(() => {
    x.name = nameHold
  }, '750')
}

</script>

<style>
</style>
