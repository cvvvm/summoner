<template>
  <!-- panel toggles -->
  <!------------------------------------------------>
  <div
    class="flex gap-1 items-center"
  >
    <p class="hidden md:inline-block pl-2 text-neutral-950">
      panel:
    </p>
    <button
      v-for="panelToggle in globalPanelOptions"
      :key="panelToggle"
      :class="toggledMobCardPanel == panelToggle && panelToggle != 'none' ? 'bg-violet-700 text-violet-200 hover:bg-violet-600 hover:text-violet-200' : ''"
      class="px-3 sm:px-3 py-1.5"
      @click="updateToggledPanel(panelToggle)"
    >
      {{ panelToggle.substring( 0, 3 ) }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits( ['refreshPanel'] )
const toggledMobCardPanel = ref( '' )
const globalPanelOptions = ['actions', 'abilities', 'details']

function updateToggledPanel ( p ) {
  if ( toggledMobCardPanel.value === p ) toggledMobCardPanel.value = 'none'
  else toggledMobCardPanel.value = p
  emit( 'refreshPanel', toggledMobCardPanel )
}
</script>
