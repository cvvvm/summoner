<template>
  <!-- sort-->
  <!------------------------------------------------>
  <div class="flex gap-2 items-center">
    <button
      class="px-2 sm:px-3"
      @click="alphaSort(props.mobsObj)"
    >
      {{ alphaSortDirection }}
    </button>
    <button
      class="px-2 sm:px-3"
      @click="hpSort(props.mobsObj)"
    >
      {{ hpSortDirection }}
    </button>
    <button
      class="px-2 sm:px-3"
      @click="acSort(props.mobsObj)"
    >
      {{ acSortDirection }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['updateMobsObj'])
const props = defineProps({
  mobsObj: { type: Object, default: () => {} }
})

// SORTING
// ------------------------------------------------------------------------------------
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const alphaSortDirection = ref('a-z')
const hpSortDirection = ref('hp ↑')
const acSortDirection = ref('ac ↑')

// alpha sort
// -----------------------------------------------------------
function alphaSort (m) {
  if (alphaSortDirection.value === 'a-z') sortArrayAlphaAsc(m)
  else if (alphaSortDirection.value === 'z-a') sortArrayAlphaDesc(m)
}
// sort alpha asc
function sortArrayAlphaAsc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}
// sort alpha desc
function sortArrayAlphaDesc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}

// hp sort
// -----------------------------------------------------------
function hpSort (m) {
  if (hpSortDirection.value === 'hp ↓') sortArrayHpAsc(m)
  else if (hpSortDirection.value === 'hp ↑') sortArrayHpDesc(m)
}
// sort hp asc
function sortArrayHpAsc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}
// sort hp desc
function sortArrayHpDesc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}

// ac sort
// -----------------------------------------------------------
function acSort (m) {
  if (acSortDirection.value === 'ac ↓') sortArrayAcAsc(m)
  else if (acSortDirection.value === 'ac ↑') sortArrayHAcesc(m)
}
// sort hp asc
function sortArrayAcAsc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}
// sort hp desc
function sortArrayHAcesc (m) {
  m.sort((a, b) => {
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
  emit('updateMobsObj', m)
}
</script>
