<template>
  <!-- global buttons container -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="
    sticky top-0 z-[1000]
    flex justify-between
    p-4
    w-full
    bg-zinc-900"
  >
    <button
      @click="toggleSummonModal()"
    >
      + summon
    </button>

    <div class="flex gap-2 items-center">
      <p>sort:</p>
      <button @click="sortArrayAlphaAsc">
        a-z
      </button>
      <button @click="sortArrayHpAsc">
        hp
      </button>
    </div>

    <div class="flex gap-2 items-center">
      <p>cards:</p>
      <button
        v-for="panelToggle in globalPanelOptions"
        :key="panelToggle"
        @click="toggleGlobalCardPanel = panelToggle; forceRefreshKey += 1"
      >
        {{ panelToggle.substring(0,3) }}
      </button>
    </div>
  </div> <!-- end global buttons container -->

  <!-- summon (modal) -->
  <div v-show="summonModalOpen">
    <SummonMob
      @summon-mob="addMob"
      @close-summon-modal="toggleSummonModal"
    />
  </div>

  <!-- content container -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <MobCardsContainer
    :key="forceRefreshKey"
    class="min-h-[95vh]"
    :mobs="mobs"
    :toggle-global-card-panel="toggleGlobalCardPanel"
    @pass-mob="handlePassedMob"
  />

  <!-- footer -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <footer
    class="flex place-content-center place-items-center
            min-h-[5vh]
          bg-zinc-900"
  >
    <a
      class="text-sm underline underline-offset-2 text-zinc-300 decoration-zinc-500 hover:text-zinc-100 hover:decoration-zinc-500 transition-colors"
      href="https://open5e.com"
    >data from open5e</a>
  </footer>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCardsContainer from './components-page/MobCardsContainer.vue'
import SummonMob from './components-page/SummonMob.vue'

const summonModalOpen = ref(true)
const mobs = reactive([])
// const mobsSearchList = ref([])

const globalPanelOptions = ['collapse', 'abilities', 'actions', 'details']
const toggleGlobalCardPanel = ref('collapse')
const forceRefreshKey = ref(0)

// SORTING
// -----------------------------------------------------------
// alpha sort
function sortArrayAlphaAsc () {
  mobs.sort((a, b) => {
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
// hp sort
function sortArrayHpAsc () {
  mobs.sort((a, b) => {
    const fa = a.hit_points; const fb = b.hit_points
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
}

// EDIT MOBS
// -----------------------------------------------------------
// open summoning window
function toggleSummonModal () {
  summonModalOpen.value = !summonModalOpen.value
}

// add new mob
function addMob (name) {
  name = name.replace(/ /gm, '-').replace(/-$/gm, '').toLowerCase()
  fetch('https://api.open5e.com/monsters/' + name)
    .then(res => res.json())
    .then(data => { mobs.push(data) })
    .catch(err => console.log(err.message))
}

// remove mob
function handlePassedMob (e) {
  console.log(e.type + ' index ' + e.data + ' passed from app')
  if (e.type === 'banish') mobs.splice(e.data, 1)
  if (e.type === 'clone') {
    e.data = e.data.replace(/ /, '-')
    addMob(e.data)
  }
}

// get monster list from API
/* function getMobsSearchList () {
  fetch('https://api.open5e.com/monsters')
    .then(res => res.json())
    .then(data => { mobsSearchList.value = data })
    .catch(err => console.log(err.message))
} */

onMounted(() => {
  // getMobsSearchList()
  addMob('androsphinx')
  addMob('goblin')
  addMob('air elemental')
  addMob('adult black dragon')
  addMob('axe beak')
  addMob('drake venom')
})

</script>

<style>
</style>
