<template>
  <div class="p-4">
    <button @click="toggleSummonModal()">
      summon new
    </button>
  </div>
  <div
    v-show="modalOpen"
  >
    <SummonMob
      :search-list="mobsSearchList.results"
      @summon-mob="addMob"
      @close="toggleSummonModal"
    />
  </div>

  <MobCardsContainer
    :mobs="mobs"
    @pass-mob="handlePassedMob"
  />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCardsContainer from './components-page/MobCardsContainer.vue'
import SummonMob from './components-page/SummonMob.vue'

const modalOpen = ref(false)
const mobs = reactive([])
const mobsSearchList = ref([])

function toggleSummonModal () {
  modalOpen.value = !modalOpen.value
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
  fetch('https://api.open5e.com/monsters/')
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
