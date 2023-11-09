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
  </Transition>

  <!-- summon mob -->
  <Transition
    name="summon-mob"
    appear
  >
    <SummonMob
      v-show="isSummonModalOpen"
      @summon-mob="summonMob"
      @toggle-summon-modal="toggleSummonModal"
    />
  </Transition>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!--  page container  -->

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="
    relative
    grid
    grid-rows-[min-content,_1fr,_min-content]
    h-[100dvh] max-h-[100vh]"
  >
    <!-- sort/panels bar -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      order-1
      z-[2]
      flex gap-2
      place-content-between items-center
      w-full
      p-2 sm:p-4
      bg-neutral-950"
    >
      <!-- bar -->
      <SortMobs :mobs-obj="summonedMobsList" />

      <ToggleMobCardPanels @refresh-panel="refreshTogglePanel += 1; toggleGlobalCardPanel = $event" />
    </div> <!-- end sort bar -->

    <!-- summon + dice -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      order-3
      z-[5000]
      flex flex-row
      place-content-center
      gap-2 sm:gap-4
      p-2 sm:p-4
      w-screen
      bg-neutral-950
      "
    >
      <!-- toggle dice roller -->
      <!------------------------------------------------>
      <button
        class="py-2 px-4"
        :class="isDiceRollerOpen ?
          'z-[9001] bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950'
          : 'bg-neutral-400 text-neutral-950 hover:bg-neutral-200 hover:text-neutral-950 z-[9999]'"
        @click="toggleDiceRoller"
      >
        dice
      </button>
      <!-- toggle summon menu -->
      <button
        class="py-2 px-4"
        :class="isSummonModalOpen || summonedMobsList.length == 0 ?
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
      order-2
      relative
      h-full w-full
      overflow-y-auto"
    >
      <!-- fade top -->
      <div
        id="fadeTop"
        :class="yScroll > 10 ? '' : 'opacity-0'"
        class="
        z-10 pointer-events-none
        fixed top-[2.75rem] sm:top-14
        h-8 w-full
        bg-gradient-to-b from-neutral-950
        transition-opacity"
      />
      <!-- cards container -->
      <div
        id="cardsContainer"
        class="
        flex flex-wrap flex-row
        place-content-start
        gap-2 md:gap-4
        p-2 sm:p-4 mb-12"
      >
        <!-- mob cards -->
        <TransitionGroup name="mob-card">
          <div
            v-for="mob, index in summonedMobsList"
            :key="mob"
          >
            <MobCard
              :key="refreshTogglePanel"
              :mob-index="index"
              :name="mob.name.toLowerCase()"
              :url="mob.url"
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
              :armor="mob.armor_class"
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

      <!-- fade bottom -->
      <div
        id="fadeBottom"
        :class="yScroll > 10 ? '' : 'opacity-0'"
        class="
        z-10 pointer-events-none
        fixed bottom-[3.25rem] sm:bottom-16
        h-8 w-full
        bg-gradient-to-t from-neutral-950
        transition-opacity"
      />
    </div> <!-- end cards scroll wrapper -->
  </div> <!-- end page container -->
  <!-- {{ mobs }} -->
</template>

<script setup>
import { db } from '../../db'
import { ref, reactive, onMounted } from 'vue'
import MobCard from './MobCard.vue'
import SummonMob from '../components-functions/SummonMob.vue'
import SummonLoading from '../components-functions/SummonLoading.vue'
import SortMobs from '../components-functions/SortMobs.vue'
import ToggleMobCardPanels from '../components-functions/ToggleMobCardPanels.vue'
import DiceRoller from '../dice-roller/DiceRoller.vue'

const summonedMobsList = reactive([])
const isLoading = ref(false)

const toggleGlobalCardPanel = ref('details')
const refreshTogglePanel = ref(0)
const isSummonModalOpen = ref(false)
const isDiceRollerOpen = ref(false)

// show shadows on scroll
const mobContainer = ref(null)
const yScroll = ref(1)
// const mobFadeTop = ref(false)
// const mobFadeBtm = ref(true)

onMounted(() => {
  scrollFader()
  loadAllLocalSummonedList()
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

// summon new mob
function summonMob (e) {
  isLoading.value = true
  fetch('https://www.dnd5eapi.co' + e)
    .then(res => res.json())
    .then(data => {
      addToSummonedMobs(data)
      setTimeout(() => {
        addToLocalSummonedList(data)
      }, '200')
    })
    .catch(err => console.log(err.message))

  // hide summoning status
  setTimeout(() => {
    isLoading.value = false
  }, '450')
}

// remove mob
async function handlePassedMob (e) {
  console.log(e)

  if (e.type === 'banish') {
    summonedMobsList.splice(e.data, 1)
    await db.summonedMobs
      .where('name')
      .equalsIgnoreCase(e.name)
      .limit(1)
      .delete()
  }
  if (e.type === 'clone') {
    e.data = e.data.replace(/ /, '-')
    summonMob(e.data)
  }
}

// remove fav mob
/* async function removeFav(e) {
  db.favMobs.delete(e.index)
  const idx = mobFavsList.findIndex(m => m.name === e.name)
  mobFavsList.splice(idx, 1)
  updateSearchFavResult()
} */

// load local summoned mobs from db
async function loadAllLocalSummonedList () {
  await db.summonedMobs.each(mob => {
    summonedMobsList.push(mob.data)
  })
}

// save summoned to local db
async function addToSummonedMobs (m) {
  // add next mob
  await db.summonedMobs.add({
    name: m.name,
    data: m
  })
}

// add to summoned mob list
function addToLocalSummonedList (m) {
  summonedMobsList.unshift(m)
}

// misc
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// scroll fader
function scrollFader () {
  // const top = document.getElementById('fadeTop')
  // const bottom = document.getElementById('fadeBottom')

  mobContainer.value.addEventListener('scroll', function () {
    const st = mobContainer.value.scrollTop
    if (st > yScroll.value) {
      // downscroll code
    } else if (st < yScroll.value) {
      // upscroll code
    } // else was horizontal scroll
    yScroll.value = st <= 0 ? 0 : st
  }, false)
}
</script>

<style>
/* mob card summoned */
.mob-card-move,
.mob-card-leave-active {
  transition: all 200ms ease-out,
}
.mob-card-move,
.mob-card-enter-active {
  transition: all 300ms ease-out,
}
.mob-card-leave-active {
  position: absolute;
}

.mob-card-leave-to,
.mob-card-enter-from {
  scale: 0.5;
  translate: -300% 50vh;
}
</style>
