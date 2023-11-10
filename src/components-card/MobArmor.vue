<template>
  <div
    class="
    grid grid-cols-[max-content_1fr] grid-rows-1 gap-2
    p-2 rounded-xl
    bg-neutral-800
    shadow-[-1px_-1px_4px_2px] shadow-neutral-950
    "
  >
    <div
      class="
      grid grid-cols-1
      place-content-center place-items-center
      py-2 px-3 rounded-lg
      bg-gradient-to-b from-neutral-950 to-neutral-900"
    >
      <!-- AC VALUE -->
      <h4 class="text-base">
        AC
      </h4>
      <div class="text-lg font-medium text-neutral-200">
        {{ props.armor[0].value }}
      </div>
    </div>

    <!-- IF desc armor -->
    <!------------------------------------------------>
    <div
      v-if="props.armor[0].armor"
      class="grid grid-cols-1 gap-1 content-center"
    >
      <div
        v-for="armorEquip in props.armor[0].armor"
        :key="armorEquip"
        class="label text-xs"
      >
        {{ armorEquip.name.toLowerCase() }}
      </div>
    </div>

    <!-- NO desc armor -->
    <div
      v-if="!props.armor[0].armor"
      class="grid grid-cols-1 gap-1 content-center"
    >
      <div
        class="label text-xs"
      >
        none equipped
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  armor: { type: Object, default: () => {} }
})
</script>

<style>
</style>
