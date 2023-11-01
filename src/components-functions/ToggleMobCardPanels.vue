<template>
  <!-- panel toggles -->
  <!------------------------------------------------>
  <div
    class="hidden sm:flex gap-2 items-center"
  >
    <p>show:</p>
    <button
      v-for="panelToggle in globalPanelOptions"
      :key="panelToggle"
      :class="toggledMobCardPanel == panelToggle && panelToggle != 'none' ? 'bg-yellow-500 text-yellow-950 hover:bg-yellow-600 hover:text-yellow-950' : ''"
      @click="updateToggledPanel(panelToggle)"
    >
      {{ panelToggle.substring(0, 3) }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['refreshPanel'])
const toggledMobCardPanel = ref('none')
const globalPanelOptions = ['none', 'actions', 'abilities', 'details']

function updateToggledPanel (p) {
  if (toggledMobCardPanel.value === p) toggledMobCardPanel.value = 'none'
  else toggledMobCardPanel.value = p
  emit('refreshPanel', toggledMobCardPanel)
}
</script>
