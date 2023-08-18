<template>
  <div v-show="modalOpen">
    <ModalAdd
      :title="modalTitle"
      @close="toggleModal"
    />
  </div>
  <MobCardsContainer>
    <button @click="toggleModal">
      new creature
    </button>
  </MobCardsContainer>
</template>

<script>
import MobCardsContainer from './components/MobCardsContainer.vue'
import ModalAdd from './components/ModalAdd.vue'
export default {
  name: 'App',
  components: { MobCardsContainer, ModalAdd },
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
