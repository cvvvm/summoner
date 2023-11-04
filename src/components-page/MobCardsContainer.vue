<template>
  <!-- action modals -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- dice roller -->
  <Transition name="dice-roller">
    <DiceRoller v-show="isDiceRollerOpen" />
  </Transition>

  <!-- summon loading -->
  <Transition name="summon-load">
    <SummonLoading v-show="isLoading" />
    <!-- <SummonLoading /> -->
  </Transition>

  <!-- summon mob -->
  <Transition
    name="summon-mob"
    appear
  >
    <SummonMob
      v-show="isSummonModalOpen"
      @summon-mob="addMob"
      @toggle-summon-modal="toggleSummonModal"
    />
  </Transition>

  <!-- page container -->
  <div
    class="
    grid grid-rows-[min-content,_1fr,_min-content]
    h-[100dvh] max-h-[100vh]"
  >
    <!-- sort/panels -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      flex gap-2
      place-content-between items-center
      w-full
      p-2 sm:px-4"
    >
      {{ yScroll }}
      <!-- bar -->
      <div
        class="
        flex flex-row flex-wrap
        p-2 rounded-xl
        bg-neutral-900"
      >
        <SortMobs :mobs-obj="mobs" />
      </div>
      <div
        class="
        flex flex-row flex-wrap
        p-2 rounded-xl
        bg-neutral-900"
      >
        <ToggleMobCardPanels @refresh-panel="refreshTogglePanel += 1; toggleGlobalCardPanel = $event" />
      </div> <!-- end cards control -->
    </div> <!-- end cards control container -->

    <!-- summon + dice -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      order-3
      flex place-content-center
      gap-2 sm:gap-4
      p-2 sm:px-4
      w-full"
    >
      <!-- toggle dice roller -->
      <!------------------------------------------------>
      <button
        class="py-2 px-4 z-0"
        :class="isDiceRollerOpen ?
          'z-[9001] bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950'
          : 'bg-neutral-400 text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 z-[9999]'"
        @click="toggleDiceRoller"
      >
        dice
      </button>
      <!-- toggle summon menu -->
      <button
        class="py-2 px-4 z-0"
        :class="isSummonModalOpen || mobs.length == 0 ?
          'z-[8001] bg-green-500 text-green-950 hover:bg-green-600 hover:text-green-950'
          : 'bg-neutral-400 text-neutral-950 hover:bg-green-500 hover:text-green-950'"
        @click="toggleSummonModal()"
      >
        summon
      </button>
    </div>

    <!-- mob cards container -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- cards scroll wrapper -->
    <div
      ref="mobContainer"
      class="
      overflow-y-auto"
    >
      <div
        class="
        flex flex-wrap flex-row
        place-content-center
        gap-2 md:gap-4
        p-2 sm:p-4
        overflow-y-auto"
      >
        <!-- mob cards -->
        <TransitionGroup name="mob-card">
          <div
            v-for="mob, index in mobs"
            :key="mob"
          >
            <MobCard
              :key="refreshTogglePanel"
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
    </div> <!-- end cards scroll wrapper -->
  </div> <!-- end page container -->
  <!-- {{ mobs }} -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCard from './MobCard.vue'
import SummonMob from '../components-functions/SummonMob.vue'
import SummonLoading from '../components-functions/SummonLoading.vue'
import SortMobs from '../components-functions/SortMobs.vue'
import ToggleMobCardPanels from '../components-functions/ToggleMobCardPanels.vue'
import DiceRoller from '../dice-roller/DiceRoller.vue'

// currently summoned mob(s)
// const mobsLocalArr = reactive([])
// mobsLocalArr.value = JSON.parse(localStorage.getItem('localMobs'))
const mobs = reactive([])
// mobs.value = JSON.parse(localStorage.getItem('localMobs'))
const isLoading = ref(false)

const toggleGlobalCardPanel = ref('')
const refreshTogglePanel = ref(0)
const isSummonModalOpen = ref(false)
const isDiceRollerOpen = ref(false)

const mobContainer = ref(null)
const yScroll = ref(1)
onMounted(() => {
  mobContainer.value.addEventListener('scroll', function () { // or window.addEventListener("scroll"....
    const st = mobContainer.value.pageYOffset || mobContainer.value.scrollTop
    if (st > yScroll.value) {
      // downscroll code
    } else if (st < yScroll.value) {
      // upscroll code
    } // else was horizontal scroll
    yScroll.value = st <= 0 ? 0 : st
  }, false)
  /* ('scroll', () => {
    yScroll.value++
  }) */
})

// modal toggles
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// toggle summoning modal
function toggleSummonModal () {
  isSummonModalOpen.value = !isSummonModalOpen.value
  if (isDiceRollerOpen.value) isDiceRollerOpen.value = false
}
// toggle dice roller
function toggleDiceRoller () {
  isDiceRollerOpen.value = !isDiceRollerOpen.value
  if (isSummonModalOpen.value) isSummonModalOpen.value = false
}

// EDIT MOBS
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// process mob name
function processMobName (name) {
  if (name.indexOf(',') === -1) {
    return name.toLowerCase()
  } else {
    // return name.push(name.splice(1, 1)[0])
    return (name.split(',')[1] + ' ' + name.split(',')[0]).toLowerCase()
  }
}

// add new mob
function addMob (name) {
  isLoading.value = true
  name = name.replace(/ /gm, '-').replace(/-$/gm, '').toLowerCase()
  fetch('https://api.open5e.com/monsters/' + name)
    .then(res => res.json())
    .then(data => {
      setTimeout(() => {
        mobs.unshift(data)
      }, '500')
      isLoading.value = false
    })
  // .then(data => { mobsLocalArr.push(data) })
    .catch(err => console.log(err.message))

  // localStorage.setItem('localMobs', JSON.stringify(mobsLocalArr))
  // mobs.value = JSON.parse(localStorage.getItem('localMobs'))
}

// remove mob
function handlePassedMob (e) {
  console.log(e.type + ' index ' + e.data + ' passed from app')
  if (e.type === 'banish') mobs.value.splice(e.data, 1)
  if (e.type === 'clone') {
    e.data = e.data.replace(/ /, '-')
    addMob(e.data)
  }
}

onMounted(() => {
  addMob('aatxe')
  addMob('giant spider')
  addMob('silenal')
  addMob('zmey')
  addMob('abaasy')
})

</script>

<style>
/* mob card summoned */
.mob-card-move,
.mob-card-leave-active {
  transition: all 200ms ease-out,
}
.mob-card-move,
.mob-card-enter-active {
  transition: all 200ms ease-out,
}
.mob-card-leave-active {
  position: absolute;
}

.mob-card-leave-to,
.mob-card-enter-from {
  scale: 0.5;
  translate: -150% 100%;
}
</style>
