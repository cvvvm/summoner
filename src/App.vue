<template>
  <div v-show="modalOpen">
    <ModalAdd
      :title="modalTitle"
      @close="toggleModal"
    />
  </div>
  <MobCards>
    <button @click="toggleModal">
      new creature
    </button>
  </MobCards>
</template>

<script>
import MobCards from './components/MobCards.vue'
import ModalAdd from './components/ModalAdd.vue'
export default {
  name: 'App',
  components: { MobCards, ModalAdd },
  data () {
    return {
      modalTitle: 'Summon new creature:',
      modalOpen: false
    }
  },
  methods: {
    toggleModal () {
      this.modalOpen = !this.modalOpen
    }
  }

}
</script>

<style>
</style>
