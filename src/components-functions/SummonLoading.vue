<template>
  <div
    class="
    z-50 sm:z-[9999]
    fixed top-0 bottom-0 left-0
    h-[100vh]
    w-[50vh]
    blur-sm"
  >
    <div
      v-for="(color, index) in gradColors"
      :key="color"
      :class="gradColors[index]"
      class="
      absolute left-0
      rounded-e-[100%]
      w-[50%] h-full
      bg-gradient-to-r
      "
    />
    <!-- scale-x-[100%] scale-y-[100%] -->
  </div>
</template>

<script setup>
const gradColors = [
  'blur-xxxl translate-x-[-50%] scale-x-[80%] scale-y-[80%] bg-yellow-800',
  'blur-xxxl translate-x-[-50%] scale-x-[65%] scale-y-[65%] bg-yellow-600',
  'blur-xxxl translate-x-[-50%] scale-x-[50%] scale-y-[50%] bg-orange-700',
  'blur-xxl translate-x-[-50%] scale-x-[45%] scale-y-[45%] bg-red-600',
  'blur-xxl translate-x-[-50%] scale-x-[35%] scale-y-[35%] bg-fuchsia-700',
  'blur-xxl translate-x-[-50%] scale-x-[25%] scale-y-[25%] bg-violet-700',
  'blur-xl translate-x-[-50%] scale-x-[15%] scale-y-[15%] bg-indigo-700',
  'blur-xl translate-x-[-50%] scale-x-[10%] scale-y-[10%] bg-blue-800',
  'blur-xl translate-x-[-50%] scale-x-[7%] scale-y-[7%] bg-blue-700'
]

</script>

<style>
/* card loading placeholder */
.summon-load-leave-active {
  transition:
    opacity 300ms ease-out,
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
