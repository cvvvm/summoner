<template>
  <!-- global buttons container -->
  <div
    class="
    flex justify-between
    p-4
    w-full
    bg-zinc-900"
  >
    <button @click="toggleSummonModal()">
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

    <div class="flex gap-2">
      {{ toggleGlobalCardPanel }}
      <button @click="toggleGlobalCardPanel = ''">
        collapse
      </button>
      <button @click="toggleGlobalCardPanel = 'details'">
        details
      </button>
      <button @click="toggleGlobalCardPanel = 'abilities'">
        abilities
      </button>
      <button @click="toggleGlobalCardPanel = 'actions'">
        actions
      </button>
    </div>
  </div>

  <!-- summon (modal) -->
  <div v-show="summonModalOpen">
    <SummonMob
      :search-list="mobsSearchList.results"
      @summon-mob="addMob"
      @close="toggleSummonModal"
    />
  </div>

  <MobCardsContainer
    :mobs="mobs"
    :toggle-global-card-panel="toggleGlobalCardPanel"
    @pass-mob="handlePassedMob"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCardsContainer from './components-page/MobCardsContainer.vue'
import SummonMob from './components-page/SummonMob.vue'

const summonModalOpen = ref(false)
const mobs = reactive([])
const mobsSearchList = ref([])
const toggleGlobalCardPanel = ref('details')

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

function getMobsSearchList () {
  fetch('https://api.open5e.com/monsters')
    .then(res => res.json())
    .then(data => { mobsSearchList.value = data })
    .catch(err => console.log(err.message))
}

onMounted(() => {
  getMobsSearchList()
  addMob('androsphinx')
  addMob('goblin')
  addMob('adult black dragon')
})

</script>

<style>
</style>
