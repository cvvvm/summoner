<template>
  <!-- action modals -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- summon mob -->
  <!------------------------------------------------>
  <Transition
    name="mob-card"
  >
    <SummonMob
      v-show="isSummonModalOpen"
      @summon-mob="addMob"
      @toggle-summon-modal="toggleSummonModal"
    />
  </Transition>

  <Transition name="dice-roller">
    <DiceRoller v-show="isDiceRollerOpen" />
  </Transition>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- page container -->

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- action buttons bar -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="fixed bottom-0 right-0 z-[1000]
            flex flex-col flex-wrap gap-4
            justify-center
            p-4 m-4 rounded-xxxl
            bg-neutral-900"
  >
    <!-- toggle open / close button -->
    <!------------------------------------------------>
    <button
      class="py-2 px-4 rounded-xl"
      @click="toggleDiceRoller"
    >
      <!--open icon-->
      <p v-show="!isDiceRollerOpen">
        dice
      </p>
      <!--close icon-->
      <p v-show="isDiceRollerOpen">
        close
      </p>
    </button>
    <!-- toggle summon menu -->
    <button
      class="py-2 px-4 rounded-xl
          bg-yellow-500
          text-yellow-950"
      @click="toggleSummonModal()"
    >
      + summon
    </button>
  </div>

  <!-- sorting bar -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="sticky top-0 z-[1000]
            flex flex-row flex-wrap gap-4
            justify-between items-end
            p-4
            bg-neutral-900"
  >
    <!-- sort -->
    <!------------------------------------------------>
    <div class="flex gap-2 items-center">
      <p>sort:</p>
      <button @click="alphaSort">
        {{ alphaSortDirection }}
      </button>
      <button @click="hpSort">
        {{ hpSortDirection }}
      </button>
      <button @click="acSort">
        {{ acSortDirection }}
      </button>
    </div>

    <!-- panel toggles -->
    <!------------------------------------------------>
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
        {{ panelToggle.substring(0, 3) }}
      </button>
    </div>
  </div> <!-- end command bar -->

  <!-- card container -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="flex flex-row flex-wrap
          content-start
          w-full min-h-screen
          gap-2 md:gap-4
          p-2 sm:p-4"
  >
    <!-- empty page text -->
    <div
      v-show="mobs.length === 0"
      class="grow text-center"
    >
      summon a monster to begin your command
    </div>

    <!-- mob cards container -->
    <TransitionGroup name="mob-card">
      <div
        v-for="mob, index in mobs"
        :key="mob"
      >
        <MobCard
          :key="forceRefreshKey"
          :mob-index="index"
          :name="processMobName(mob.name)"
          :slug="mob.slug"
          :alignment="mob.alignment"
          :size="mob.size.toLowerCase()"
          :type="mob.type"
          :ability-scores="[
            { str: {'score': mob.strength, 'saveMod': mob.strength_save} },
            { dex: {'score': mob.dexterity, 'saveMod': mob.dexterity_save} },
            { con: {'score': mob.constitution, 'saveMod': mob.constitution_save} },
            { int: {'score': mob.intelligence, 'saveMod': mob.intelligence_save} },
            { wis: {'score': mob.wisdom, 'saveMod': mob.wisdom_save} },
            { cha: {'score': mob.charisma, 'saveMod': mob.charisma_save} },
          ]"
          :base-hp="mob.hit_points"
          :armor="[{
            class: mob.armor_class,
            desc: mob.armor_desc,
          }]"
          :challenge-rating="mob.cr"
          :xp-gained="mob.xp"
          :damage-vulnerabilities="mob.damage_vulnerabilities"
          :damage-resistances="mob.damage_resistances"
          :damage-immunities="mob.damage_immunities"
          :condition-immunities="mob.condition_immunities"
          :special-abilities="mob.special_abilities"
          :actions="mob.actions"
          :legendary-actions="mob.legendary_actions"
          :legendary-desc="mob.legendary_desc"
          :speed="mob.speed"
          :senses="mob.senses"
          :lang="mob.languages"
          :toggle-global-card-panel="toggleGlobalCardPanel"
          @pass-mob="handlePassedMob"
        />
      </div>
    </TransitionGroup>
  </div> <!-- end cards container -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCard from './MobCard.vue'
import SummonMob from '../components-page/SummonMob.vue'
import DiceRoller from '../dice-roller/DiceRoller.vue'

const mobs = reactive([])
const globalPanelOptions = ['none', 'actions', 'abilities', 'details']
const toggleGlobalCardPanel = ref('none')
const forceRefreshKey = ref(0)

// PROCESS MOBS
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function processMobName (name) {
  if (name.indexOf(',') === -1) {
    return name.toLowerCase()
  } else {
    // return name.push(name.splice(1, 1)[0])
    return (name.split(',')[1] + ' ' + name.split(',')[0]).toLowerCase()
  }
}

// SORTING
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const alphaSortDirection = ref('a-z')
const hpSortDirection = ref('hp ↑')
const acSortDirection = ref('ac ↑')
// alpha sort
// -----------------------------------------------------------
function alphaSort () {
  if (alphaSortDirection.value === 'a-z') sortArrayAlphaAsc()
  else if (alphaSortDirection.value === 'z-a') sortArrayAlphaDesc()
}
// sort alpha asc
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
// sort alpha desc
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
function hpSort () {
  if (hpSortDirection.value === 'hp ↓') sortArrayHpAsc()
  else if (hpSortDirection.value === 'hp ↑') sortArrayHpDesc()
}
// sort hp asc
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
  hpSortDirection.value = 'hp ↑'
}
// sort hp desc
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
  hpSortDirection.value = 'hp ↓'
}

// ac sort
// -----------------------------------------------------------
function acSort () {
  if (acSortDirection.value === 'ac ↓') sortArrayAcAsc()
  else if (acSortDirection.value === 'ac ↑') sortArrayHAcesc()
}
// sort hp asc
function sortArrayAcAsc () {
  mobs.sort((a, b) => {
    const fa = a.armor_class; const fb = b.armor_class
    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
  acSortDirection.value = 'ac ↑'
}
// sort hp desc
function sortArrayHAcesc () {
  mobs.sort((a, b) => {
    const fa = a.armor_class; const fb = b.armor_class
    if (fa < fb) {
      return 1
    }
    if (fa > fb) {
      return -1
    }
    return 0
  })
  acSortDirection.value = 'ac ↓'
}

// modal toggles
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// toggle summoning modal
// -----------------------------------------------------------
const isSummonModalOpen = ref(false)
function toggleSummonModal () {
  isSummonModalOpen.value = !isSummonModalOpen.value
}
// toggle dice roller
const isDiceRollerOpen = ref(false)
function toggleDiceRoller () {
  isDiceRollerOpen.value = !isDiceRollerOpen.value
}

// EDIT MOBS
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

onMounted(() => {
/*   addMob('aatxe')
  addMob('cave goat')
  addMob('giant spider')
  addMob('silenal')
  addMob('zmey')
  addMob('abaasy') */
})

</script>

<style>

.mob-card-leave-active {
  transition:
    transform 150ms ease-out,
}
.mob-card-enter-active {
  transition:
    transform 200ms ease-out,
}
.mob-card-leave-to,
.mob-card-enter-from {
  transform: translateX(-150%);
}

.dice-roller-leave-active {
  transition:
    transform 150ms ease-out,
}
.dice-roller-enter-active {
  transition:
    transform 200ms ease-out,
}
.dice-roller-leave-to,
.dice-roller-enter-from {
  transform: translateY(150%);
}
</style>
