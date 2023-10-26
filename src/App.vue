<template>
  <!-- cards container -->
  <!------------------------------------------------>
  <MobCardsContainer />

  <!-- footer -->
  <!------------------------------------------------>
  <footer
    class="flex place-content-around place-items-center
          min-h-[5vh]
          bg-neutral-900"
  >
    <a
      class="text-sm underline underline-offset-2 text-neutral-300 decoration-neutral-500 hover:text-neutral-100 hover:decoration-neutral-500 transition-colors"
      href="https://open5e.com"
    >data from open5e</a>
    <p>built with Vue + Tailwind</p>
  </footer>
</template>

<script setup>
import MobCardsContainer from './components-page/MobCardsContainer.vue'
</script>

<style>
</style>
