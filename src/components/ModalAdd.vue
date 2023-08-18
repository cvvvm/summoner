<template>
  <div
    className="backdrop"
    @click.self="closeModal"
  >
    <div class="modal">
      <button @click="closeModal">
        X
      </button>
      <h1>{{ props.title }}</h1>
      <label for="site-search">
        <input
          id="creature-search"
          type="search"
          name="creature-search"
          placeholder="little beasts"
        >
      </label>
      <button>Summon</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ title: { type: String, default: '' } })
function closeModal () {
  this.$emit('close')
}
</script>

<style>
  .modal {
    position: relative;
    flex: 0 1 auto;
    max-width: 800px;
    height: fit-content;
    padding: 2rem;
    background: white;
  }
  .backdrop {
    position: fixed;
    display: flex;
    place-content: center;
    place-items: center;
    top: 0;
    width: 100dvw;
    height: 100dvh;
    background: rgba(0,0,0,.5);
  }
</style>
