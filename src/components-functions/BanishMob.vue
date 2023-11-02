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

  <!-- backdrop -->
  <!------------------------------------------------>
  <div
    v-show="isBanishModalOpen"
    class="
      fixed flex-initial flex
      place-content-center place-items-center
      z-[9999]
      top-0 left-0 h-full w-full
      bg-neutral-700 bg-opacity-75"
    @click.self="toggleBanishModal"
  >
    <!-- modal -->
    <!------------------------------------------------>
    <div
      class="
      grid gap-6
      relative flex-initial
      max-w-sm
      p-8 rounded-xl
      bg-neutral-950 text-neutral-400
      border border-yellow-600"
    >
      <!-- text container -->
      <div class="flex flex-col gap-2 px-3">
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
          class="bg-purple-700 text-purple-100 warn"
          @click="$emit('passMob', {data: mobIndex, type: 'banish'});
                  console.log('banish index ' + mobIndex + ' passed from button')"
        >
          banish
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineEmits(['passMob'])
defineProps({
  mobIndex: { type: Number, default: 0 },
  name: { type: String, default: '' }
})

const isBanishModalOpen = ref(false)
function toggleBanishModal () {
  isBanishModalOpen.value = !isBanishModalOpen.value
}

</script>

<style>
</style>
