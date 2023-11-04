<template>
  <div
    class="
    z-[1]
    fixed bottom-0 left-0 right-0
    h-[35vw]
    w-[100vw]
    blur-[14px]"
  >
    <div
      v-for="(color, index) in gradColors"
      :key="color"
      :class="gradColors[index]"
      class="
      absolute bottom-0
      w-[50%] h-[200%]
      rounded-[300px]
      bg-gradient-to-r"
    />
    <!-- rounded-e-[100%] -->
    <!-- scale-x-[100%] scale-y-[100%] -->
  </div>
</template>

<script setup>
const gradColors = [
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-x-[80%] scale-y-[55%] bg-yellow-700',
  'blur-xxl translate-x-[50%] translate-y-[50%] scale-x-[45%] scale-y-[40%] bg-orange-600',
  'blur-xxl translate-x-[50%] translate-y-[50%] scale-x-[35%] scale-y-[30%] bg-red-600',
  'blur-xxl translate-x-[50%] translate-y-[50%] scale-x-[25%] scale-y-[20%] bg-fuchsia-700',
  'blur-xxl translate-x-[50%] translate-y-[50%] scale-x-[20%] scale-y-[15%] bg-violet-700',
  'blur-xxl translate-x-[50%] translate-y-[50%] scale-x-[15%] scale-y-[10%] bg-indigo-700',
  'blur-sm translate-x-[50%] translate-y-[50%] scale-x-[10%] scale-y-[5%] bg-blue-500'
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
    translate: 0% -50;
}
</style>
