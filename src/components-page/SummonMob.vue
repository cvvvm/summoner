<template>
  <!-- open button -->
  <button
    @click="toggleSummonModal()"
  >
    + summon
  </button>

  <!-- card container -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <Transition
    appear
    name="scale-fade"
  >
    <div
      v-show="isSummonModalOpen"
      class="fixed z-[9999]
            flex
            place-content-center place-items-center
            top-0 bottom-0 left-0 right-0
            max-h-full h-full w-full"
      @click.self="toggleSummonModal()"
      @keypress.esc="toggleSummonModal()"
    >
      <!-- summon card -->
      <!------------------------------------------------>
      <div
        class="fixed
              grid grid-cols-1 gap-4
              items-start justify-items-stretch
               max-h-[75vh] w-[30rem] max-w-[95vw]
              p-6 rounded-xl
              bg-black
              border border-yellow-600"
      >
        <!-- input/buttons container -->
        <!------------------------------------------------>
        <div class="flex gap-4 items-center">
          <!-- buttons -->
          <button
            class="px-1 hover:bg-red-600 hover:text-red-300"
            @click="toggleSummonModal()"
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
            @keypress.enter="$emit('summonMob', mobSearchInput); toggleSummonModal()"
          >
        </div>

        <p class="place-self-center">
          monsters: {{ searchSuggest.length }}
        </p>
        <!-- mob search list -->
        <div
          class="flex flex-row flex-wrap gap-2
                place-content-start
                h-[30rem] max-h-[80vh]
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
    </div> <!-- end card container -->
  </Transition>

  <!-- backdrop -->
  <Transition
    appear
    name="fade"
  >
    <div
      v-show="isSummonModalOpen"
      class="fixed z-[8000]
    flex
    place-content-center place-items-center
    top-0 bottom-0 left-0 right-0
    max-h-full h-full w-full
    bg-black bg-opacity-75"
    />
  </Transition>
</template>

<script setup>
import { mobNames } from '../open5e-monster-names'
// import { allMobs } from '../../public/mobs-txt/open5e-monsters'
import { ref } from 'vue'
defineEmits(['closeSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const searchSuggest = ref()

// open summoning window
// -----------------------------------------------------------
const isSummonModalOpen = ref(false)
function toggleSummonModal () {
  isSummonModalOpen.value = !isSummonModalOpen.value
}

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
