<template>
  <div
    class="
    z-50 sm:z-[9999]
    fixed top-0 bottom-0 left-0
    h-[100vh]
    w-[50vh]"
  >
    <div
      class="
      absolute left-0
      rounded-e-[100%]
      w-[150%] h-full
      scale-x-[50%] scale-y-[50%]
      translate-x-[-50%]
      bg-gradient-to-r from-yellow-700 via-yellow-600
      blur-xxxl"
    />
    <div
      class="
      absolute left-0
      rounded-e-[100%]
      w-[150%] h-full
      scale-x-[40%] scale-y-[40%]
      translate-x-[-50%]
      bg-gradient-to-r from-orange-700 via-orange-600
      blur-xxxl"
    />
    <div
      class="
      absolute left-0
      rounded-e-[100%]
      w-[150%] h-full
      scale-x-[35%] scale-y-[35%]
      translate-x-[-50%]
      bg-gradient-to-r from-red-700 via-red-600
      blur-xxxl"
    />
    <div
      class="
      absolute left-0
      rounded-e-[100%]
      w-[150%] h-full
      scale-x-[25%] scale-y-[25%]
      translate-x-[-50%]
      bg-gradient-to-r from-pink-700 via-fuchsia-600
      blur-xxxl"
    />
    <div
      class="
      absolute left-0
      rounded-e-[100%]
      w-[150%] h-full
      scale-x-[20%] scale-y-[15%]
      translate-x-[-50%]
      bg-gradient-to-r from-violet-700 via-violet-600
      blur-xxxl"
    />
  </div>
</template>

<script setup>
</script>

<style>
/* card loading placeholder */
.summon-load-leave-active {
  transition:
    opacity 200ms ease-out,
    ;
}
.summon-load-enter-active {
  transition:
    opacity 300ms ease-in-out,
    translate 600ms ease-in-out,
    ;
}
.summon-load-leave-to {
    opacity: 0;
}
.summon-load-enter-from {
    opacity: 0;
    translate: -50% 0;
}
</style>
