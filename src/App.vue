<template>
<h1>{{title}}</h1>
<ModalAdd/>
<MobCards/>
</template>

<script>
  import MobCards from './components/MobCards.vue';
  import ModalAdd from './components/ModalAdd.vue'
  export default {
    name: 'App',
    components: {MobCards, ModalAdd},
    data() {
      return {
        title: 'Mobs:'
      };
    },
    methods: {
      handleClick() {
        console.log(this.$refs.name)
        this.$refs.name.classList.add('active')
        this.$refs.name.focus()
      }
    }

  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  * {margin: 0;}
</style>