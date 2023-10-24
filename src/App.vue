<template>
  <!-- command bar -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="
    sticky top-0 z-[1000]
    flex flex-row flex-wrap gap-x-8 gap-y-4 justify-between
    p-4
    bg-neutral-900"
  >
    <SummonMob
      @summon-mob="addMob"
    />

    <div class="flex gap-2 items-center">
      <p>sort:</p>
      <button @click="alphaSort">
        {{ alphaSortDirection }}
      </button>
      <button @click="hpSort">
        {{ hpSortDirection }}
      </button>
    </div>

    <div
      class="hidden sm:flex
                gap-2 items-center"
    >
      <p>toggle:</p>
      <button
        v-for="panelToggle in globalPanelOptions"
        :key="panelToggle"
        @click="toggleGlobalCardPanel = panelToggle; forceRefreshKey += 1"
      >
        {{ panelToggle.substring(0,3) }}
      </button>
    </div>
  </div> <!-- end global buttons container -->

  <!-- content container -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <MobCardsContainer
    :key="forceRefreshKey"
    :mobs="mobs"
    :toggle-global-card-panel="toggleGlobalCardPanel"
    @pass-mob="handlePassedMob"
  />

  <!-- footer -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <footer
    class="flex place-content-around place-items-center
          min-h-[5vh]
          bg-neutral-900"
  >
    <a
      class="text-sm underline underline-offset-2 text-neutral-300 decoration-neutral-500 hover:text-neutral-100 hover:decoration-neutral-500 transition-colors"
      href="https://open5e.com"
    >data from open5e</a>
    <p>built with Vue + Tailwind</p>
  </footer>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCardsContainer from './components-page/MobCardsContainer.vue'
import SummonMob from './components-page/SummonMob.vue'

const mobs = reactive([])
const globalPanelOptions = ['none', 'actions', 'abilities', 'details']
const toggleGlobalCardPanel = ref('none')
const forceRefreshKey = ref(0)

// SORTING
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// alpha sort
// -----------------------------------------------------------
const alphaSortDirection = ref('a-z')
function alphaSort () {
  if (alphaSortDirection.value === 'a-z') sortArrayAlphaAsc()
  else if (alphaSortDirection.value === 'z-a') sortArrayAlphaDesc()
}
// sort asc
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
  alphaSortDirection.value = 'z-a'
}
// sort desc
function sortArrayAlphaDesc () {
  mobs.sort((a, b) => {
    const fa = a.name.toLowerCase(); const fb = b.name.toLowerCase()
    if (fa < fb) {
      return 1
    }
    if (fa > fb) {
      return -1
    }
    return 0
  })
  alphaSortDirection.value = 'a-z'
}

// hp sort
// -----------------------------------------------------------
const hpSortDirection = ref('hp >')
function hpSort () {
  if (hpSortDirection.value === 'hp >') sortArrayHpAsc()
  else if (hpSortDirection.value === 'hp <') sortArrayHpDesc()
}
// sort asc
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
  hpSortDirection.value = 'hp <'
}
// sort desc
function sortArrayHpDesc () {
  mobs.sort((a, b) => {
    const fa = a.hit_points; const fb = b.hit_points
    if (fa < fb) {
      return 1
    }
    if (fa > fb) {
      return -1
    }
    return 0
  })
  hpSortDirection.value = 'hp >'
}

// EDIT MOBS
// -----------------------------------------------------------
// add new mob
function addMob (name) {
  name = name.replace(/ /gm, '-').replace(/-$/gm, '').toLowerCase()
  fetch('https://api.open5e.com/monsters/' + name)
    .then(res => res.json())
    .then(data => { mobs.unshift(data) })
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

onMounted(() => {
  addMob('aatxe')
  addMob('cave goat')
  addMob('giant spider')
  addMob('silenal')
  addMob('zmey')
})

</script>

<style>
</style>
