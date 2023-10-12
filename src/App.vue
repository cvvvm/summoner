<template>
  <button @click="toggleModal()">
    summon new
  </button>
  <div
    v-show="modalOpen"
  >
    <SummonMob
      :search-list="mobsSearchList.results"
      @summon-mob="addMob"
      @close="toggleModal"
    />
  </div>

  <MobCardsContainer :mobs="mobs" />
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCardsContainer from './components-page/MobCardsContainer.vue'
import SummonMob from './components-page/SummonMob.vue'

const modalOpen = ref(false)
const mobs = reactive([])
const mobsSearchList = ref([])

function toggleModal () {
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
