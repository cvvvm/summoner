<template>
  <!-- open modal button -->
  <button
    class="
    p-2
    h-[32px] w-[32px]
    text-base leading-none
    hover:text-red-200 active:text-red-400
    hover:bg-red-700 active:bg-red-800"
    @click="toggleBanishModal"
  >
    <i class="bi bi-x-circle" />
  </button>

  <Transition name="fade">
    <!-- modal -->
    <!------------------------------------------------>
    <div
      v-show="!isBanishModalOpen"
      class="
      top-0
      left-0 right-0
      absolute
      grid gap-4
      items-center content-center
      w-full h-full max-h-[190px]
      p-8 pt-6 rounded-xl
      bg-neutral-950 text-neutral-400"
    >
      <!-- name -->
      <p class="text-lg font-medium text-neutral-100">
        <span class="text-red-500">banish</span> {{ name }}
      </p>

      <!-- confirm button -->
      <button
        autofocus
        class="danger"
        @click="$emit('passMob', {name: name, data: mobIndex, type: 'banish'})"
      >
        banish
      </button>

      <!-- cancel button -->
      <button
        class="base"
        @click="toggleBanishModal"
      >
        not yet
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['passMob'])
defineProps({
  mobIndex: { type: Number, default: 0 },
  name: { type: String, default: '' }
})

const isBanishModalOpen = ref(true)
function toggleBanishModal () {
  isBanishModalOpen.value = !isBanishModalOpen.value
}

</script>

<style>
</style>
