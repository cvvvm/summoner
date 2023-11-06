<template>
  <!-- card -->
  <!------------------------------------------------>
  <div
    class="
    fixed z-[8000]
    top-16
    bottom-14
    right-2 xs:right-4
    left-2 xs:left-auto
    grid gap-2
    grid-rows-[min-content,_1fr,_min-content]
    max-w-full xs:w-[450px]
    p-2 rounded-xl
    bg-neutral-950 border"
    :class="isSearchOpen ? 'border-green-500 ' : 'border-pink-400 '"
    @keydown.down="selectNextMobResult"
    @keydown.up="selectLastMobResult"
  >
    <!-- search + toggles container -->
    <!------------------------------------------------>
    <div
      class="
      grid grid-cols-1 xxs:grid-cols-[max-content,_1fr]
      gap-2
      content-center
      m-2"
    >
      <!-- toggle all/favorites -->
      <div>
        <button
          :class="isSearchOpen ?
            'text-green-950 hover:text-green-900 bg-green-500 hover:bg-green-600' :
            'bg-neutral-800 hover:bg-neutral-700 hover:text-green-500'"
          class="
          bi bi-search leading-none
          p-3 rounded-e-none"
          @click="toggleAllOrFavs"
        />
        <button
          :class="!isSearchOpen ?
            'bi-heart-fill text-pink-230 hover:text-pink-300 bg-pink-500 hover:bg-pink-600' :
            'bi-heart bg-neutral-800 hover:bg-neutral-700 hover:text-pink-500'"
          class="
          bi leading-none
          p-3 rounded-s-none"
          @click="toggleAllOrFavs()"
        />
      </div>
      <!-- search bar -->
      <input
        v-model="mobSearchInput"
        :placeholder="searchPlacehold"
        spellcheck="false"
        class="
        w-full
        px-2 py-1 rounded-md
        text-neutral-400
        bg-neutral-800
        border border-neutral-700 hover:border-neutral-400
        transition colors"
        @input="searchMobs"
      >
    </div>

    <SummonMobAll
      v-show="isSearchOpen"
      id="summonPanel"
      :mobs="searchAllResult"
      :search-limit="searchLimitAmount"
      @update-search-limit="updateSearchLimit()"
      @summon-mob="$emit('summonMob', $event)"
      @toggle-summon-modal="$emit('toggleSummonModal')"
      @add-fav="addFav($event)"
    />

    <SummonMobFavs
      v-show="!isSearchOpen"
      id="summonPanel"
      :fav-mobs="searchFavResult"
      :search-limit="searchLimitAmount"
      @update-search-limit="updateSearchLimit()"
      @summon-mob="$emit('summonMob', $event)"
      @toggle-summon-modal="$emit('toggleSummonModal')"
      @remove-fav="removeFav($event)"
    />

    <!-- buttons, results bar -->
    <!------------------------------------------------>
    <div
      class="
      flex gap-2
      items-center justify-between
      m-2"
    >
      {{ selectIndex }}
      <!-- results number -->
      <p class="text-center">
        {{ isSearchOpen ? 'monsters:' : 'favorites:' }} {{ isSearchOpen ? searchAllNum : searchFavNum }}
      </p>
    </div>
  </div> <!-- end card -->
</template>

<script setup>
import { reactive, ref } from 'vue'
import { mobNames } from '../open5e-monster-names'
import SummonMobAll from './SummonMobAll.vue'
import SummonMobFavs from './SummonMobFavs.vue'

defineEmits(['toggleSummonModal', 'summonMob'])

const mobSearchInput = ref('')
const isSearchOpen = ref(true)
const searchPlacehold = ref('search all monsters')
const searchAllResult = ref([])
const searchFavResult = ref([])
const favMobsList = reactive([])
const searchAllNum = ref(searchAllResult.value.length)
const searchFavNum = ref(searchFavResult.value.length)
const searchLimitAmount = ref(100)

// arrow select mob
// -----------------------------------------------------------
const selectIndex = ref(0)
// select last
function selectLastMobResult () {
  if (selectIndex.value === 0) selectIndex.value = (searchLimitAmount.value - 1)
  //
  const mob = document.querySelector('#summonPanel')
    .children[0].children[selectIndex.value]
  //
  mob.setAttribute('tabindex', '0')
  mob.focus()
  //
  selectIndex.value--
}
// select next
function selectNextMobResult () {
  if (selectIndex.value === searchLimitAmount.value - 1) selectIndex.value = 0
  //
  const mob = document.querySelector('#summonPanel')
    .children[0].children[selectIndex.value]
  //
  mob.setAttribute('tabindex', '0')
  mob.focus()
  //
  selectIndex.value++
}

// toggle between search all / search faves
function toggleAllOrFavs () {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    updateSearchFavResult()
    searchPlacehold.value = 'search favorites'
  } else if (isSearchOpen.value) {
    updateSearchAllResult()
    searchPlacehold.value = 'search all monsters'
  }
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

// remove fav mob
function removeFav (e) {
  let i = 0
  favMobsList.forEach(fav => {
    if (fav.name === e.name) {
      favMobsList.splice(i, 1)
    }
    i++
  })
  updateSearchFavResult()
}

// update search limit
function updateSearchLimit () {
  searchLimitAmount.value += 100
}

// update search results - all
function updateSearchAllResult () {
  searchAllResult.value = mobNames.list.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
  searchAllNum.value = searchAllResult.value.length
  // alphabetize list
  searchAllResult.value = searchAllResult.value.sort((a, b) => {
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
function updateSearchFavResult () {
  searchFavResult.value = favMobsList.filter(mob => mob.name.includes(mobSearchInput.value.toLowerCase()))
  searchFavNum.value = searchFavResult.value.length
  // alphabetize list
  searchFavResult.value = searchFavResult.value.sort((a, b) => {
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
updateSearchAllResult()
updateSearchFavResult()

// search mobs
function searchMobs () {
  searchLimitAmount.value = 100
  if (isSearchOpen.value) {
    updateSearchAllResult()
    if (mobSearchInput.value === '') {
      searchAllNum.value = 0
    }
  } else if (!isSearchOpen.value) {
    updateSearchFavResult()
  }
}

</script>

<style>
#summonPanel div:focus {
  @apply border-green-500
}
/* summon modal */
.summon-mob-leave-active {
  transition:
    transform 150ms ease-in,
    scale 200ms ease-in-out,
    ;
}
.summon-mob-enter-active {
  transition:
    transform 200ms ease-out,
    scale 200ms ease-in-out,
    ;
}
.summon-mob-leave-to,
.summon-mob-enter-from {
  transform: translateX(150%);
  scale:.8;
}
</style>
