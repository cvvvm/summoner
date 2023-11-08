<template>
  <div
    class="
    z-[1]
    fixed bottom-0 left-0 right-0
    h-[35vw]
    w-[100vw]
    xl:scale-x-75
    xl:scale-y-[50%]
    xl:translate-y-[25%]
    blur-xl md:blur-xxl xxl:blur-xxxl"
  >
    <div
      v-for="(color, index) in gradColors"
      :key="color"
      :class="gradColors[index]"
      class="
      absolute bottom-0
      w-[50%]
      h-[200%]
      rounded-[100%]
      bg-gradient-to-r"
    />
    <!-- rounded-e-[100%] -->
    <!-- scale-x-[100%] scale-y-[100%] -->
  </div>
</template>

<script setup>
const gradColors = [
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[70%] md:scale-y-[50%] scale-x-[70%] md:scale-y-[35%] bg-yellow-700',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[60%] md:scale-y-[45%] scale-x-[60%] md:scale-y-[30%] bg-orange-600',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[45%] md:scale-y-[40%] scale-x-[45%] md:scale-y-[25%] bg-red-600',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[35%] md:scale-y-[35%] scale-x-[35%] md:scale-y-[20%] bg-fuchsia-700',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[25%] md:scale-y-[30%] scale-x-[25%] md:scale-y-[15% bg-violet-700',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[20%] md:scale-y-[25%] scale-x-[20%] md:scale-y-[10%] bg-indigo-700',
  'blur-xxxl translate-x-[50%] translate-y-[50%] scale-y-[15%] md:scale-y-[20%] scale-x-[15%] md:scale-y-[5%] bg-blue-500'
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
