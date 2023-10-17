<template>
  <!-- open modal button -->
  <button
    class="px-1
          hover:bg-red-700 hover:text-red-200 active:bg-red-800 active:text-red-400"
    @click="toggleBanishModal"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  </button>

  <!-- backdrop -->
  <div
    v-show="isBanishModalOpen"
    class="
      fixed flex-initial flex
      place-content-center place-items-center
      z-[9999]
      top-0 left-0 h-full w-full
      bg-zinc-700 bg-opacity-75"
    @click.self="toggleBanishModal"
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
