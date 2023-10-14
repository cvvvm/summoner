<template>
  <div
    class="grid grid-cols-[.5fr_1fr] grid-rows-1 gap-1
    pl-2 py-2 px-4 rounded-lg
    bg-zinc-900"
  >
    <div
      class="grid grid-cols-1 place-content-center place-items-center"
    >
      <!-- AC VALUE -->
      <h4
        class="
      text-xl
      text-zinc-200"
      >
        AC
      </h4>
      <div class="text-2xl">
        {{ props.armor[0].class }}
      </div>
    </div>
    <!-- desc -->
    <div class="grid grid-cols-1 gap-1 content-center">
      <div
        v-for="type in props.armor[0].desc.split(',')"
        :key="type"
        class="label"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  armor: { type: Object, default: () => { } }
})
</script>

<style>
</style>
