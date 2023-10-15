<template>
  <!-- open modal button -->
  <button
    @click="toggleBanishModal"
  >
    banish
  </button>

  <!-- backdrop -->
  <div
    v-show="isBanishModalOpen"
    class="
      fixed flex-initial flex
      place-content-center place-items-center
      top-0 left-0 h-full w-full
      bg-zinc-700 bg-opacity-75"
    @click.self="toggleBanishModal"
    @keypress.esc="toggleBanishModal"
  >
    <!-- modal -->
    <div
      class="
      grid gap-6
      relative flex-initial
      max-w-sm
      p-8 rounded-xl
      bg-zinc-950 text-zinc-400
      border border-yellow-600"
    >
      <!-- text container -->
      <div class="flex flex-col gap-2 px-3">
        <h2 class="text-xl font-semibold text-zinc-100">
          beginning banishment...
        </h2>
        <p>surely this <strong>{{ name }}</strong> has served it's purpose.</p>
      </div>

      <div class="grid grid-cols-2 gap-5 place-content-between">
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
