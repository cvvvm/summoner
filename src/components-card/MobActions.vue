<template>
  <!-- actions container -->
  <div class="grid grid-cols-1 items-start justify-items-stretch gap-4">
    <!-- actions map -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      v-for="action in props.actions"
      :key="action"
      class="title-content"
    >
      <!-- NAME -->
      <h3 class="title">
        {{ action.name.toLowerCase() }}
      </h3>

      <span
        class="content
      flex flex-col gap-2"
      >
        <p class="text-red-500">{{ processAtkText( action.desc.toLowerCase() ) }}</p>

        <!-- desc (no attack) -->
        <!------------------------------------------------>
        <p
          v-show="!atkObj.type"
          class="text-neutral-300"
        >
          {{ action.desc.toLowerCase() }}
        </p>

        <!-- attack exists -->
        <!------------------------------------------------>
        <div
          v-show="atkObj.type"
          class="flex flex-wrap gap-2"
        >
          <!-- type/range -->
          <p class="label-val">
            <span class="label">{{ atkObj.type }}</span>
            <span class="val">{{ atkObj.range }} ft.</span>
          </p>
          <!-- dmg type -->
          <p
            v-show="atkObj.dmgTypes"
            class="label-val"
          >
            <span class="label">dmg</span>
            <span class="val">{{ atkObj.dmgTypes }}</span>
          </p>
          <!-- save -->
          <p
            v-show="atkObj.saveThrow"
            class="label-val"
          >
            <span class="label">dc</span>
            <span class="val"> {{ atkObj.saveThrow }}</span>
          </p>
          <!-- desc (with attack) -->
          <p class="text-neutral-500">
            {{ action.desc.toLowerCase() }}
          </p>
        </div>

        <div v-if="action.usage">
          <p v-if="action.usage.dice">
            {{ action.usage.type }} of <span class="val-sm">{{
              action.usage.min_value
            }}</span> with <span class="val-sm">{{
              action.usage.dice
            }}</span>
          </p>

          <!-- usage per day -->
          <!------------------------------------------------>
          <p
            v-if="action.usage.times"
            class="flex gap-1"
          >
            {{ action.usage.type }}:
            <span
              v-for="index in action.usage.times"
              :key="index"
            >
              <input type="checkbox">
            </span>
          </p>
        </div>
        <!-- </div> -->

        <!-- DMG -->
        <div v-if="atkObj.dice">
          <MobActionDmg
            :dice="atkObj.dice.split('+')"
            :dmg-mod="atkObj.dmgMod"
            :hit-mod="atkObj.hitMod"
          />
        </div>
      </span>
    </div>
  </div>
</template>

<script setup>
import MobActionDmg from './MobActionDmg.vue'

const props = defineProps( {
  actions: {
    type: Object,
    default: () => {
    }
  }
} )
const atkObj = ( { type: '', hitMod: 0, dmgMod: 0, range: '', numTargets: '', dice: '', dmgTypes: '', saveThrow: '' } )

// process actions attack text
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1. find atk type
function findAtkType ( s ) {
  if ( s.match( /.* or .* weapon attack/ ) ) {
    const atkType = 'melee/ranged'
    return atkType
  } else if ( s.includes( 'melee weapon attack' ) ) {
    const atkType = 'melee'
    return atkType
  } else if ( s.includes( 'ranged weapon attack' ) ) {
    const atkType = 'ranged'
    return atkType
  }
}

// 2. find hit bonus
function findHitBon ( s ) {
  if ( s.match( /\+.*to hit/ ) ) {
    return s.replace( '+', '' ).replace( / to hit.*/, '' )
  }
}

// 3. find reach/range
function findAtkReach ( s ) {
  if ( s.match( /reach.*ft/ ) ) {
    return s.replace( /reach /, '' ).replace( / ft.*/, '' )
  } else if ( s.match( /range.*ft/ ) ) {
    return s.replace( /range /, '' ).replace( / ft.*/, '' ).replace( '/', '-' )
  } else if ( s.match( / ft/ ) ) {
    return s.replace( / ft.*/, '' ).replace( '/', '-' )
  }
}

// 4. find num atk targets
function findNumAtkTargets ( s ) {
  if ( s.match( / target/ ) ) return s.replace( / target.*| targets.*| creature.*| creatures.*/, '' )
}

// 5. find dmg dice
function findDmgDice ( s ) {
  s = s.replace( ' + ', '+' )
  return s.match( /\(\d{1,2}d\d{1,2}(?:|\+\d{1,2})\) \w+/gm )
}

// 6. find dmg type
function findDmgTypes ( o ) {
  const diceArray = []
  const dmgTypesArray = []
  if ( o ) {
    for ( let i = 0; i < o.length; i++ ) {
      const splitArray = o[i].split( ' ' )
      diceArray.push( splitArray[0].replace( /\(|\)/gm, '' ) )
      dmgTypesArray.push( splitArray[1] )
    }
  }
  return [diceArray, dmgTypesArray]
}

// 7. find save
function findSaveThrow ( o ) {
  const foundMatch = o.match( /dc \d{1,3} .../ )
  if ( foundMatch ) {
    return foundMatch[0].replace( / saving.*| check.*| save.*/, '' ).replace( 'dc ', '' )
  }
}

// final: process atk
// -----------------------------------------------------------
function processAtkText ( a ) {
  // remove difficult characters
  let processStr = a.replace( /'/, ' ft' ).replace( /[^a-z | \d | + | / | ( | ) ]/g, '' )

  // 1
  const atkType = findAtkType( processStr )
  processStr = processStr.replace( /.* weapon attack | .* or .* weapon attack/, '' )
  atkObj.type = atkType

  // 2
  const hitBon = findHitBon( processStr )
  processStr = processStr.replace( '+' + hitBon + ' to hit ', '' )
  atkObj.hitMod = parseInt( hitBon )

  // 3
  const atkRange = findAtkReach( processStr )
  processStr = processStr.replace( atkRange + ' ft ', '' ).replace( 'range ', '' ).replace( 'reach ', '' )
  atkObj.range = atkRange

  // 4
  const numTarget = findNumAtkTargets( processStr )
  processStr = processStr.replace( numTarget + ' target ', '' ).replace( 'hit ', '' )
  atkObj.numTargets = numTarget

  // 5 + 6
  const diceDmgs = findDmgTypes( findDmgDice( processStr ) )
  atkObj.dice = diceDmgs[0].join( '+' ).replace( /\+\d{1,3}/, '' )
  atkObj.dmgTypes = diceDmgs[1].join( ', ' )
  atkObj.dmgMod = parseInt( diceDmgs[0].join( '+' ).replace( /\d{1,3}d\d{1,3}\+/, '' ).replace( /\+\d{1,3}d\d{1,3}/, '' ) )

  // 7
  const saveThrow = findSaveThrow( processStr )
  atkObj.saveThrow = saveThrow

  // console.log('looped')
}
</script>

<style>

.action-block {
  display:       grid;
  place-content: start stretch;
  place-items:   start stretch;
  padding:       var(--space-md);
  border-radius: var(--space-xs);
  gap:           var(--space-md);
}

.action-desc-block {
  display: grid;
  color:   var(--grey-lt);
  gap:     var(--space-md);
}
</style>
