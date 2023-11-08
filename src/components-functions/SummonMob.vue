<template>
  <!-- card -->
  <!------------------------------------------------>
  <div
    class="
    fixed z-[8000]
    top-16
    bottom-2
    right-2 xs:right-28
    left-2 xs:left-auto
    grid gap-2
    grid-rows-[min-content,_1fr,_min-content]
    max-w-full xs:w-[450px]
    p-2 rounded-xl
    bg-neutral-950 border"
    :class="isSearchOpen ? 'border-green-500 ' : 'border-pink-400 '"
    @keydown.down="selectNextMobResult"
    @keydown.up="selectPrevMobResult"
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
        id="searchBar"
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
      :mobs-all="searchAllResult"
      :search-limit="searchLimitAmount"
      @update-search-limit="searchLimitAmount += 100"
      @summon-mob="$emit('summonMob', $event); updateStatus('summoning')"
      @toggle-summon-modal="$emit('toggleSummonModal')"
      @add-fav="addFav($event)"
    />

    <SummonMobFavs
      v-show="!isSearchOpen"
      id="summonPanel"
      :fav-mobs="searchFavResult"
      :search-limit="searchLimitAmount"
      @update-search-limit="searchLimitAmount += 100"
      @summon-mob="$emit('summonMob', $event); updateStatus('summoning')"
      @toggle-summon-modal="$emit('toggleSummonModal')"
      @remove-fav="removeFav($event)"
    />

    <!-- buttons, results bar -->
    <!------------------------------------------------>
    <div
      class="
      flex gap-2
      items-center justify-between
      mx-2 mb-2"
    >
      <!-- results number -->
      <p class="text-center">
        {{ isSearchOpen ? 'monsters:' : 'favorites:' }} {{ isSearchOpen ? searchAllNum : searchFavNum }}
      </p>
      <!-- status -->
      <p
        id="summmonStatus"
        class="px-2 py-0 text-green-950 bg-green-500 transition-opacity opacity-0"
      >
        {{ status }}
      </p>
    </div>
  </div> <!-- end card -->
</template>

<script setup>
import { db } from '../../db'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import SummonMobAll from './SummonMobAll.vue'
import SummonMobFavs from './SummonMobFavs.vue'

defineEmits(['toggleSummonModal', 'summonMob'])
const mobSearchInput = ref('')
const mobNamesList = reactive([])
const mobFavsList = reactive([])

const isSearchOpen = ref(true)
const searchPlacehold = ref('search all monsters')
const searchAllResult = ref([])
const searchFavResult = ref([])

const searchAllNum = ref(searchAllResult.value.length)
const searchFavNum = ref(searchFavResult.value.length)

const searchLimitAmount = ref(100)

const selectIndex = ref(0)
const lastSelect = ref('')

const status = ref()

/*
mount:
  - check for db init, local data
  - create search lists (all mobs, all favs)
  - populate window with search lists

search:
  - filter search lists

fav:
  add:
    - check for dupes
    - add to favs db
    - update fav search list
  remove:
    - remove from favs db
    - update fav search list

all/fav swap:

*/

// update status
// -----------------------------------------------------------
function updateStatus (msg) {
  const statText = document.getElementById('summmonStatus')
  status.value = msg
  statText.classList.toggle('opacity-0')
  setTimeout(() => {
    statText.classList.toggle('opacity-0')
  }, '1000')
}

// BEFORE / ON MOUNT
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
onBeforeMount(() => {
  // get mobs
  APIgetSearchList()
})

onMounted(() => {
  // fill lists
  db.allMobs.each(mob => {
    mobNamesList.push({ index: mob.index, name: mob.name, url: mob.url })
  })
  db.favMobs.each(fav => {
    mobFavsList.push({ index: fav.index, name: fav.name, url: fav.url })
  })

  // populate card
  setTimeout(() => {
    if (isSearchOpen.value) updateSearchAllResult()
    else updateSearchFavResult()
  }, '100')
})

