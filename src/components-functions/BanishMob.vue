<template>
  <!-- open modal button -->
  <button
    class="
    icon-btn
    hover:text-red-200 active:text-red-400
    hover:bg-red-700 active:bg-red-800"
    @click="toggleBanishModal"
  >
    <i class="bi bi-x-circle" />
  </button>

  <Transition name="fade">
    <!-- masking container -->
    <!------------------------------------------------>
    <!-- bg-gradient-to-t from-[rgb(51,51,51)] bg-neutral-700 -->
    <div
      v-show="isBanishModalOpen"
      class="
        absolute overflow-y-hidden
        flex place-content-end place-items-end
        top-0 left-0 right-0
        h-[48px]
        rounded-t-xxxl
        bg-neutral-700
        "
    >
      <!-- layout -->
      <div
        class="
        w-full
        grid grid-cols-[1fr,_min-content]
        px-3 gap-4
        "
      >
        <!-- name -->
        <p
          class="
          self-end
          truncate tracking-tight
          text-xl text-neutral-100
          font-medium
          pl-1 pb-1
          "
        >
          {{ name }}
        </p>

        <!-- buttons -->
        <!------------------------------------------------>
        <div class="flex gap-2 justify-self-end">
          <!-- confirm -->
          <button
            autofocus
            class="danger self-stretch h-[36px]"
            @click="$emit('passMob', {name: name, data: mobIndex, type: 'banish'})"
          >
            banish
          </button>

          <!-- cancel -->
          <button
            class="
            icon-btn"
            @click="toggleBanishModal"
          >
            <i class="bi bi-x-circle" />
          </button>
        </div>
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

const isBanishModalOpen = ref(false)
function toggleBanishModal () {
  isBanishModalOpen.value = !isBanishModalOpen.value
}

</script>

<style>
.banish-leave-active,
.banish-enter-active {
  transition:
  left 200ms ease-out,
  width 200ms ease-out,
  translate 200ms ease-out;
}
.banish-leave-to,
.banish-enter-from {
  left: 100px;
  width: 0px;
  /* translate: -5px 0px; */
}
</style>
