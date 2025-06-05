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
    appear
    name="summon-mob"
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
    grid-rows-1
    h-[100dvh] max-h-[100vh]"
  >
    <!-- sort/panels bar -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      class="
      pointer-events-none
      fixed z-[5000] top-0
      flex justify-center
      w-full
      pt-0
      bg-gradient-to-b from-neutral-950
      "
    >
      <div
        class="
        pointer-events-auto
        relative
        flex gap-4 sm:gap-8
        place-content-between sm:place-content-center items-center
        px-2 py-1.5 sm:p-3 sm:py-2.5
        rounded-b-[20px] sm:rounded-b-xxxl
        bg-neutral-500
        border-shadow"
      >
        <!-- bar -->
        <SortMobs :mobs-obj="summonedMobsList" />
        <ToggleMobCardPanels @refresh-panel="refreshTogglePanel += 1; toggleGlobalCardPanel = $event" />
      </div>
    </div> <!-- end sort bar wrapper -->

    <!-- summon + dice -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- wrapper -->
    <div
      class="
      pointer-events-none
      fixed z-[5000] bottom-0
      flex justify-center
      w-full
      pb-4
      bg-gradient-to-t from-neutral-950
      "
    >
      <div
        class="
        pointer-events-auto
        relative
        flex flex-row
        gap-2
        px-2 py-1.5 sm:p-3 sm:py-2.5
        rounded-full
        bg-neutral-500
        border-shadow
      "
      >
        <!-- toggle dice roller -->
        <!------------------------------------------------>
        <button
          :class="isDiceRollerOpen ?
            'z-[5001] bg-orange-500 text-orange-950 hover:bg-orange-600 hover:text-orange-950'
            : 'bg-neutral-600 text-neutral-200 hover:bg-orange-500 hover:text-orange-950'"
          class="px-5 py-3 sm:py-3 sm:px-4 rounded-full"
          @click="toggleDiceRoller()"
        >
          dice
        </button>
        <!-- toggle summon menu -->
        <button
          :class="isSummonModalOpen ?
            'z-[5001] bg-green-500 text-green-950 hover:bg-green-600 hover:text-green-950'
            : 'bg-neutral-600 text-neutral-200 hover:bg-green-500 hover:text-green-950'"
          class="px-5 py-3 sm:py-2 sm:px-4 rounded-full"
          @click="toggleSummonModal()"
        >
          summon
        </button>
      </div>
    </div> <!-- end summon + dice wrapper -->

    <!-- mob cards container -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- cards scroll wrapper -->
    <div
      id="mobContainer"
      class="
      order-2
      relative
      h-full w-full
      overflow-y-auto"
    >
      <!-- cards container -->
      <!-- flex flex-wrap flex-row -->
      <div
        id="cardsContainer"
        class="
        grid grid-cols-[repeat(auto-fit,_minmax(375px,400px))]
        place-content-center
        gap-4 md:gap-6
        p-2 sm:px-4 mt-[4.5rem] sm:mt-20 mb-28
        transition-[margin_200ms_ease-out]"
      >
        <!-- mob cards -->
        <TransitionGroup name="mob-card">
          <div
            v-for="(mob, index) in summonedMobsList"
            :key="mob"
          >
            <MobCard
              :key="refreshTogglePanel"
              :ability-scores="[
                { str: {'score': mob.strength, 'saveMod': mob.strength_save} },
                { dex: {'score': mob.dexterity, 'saveMod': mob.dexterity_save} },
                { con: {'score': mob.constitution, 'saveMod': mob.constitution_save} },
                { int: {'score': mob.intelligence, 'saveMod': mob.intelligence_save} },
                { wis: {'score': mob.wisdom, 'saveMod': mob.wisdom_save} },
                { cha: {'score': mob.charisma, 'saveMod': mob.charisma_save} },
              ]"
              :actions="mob.actions"
              :alignment="mob.alignment"
              :armor="mob.armor_class"
              :base-hp="mob.hit_points"
              :challenge-rating="mob.challenge_rating"

              :condition-immunities="mob.condition_immunities"
              :damage-immunities="mob.damage_immunities"
              :damage-resistances="mob.damage_resistances"
              :damage-vulnerabilities="mob.damage_vulnerabilities"
              :lang="mob.languages"
              :legendary-actions="mob.legendary_actions"
              :legendary-desc="mob.legendary_desc"
              :mob-index="index"
              :name="mob.name.toLowerCase()"
              :senses="mob.senses"
              :size="mob.size.toLowerCase()"
              :special-abilities="mob.special_abilities"
              :speed="mob.speed"
              :toggle-global-card-panel="toggleGlobalCardPanel"
              :type="mob.type"
              :url="mob.url"
              :xp-gained="mob.xp"
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
import { db } from '../../db'
import { ref, reactive, onMounted } from 'vue'
import MobCard from './MobCard.vue'
import SummonMob from '../components-functions/SummonMob.vue'
import SummonLoading from '../components-functions/SummonLoading.vue'
import SortMobs from '../components-functions/SortMobs.vue'
import ToggleMobCardPanels from '../components-functions/ToggleMobCardPanels.vue'
import DiceRoller from '../dice-roller/DiceRoller.vue'

