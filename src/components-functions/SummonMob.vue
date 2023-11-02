<template>
  <!-- card page container -->
  <!------------------------------------------------>
  <div
    class="
    fixed z-[8000]
    grid
    grid-rows-[1fr,_min-content]
    xs:grid-rows-[min-content,_1fr]
    items-center
    h-full
    w-full max-w-[100dvw] sm:w-fit
    overflow-x-hidden
    p-4
    bg-neutral-950 border-r border-yellow-500"
  >
    <!-- close button -->
    <button
      class="
      order-2 xs:order-1
      self-end justify-self-start xs:place-self-start
      px-3 py-2 hover:bg-red-600 hover:text-red-200"
      @click="$emit('toggleSummonModal')"
    >
      <i class="bi bi-x-lg" />
    </button>
    <!-- summon card -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      order-1 xs:order-2
      grid grid-cols-1
      items-start justify-items-stretch
      p-2
      w-full sm:min-w-[275px] sm:max-w-[300px]"
    >
      <!-- input/buttons container -->
      <!------------------------------------------------>
      <div
        class="
        flex flex-row flex-wrap gap-2"
      >
        <!-- seach bar -->
        <input
          v-model="mobSearchInput"
          placeholder="find monsters"
          spellcheck="false"
          class="
      flex-auto
      px-2 py-1 rounded-md
      text-neutral-400
      bg-neutral-800
      border border-neutral-700 hover:border-neutral-500
      transition colors"
          @input="searchMobs"
        >
        <!-- results number -->
        <p class="w-full text-center mb-2">
          monsters: {{ searchSuggestNum }}
        </p>
      </div>

      <!-- mob search list -->
      <div
        v-show="isSearchOpen || isBrowseOpen"
        class="
        flex flex-col gap-2
        place-content-start
        overflow-y-auto
        transition-all"
        :class="searchSuggHt"
      >
        <div
          v-for="mob in searchSuggest.slice(0, searchLimitAmount)"
          :key="mob"
          class="
          grid grid-cols-[1fr,_min-content] gap-1
          items-center
          transition-colors"
        >
          <button
            class="
            px-4 py-2 rounded-sm
            text-sm text-left
            bg-neutral-900 hover:bg-yellow-500
            hover:text-yellow-950"
            @click="$emit('summonMob', mob.slug); confirmSummon(mob);"
          >
            {{ mob.name }}
          </button>
          <!-- pin to faves -->
          <!-- <i
            class="
            bi bi-pin-angle-fill
            p-2 rounded-sm
            text-sm text-left
            bg-neutral-900 hover:bg-yellow-500
            hover:text-yellow-950"
            @click="faveList.push(mob.name)"
          /> -->
        </div>
        <button
          v-show="searchSuggestNum >= searchLimitAmount"
          @click="searchLimitAmount += 50"
        >
          load more
        </button>
      </div><!-- end search list -->
    </div><!-- end summon card -->

    <!-- open browser-all monsters -->
    <button
      class="order-3 justify-self-start"
      @click="browseAllMobs"
    >
      browse all
    </button>
  </div> <!-- end card page container -->
</template>

<script setup>
import { mobNames } from '../open5e-monster-names'
// import { allMobs } from '../../public/mobs-txt/open5e-monsters'
import { ref } from 'vue'
defineEmits(['toggleSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const isSearchOpen = ref(false)
const isBrowseOpen = ref(false)
const searchSuggest = ref([])
const searchLimitAmount = ref(50)
// const faveList = ref([])
const searchSuggestNum = ref(searchSuggest.value.length)
const searchSuggHt = ref('h-[0vh]')

// update search results
function updateSearchSuggest () {
  searchSuggest.value = mobNames.list.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
  searchSuggestNum.value = searchSuggest.value.length
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

// search mobs
function searchMobs () {
  isBrowseOpen.value = false
  searchLimitAmount.value = 50
  updateSearchSuggest()
  if (mobSearchInput.value === '') {
    searchSuggHt.value = ' h-[0vh] '
    searchSuggestNum.value = 0
    isSearchOpen.value = false
  } else {
    searchSuggHt.value = ' max-h-[60vh] p-2 pt-0'
    isSearchOpen.value = true
  }
}

// open suggestions
function browseAllMobs () {
  mobSearchInput.value = ''
  searchLimitAmount.value = 50
  if (isBrowseOpen.value) {
    searchSuggHt.value = ' h-[0vh] '
    searchSuggestNum.value = 0
    setTimeout(() => {
      isBrowseOpen.value = false
    }, '225')
  } else if (!isBrowseOpen.value) {
    isBrowseOpen.value = true
    updateSearchSuggest()
    setTimeout(() => {
      searchSuggHt.value = ' h-[60vh] p-2 pt-0'
    }, '50')
    isSearchOpen.value = false
  }
}

// confirm summon text
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