// API get all monsters for search
// -----------------------------------------------------------
function APIgetSearchList () {
  fetch('https://www.dnd5eapi.co/api/monsters')
    .then(res => res.json())
    .then(data => {
      populateAllMobTable(data.results)
    })
}

// add mobs to table
// -----------------------------------------------------------
async function populateAllMobTable (d) {
  db.on('ready', function () {
    return db.allMobs.count(function (count) {
      if (count > 0) updateStatus('ready')
      else {
        d.forEach(async mob => {
          try {
            // add next mob
            await db.allMobs.add({
              index: mob.index,
              name: mob.name.toLowerCase(),
              url: mob.url
            })

            updateStatus('filled & ready')
          } catch (error) {
            updateStatus('something went wrong. try refreshing')
          }
        })
      }
    })
  })
}

// fav mobs
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// add fav mob
async function addFav (e) {
  const match = ref(false)
  db.favMobs.each(fav => {
    if (fav.index === e.index) match.value = true
    updateStatus('already added')
  })

  if (!match.value) {
    await db.favMobs.add({
      index: e.index,
      name: e.name.toLowerCase(),
      url: e.url
    })
    mobFavsList.push({ index: e.index, name: e.name, url: e.url })
    updateStatus('added')
  }
}

// remove fav mob
async function removeFav (e) {
  db.favMobs.delete(e.index)
  const idx = mobFavsList.findIndex(m => m.name === e.name)
  mobFavsList.splice(idx, 1)
  updateSearchFavResult()
}

// search
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// update search results - all
function updateSearchAllResult () {
  selectIndex.value = 0
  searchAllResult.value = mobNamesList.filter(mob => mob.name.toLowerCase().includes(mobSearchInput.value.toLowerCase()))
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
  selectIndex.value = 0
  searchFavResult.value = mobFavsList.filter(mob => mob.name.toLowerCase().includes(mobSearchInput.value.toLowerCase()))
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

// search mobs
function searchMobs () {
  searchLimitAmount.value = 100
  if (isSearchOpen.value) {
    updateSearchAllResult()
  } else if (!isSearchOpen.value) {
    updateSearchFavResult()
  }
}

// page functions
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// arrow select mob
// -----------------------------------------------------------
// select last
function selectPrevMobResult () {
  if (lastSelect.value === 'next') selectIndex.value = selectIndex.value - 2
  if (selectIndex.value <= 0) selectIndex.value = (searchLimitAmount.value)
  // set element to find
  const mob = document.querySelector('#summonPanel')
    .children[0].children[selectIndex.value]
  // set focus + style
  mob.setAttribute('tabindex', '0')
  mob.focus()
  // prep for next
  selectIndex.value--
  lastSelect.value = 'prev'
}
// select next
function selectNextMobResult () {
  if (lastSelect.value === 'prev') selectIndex.value = selectIndex.value + 2
  if (selectIndex.value > searchLimitAmount.value) selectIndex.value = 0
  // set element to find
  const mob = document.querySelector('#summonPanel')
    .children[0].children[selectIndex.value]
  // set focus + style
  mob.setAttribute('tabindex', '0')
  mob.focus()
  // prep for next
  selectIndex.value++
  lastSelect.value = 'next'
}

// toggle between search all / search faves
// -----------------------------------------------------------
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

</script>

<style>
#summonPanel button:focus {
  @apply bg-green-500 text-green-950
}
#summonPanel div:focus {
  @apply border-green-500
}
/* summon modal */
.summon-mob-leave-active {
  transition:
    transform 150ms ease-out,
    scale 200ms ease-out,
    ;
}
.summon-mob-enter-active {
  transition:
    transform 175ms ease-out,
    scale 200ms ease-out,
    ;
}
.summon-mob-leave-to,
.summon-mob-enter-from {
  transform: translateX(150%);
  scale:.8;
}
</style>
