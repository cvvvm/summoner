<template>
  <!-- backdrop -->
  <div
    v-show="isBanishModalOpen"
    className="remove-mob-backdrop"
    @click.self="toggleBanishModal"
    @keypress.esc="toggleBanishModal"
  >
    <!-- banish modal -->
    <div
      class="remove-mob-container"
    >
      <h3>Banishment Ritual</h3>
      <p>has this {{ props.name }} served it's purpose?</p>

      <div class="container-lvl1 col-2">
        <!-- abandon -->
        <button @click="toggleBanishModal">
          abandon ritual
        </button>

        <!-- confirm -->
        <button
          autofocus
          @click="removeMobConfirm()"
        >
          complete ritual
        </button>
      </div>
    </div>
  </div>

  <!-- open confirm modal -->
  <button @click="toggleBanishModal">
    remove mob
    {{ props.mobIndex }}
  </button>
</template>

<script setup>
import { ref } from 'vue'

// const emit = defineEmits(['emitRemoveMobConfirm'])
const props = defineProps({
  mobIndex: { type: Number, default: 0 },
  name: { type: String, default: '' }
})
const isBanishModalOpen = ref(false)

function toggleBanishModal () {
  isBanishModalOpen.value = !isBanishModalOpen.value
}

function removeMobConfirm () {
  // emit('removeMobConfirm', props.mobIndex)
  console.log(props.mobIndex)
}

</script>

<style>
  .remove-mob-container {
    position: relative;
    flex: 0 1 auto;
    max-width: 90vw;
    padding: 2rem;
    border-radius: var(--space-md);
    color: black;
    background: white;
  }
  .remove-mob-backdrop {
    overflow: auto;
    position: fixed;
    display: flex;
    place-content: center;
    place-items: center;
    top: 0;
    right: 0;
    width: 100dvw;
    height: 100dvh;
    background:rgba(255,0,0, .75);
  }

</style>
