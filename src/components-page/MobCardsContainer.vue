<template>
  <!-- action modals -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- summon mob -->
  <Transition
    name="mob-card"
  >
    <SummonMob
      v-show="isSummonModalOpen"
      @summon-mob="addMob"
      @toggle-summon-modal="toggleSummonModal"
    />
  </Transition>

  <!-- dice roller -->
  <Transition name="dice-roller">
    <DiceRoller v-show="isDiceRollerOpen" />
  </Transition>

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

  <!-- page container -->

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div
    class="
    grid grid-rows-[min-content,_1fr,_min-content]
    h-[100dvh] max-h-[100vh]"
  >
    <!-- cards control bar -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- cards control container -->
    <div
      class="
      flex
      place-content-around items-center
      w-full
      p-4"
    >
      <!-- bar -->
      <div
        class="
        flex flex-row flex-wrap gap-8
        p-2 rounded-xl
        bg-neutral-900"
      >
        <SortMobs :mobs-obj="mobs" />
        <ToggleMobCardPanels @refresh-panel="refreshTogglePanel += 1; toggleGlobalCardPanel = $event" />
      </div> <!-- end cards control -->

      <!-- toggle summon menu -->
      <button
        class="py-2 px-4"
        :class="isSummonModalOpen ?
          'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' :
          'bg-green-600 text-green-950 hover:bg-green-700 hover:text-green-950'"
        @click="toggleSummonModal()"
      >
        summon
      </button>
    </div> <!-- end cards control container -->

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

    <!-- card container -->

    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- card scroll overflow -->
    <div class="overflow-y-auto w-full">
      <!-- card layout -->
      <div
        class="
        flex flex-wrap flex-row
        gap-2 md:gap-4
        p-2 sm:p-4
        bg-neutral-700"
      >
        <!-- empty page text -->
        <div
          v-show="mobs.length === 0"
          class="grow text-center"
        >
          summon a monster to begin your command
        </div>

        <!-- mob cards container -->
        <TransitionGroup name="scale-fade">
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
      </div> <!-- end cards layout container -->
    </div> <!-- end cards scroll container -->

    <!-- action buttons bar -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      flex flex-row gap-2
      place-content-center self-start justify-self-end
      p-2 m-2 rounded-xl
      bg-neutral-900"
    >
      <!-- toggle dice roller -->
      <!------------------------------------------------>
      <button
        class="py-1 px-4"
        :class="isDiceRollerOpen ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : ''"
        @click="toggleDiceRoller"
      >
        dice
      </button>
    </div>
  </div> <!-- end page container -->
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import MobCard from './MobCard.vue'
import SummonMob from '../components-functions/SummonMob.vue'
import SortMobs from '../components-functions/SortMobs.vue'
import ToggleMobCardPanels from '../components-functions/ToggleMobCardPanels.vue'
import DiceRoller from '../dice-roller/DiceRoller.vue'

// currently summoned mob(s)
const mobs = reactive([])

// toggled global panel
const toggleGlobalCardPanel = ref('')
const refreshTogglePanel = ref(0)

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
  addMob('aatxe')
  addMob('cave goat')
  addMob('giant spider')
  addMob('silenal')
  addMob('zmey')
  addMob('abaasy')
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
