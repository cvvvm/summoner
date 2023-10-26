<template>
  <!-- actions container -->
  <div class="grid grid-cols-1 items-start justify-items-stretch gap-4">
    <!-- actions map -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div
      v-for="action in props.actions"
      :key="action"
      class="action-block
      bg-neutral-900"
    >
      <!-- NAME -->
      <h3 class="text-neutral-100">
        {{ action.name.toLowerCase() }}
      </h3>
      {{ processAtkText(action.desc.toLowerCase()) }}

      <!-- DESC -->
      <p
        v-show="!atkObj.type"
        class="text-neutral-400"
      >
        {{ action.desc }}
      </p>

      <div
        v-show="atkObj.type"
        class="flex flex-wrap gap-x-4 gap-2"
      >
        <p class="flex gap-1 text-neutral-100">
          <span class="text-neutral-400 bg-neutral-950 px-1">{{ atkObj.type }}</span>
        </p>
        <p class="flex gap-1 text-neutral-100">
          <span class="text-neutral-400 bg-neutral-950 px-1">range</span> {{ atkObj.range }} ft.
        </p>
        <p class="flex gap-1 text-neutral-100">
          <span class="text-neutral-400 bg-neutral-950 px-1">dmg</span> {{ atkObj.dmgTypes }}
        </p>
        <p class="text-neutral-500">
          {{ action.desc.toLowerCase() }}
        </p>
      </div>

      <!--       <div class="grid gap-2">
        <div
          v-for="subaction in action.desc.toLowerCase().replace('ft.', 'ft').split(/\. /g)"
          :key="subaction"
        >
          <p>{{ subaction.replace('damage plus ', 'damage + ').replace('hit: ', '').replace(/\./gm, '') }}.</p>
        </div> -->

      <div v-if="action.usage">
        <p v-if="action.usage.dice">
          {{ action.usage.type }} of <span class="val-sm">{{ action.usage.min_value }}</span> with <span class="val-sm">{{ action.usage.dice }}</span>
        </p>

        <p v-if="action.usage.times">
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
          :hit-mod="atkObj.hitMod"
          :dice="atkObj.dice.split('+')"
          :dmg-mod="atkObj.dmgMod"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MobActionDmg from './MobActionDmg.vue'

const props = defineProps({
  actions: { type: Object, default: () => { } }
})
const atkObj = ({ type: '', hitMod: 0, dmgMod: 0, range: '', numTargets: '', dice: '', dmgTypes: '', save: '' })

// process actions attack text
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1. find atk type
function findAtkType (s) {
  if (s.includes('melee weapon attack')) {
    const atkType = 'melee'
    return atkType
  } else if (s.includes('ranged weapon attack')) {
    const atkType = 'ranged'
    return atkType
  }
}

// 2. find hit bonus
function findHitBon (s) {
  if (s.match(/\+.*to hit/)) {
    return s.replace('+', '').replace(/ to hit.*/, '')
  }
}

// 3. find reach/range
function findAtkReach (s) {
  if (s.match(/reach.*ft/)) {
    return s.replace(/reach /, '').replace(/ ft.*/, '')
  } else if (s.match(/range.*ft/)) {
    return s.replace(/range /, '').replace(/ ft.*/, '').replace('/', '-')
  } else if (s.match(/ ft/)) {
    return s.replace(/ ft.*/, '').replace('/', '-')
  }
}

// 4. find num atk targets
function findNumAtkTargets (s) {
  if (s.match(/ target/)) return s.replace(/ target.*| targets.*/, '')
}

// 5. find dmg dice
function findDmgDice (s) {
  s = s.replace(' + ', '+')
  return s.match(/\(\d{1,2}d\d{1,2}(?:|\+\d{1,2})\) \w+/gm)
}

// 6. find dmg type
function findDmgTypes (o) {
  const diceArray = []
  const dmgTypesArray = []
  if (o) {
    for (let i = 0; i < o.length; i++) {
      const splitArray = o[i].split(' ')
      diceArray.push(splitArray[0].replace(/\(|\)/g, ''))
      dmgTypesArray.push(splitArray[1])
    }
  }
  return [diceArray, dmgTypesArray]
}

// final: process atk
// -----------------------------------------------------------
function processAtkText (a) {
  // remove difficult characters
  let processStr = a.replace(/'/, ' ft').replace(/[^a-z | \d | + | / | ( | ) ]/g, '')

  // 1
  const atkType = findAtkType(processStr)
  processStr = processStr.replace(atkType + ' weapon attack ', '')
  atkObj.type = atkType

  // 2
  const hitBon = findHitBon(processStr)
  processStr = processStr.replace('+' + hitBon + ' to hit ', '')
  atkObj.hitMod = parseInt(hitBon)

  // 3
  const atkRange = findAtkReach(processStr)
  processStr = processStr.replace(atkRange + ' ft ', '').replace('range ', '').replace('reach ', '')
  atkObj.range = atkRange

  // 4
  const numTarget = findNumAtkTargets(processStr)
  processStr = processStr.replace(numTarget + ' target ', '').replace('hit ', '')
  atkObj.numTargets = numTarget

  // 5 + 6
  const diceDmgs = findDmgTypes(findDmgDice(processStr))
  atkObj.dice = diceDmgs[0].join('+').replace(/\+\d{1,3}/, '')
  atkObj.dmgTypes = diceDmgs[1].join(', ')
  atkObj.dmgMod = parseInt(diceDmgs[0].join('+').replace(/\d{1,3}d\d{1,3}\+/, '').replace(/\+\d{1,3}d\d{1,3}/, ''))

  // console.log('looped')
  // 7
}
</script>

<style>

  .action-block {
      display: grid;
      gap: var(--space-md);
      padding: var(--space-md);
      border-radius: var(--space-xs);
      place-content: start stretch;
      place-items: start stretch;
  }

  .action-desc-block {
      display: grid;
      gap: var(--space-md);
      color: var(--grey-lt);
  }
</style>