const summonedMobsList = reactive( [] )
const isLoading = ref( false )

const toggleGlobalCardPanel = ref( '' )
const refreshTogglePanel = ref( 0 )
const isSummonModalOpen = ref( false )
const isDiceRollerOpen = ref( false )

onMounted( () => {
  loadAllLocalSummonedList()
} )

/*-| modal toggles |-*/
/*/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

/*-| toggle summoning modal |-*/
function toggleSummonModal () {
  isSummonModalOpen.value = !isSummonModalOpen.value
  document.getElementById( 'cardsContainer' ).classList.toggle( '[@media(min-width:800px)]:mr-[390px]' )
  if ( isDiceRollerOpen.value ) {
    document.getElementById( 'cardsContainer' ).classList.toggle( '[@media(min-width:700px)]:ml-[235px]' )
    isDiceRollerOpen.value = false
  }
}

/*-| toggle dice roller |-*/
function toggleDiceRoller () {
  isDiceRollerOpen.value = !isDiceRollerOpen.value
  document.getElementById( 'cardsContainer' ).classList.toggle( '[@media(min-width:700px)]:ml-[235px]' )
  if ( isSummonModalOpen.value ) {
    document.getElementById( 'cardsContainer' ).classList.toggle( '[@media(min-width:800px)]:mr-[390px]' )
    isSummonModalOpen.value = false
  }
}

/* -| EDIT MOBS |-*/
/* /==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/==/*/

/* -| summon new mob |-*/
/* ---+----+---+----+---+----+---+----+---*/
function summonMob ( e ) {
  isLoading.value = true
  fetch( 'https://www.dnd5eapi.co' + e )
    .then( res => res.json() )
    .then( data => {
      addToSummonedMobs( data )
      setTimeout( () => {
        addToLocalSummonedList( data )
      }, 200 )
    } )
    .catch( err => console.log( err.message ) )

  /* -| hide summoning status |-*/
  setTimeout( () => {
    isLoading.value = false
  }, '450' )
}

/*-| remove mob |-*/
/*---+----+---+----+---+----+---+----+---*/
async function handlePassedMob ( e ) {
  console.log( e )

  if ( e.type === 'banish' ) {
    summonedMobsList.splice( e.data, 1 )
    await db.summonedMobs
      .where( 'name' )
      .equalsIgnoreCase( e.name )
      .limit( 1 )
      .delete()
  }
  if ( e.type === 'clone' ) {
    e.data = e.data.replace( / /, '-' )
    summonMob( e.data )
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
  await db.summonedMobs.each( mob => {
    summonedMobsList.push( mob.data )
  } )
}

// save summoned to local db
async function addToSummonedMobs ( m ) {
  // add next mob
  await db.summonedMobs.add( {
    name: m.name,
    data: m
  } )
}

// add to summoned mob list
function addToLocalSummonedList ( m ) {
  summonedMobsList.unshift( m )
}

// misc
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
</script>

<style>
/* mob card summoned */
.mob-card-move,
.mob-card-leave-active {
  transition: all 200ms ease-out;
}
.mob-card-move,
.mob-card-enter-active {
  transition: all 300ms ease-out;
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
