<template>
  <!-- open modal button -->
  <button
    class="
    p-2 text-base leading-none h-[32px] w-[32px]
    hover:bg-red-700 hover:text-red-200 active:bg-red-800 active:text-red-400"
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
      p-8 rounded-xl
      bg-neutral-950 text-neutral-400"
    >
      <!-- text container -->
      <div class="flex flex-col">
        <h2 class="text-xl font-semibold text-neutral-100">
          beginning banishment...
        </h2>
        <p>surely this <strong>{{ name }}</strong> has served it's purpose.</p>
      </div>

      <div class="grid grid-cols-2 gap-4 place-content-between">
        <!-- cancel button -->
        <button @click="toggleBanishModal">
          not yet
        </button>

        <!-- confirm button -->
        <button
          autofocus
          class="warn"
          @click="$emit('passMob', {name: name, data: mobIndex, type: 'banish'})"
        >
          banish
        </button>
      </div>
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
