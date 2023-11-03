<template>
  <!-- card -->
  <!------------------------------------------------>
  <div
    class="
    fixed z-[8000]
    top-2 xs:top-14
    bottom-16 xs:bottom-4
    left-2
    right-2 xs:right-auto
    grid gap-2
    grid-rows-[36px,_1fr,_min-content]
    max-w-full xs:w-[450px]
    p-4 rounded-xl
    bg-neutral-950 border border-yellow-500"
  >
    <!-- search bar -->
    <input
      v-model="mobSearchInput"
      :placeholder="searchPlacehold"
      spellcheck="false"
      class="
      flex-auto
      px-2 py-1 rounded-md
      text-neutral-400
      bg-neutral-800
      border border-neutral-700 hover:border-neutral-400
      transition colors"
      @input="searchMobs"
    >
    <SummonMobAll
      v-show="isSearchOpen"
      :mobs="searchSuggest"
      :search-limit="searchLimitAmount"
      @update-search-limit="updateSearchLimit()"
      @summon-mob="$emit('summonMob', $event)"
      @toggle-summon-modal="$emit('toggleSummonModal')"
      @add-fav="addFav($event)"
    />
    <SummonMobFavs
      v-show="!isSearchOpen"
      :fav-mobs="favMobsList"
      :search-limit="searchLimitAmount"
      @update-search-limit="updateSearchLimit()"
      @summon-mob="$emit('summonMob', $event)"
      @toggle-summon-modal="$emit('toggleSummonModal')"
    />

    <!-- buttons, results bar -->
    <!------------------------------------------------>
    <div class="flex gap-2 items-center justify-between">
      <!-- reset /show all -->
      <button
        class="
        border border-neutral-700
        bg-neutral-900"
        @click="browseAllMobs"
      >
        {{ mobSearchInput ? 'reset' : 'all' }}
      </button>

      <!-- results number -->
      <p class="text-center">
        monsters: {{ searchNum }}
      </p>
      <p>search: {{ isSearchOpen }}</p>

      <!-- toggle all/favorites -->
      <button
        :class="isSearchOpen ? 'bi-heart' : 'bi-search'"
        class="
        bi
        p-2 leading-none
        border border-neutral-700
        hover:text-yellow-500
        bg-neutral-900 hover:bg-neutral-800"
        @click="toggleAllOrFavs"
      />
    </div>
  </div> <!-- end card -->
</template>

<script setup>
import { mobNames } from '../open5e-monster-names'
import SummonMobAll from './SummonMobAll.vue'
import SummonMobFavs from './SummonMobFavs.vue'
import { reactive, ref } from 'vue'
defineEmits(['toggleSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const isSearchOpen = ref(false)
const searchPlacehold = ref('search favorites')
const searchSuggest = ref([])
const favMobsList = reactive([{ name: 'a-mi-kuk', slug: 'a-mi-kuk' }, { name: 'gassy', slug: 'gay' }])
const searchNum = ref(searchSuggest.value.length)
const searchLimitAmount = ref(100)

// toggle between search all / search faves
function toggleAllOrFavs () {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) { searchPlacehold.value = 'search favorites' } else if (isSearchOpen.value) { searchPlacehold.value = 'search all monsters' }
}

// add fav mob
function addFav (e) {
  let match = false
  favMobsList.forEach(fav => {
    if (fav.name === e.name) match = true
  })
  if (!match) {
    favMobsList.push({ name: e.name, slug: e.slug })
  }
}

// update search limit
function updateSearchLimit () {
  searchLimitAmount.value += 100
}

// update search results - all
function updateSearchSuggestAll () {
  searchSuggest.value = mobNames.list.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
  searchNum.value = searchSuggest.value.length
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
// update search results - favs
function updateSearchSuggestFavs () {
  searchSuggest.value = favMobsList.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
  searchNum.value = searchSuggest.value.length
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
updateSearchSuggestAll()

// open suggestions
function browseAllMobs () {
  mobSearchInput.value = ''
  updateSearchSuggestAll()
  searchLimitAmount.value = 100
}

// search mobs
function searchMobs () {
  searchLimitAmount.value = 100
  if (isSearchOpen.value) {
    updateSearchSuggestAll()
    if (mobSearchInput.value === '') {
      searchNum.value = 0
    }
  } else if (!isSearchOpen.value) {
    updateSearchSuggestFavs()
  }
}

</script>

<style>
</style>
