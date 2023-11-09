<template>
  <div
    class="grid grid-cols-[max-content_1fr] grid-rows-1 gap-2
    p-2 rounded-lg
    bg-neutral-900"
  >
    <div
      class="grid grid-cols-1 place-content-center place-items-center
            py-1 px-3 rounded-md
            bg-neutral-950"
    >
      <!-- AC VALUE -->
      <h4 class="text-xl">
        AC
      </h4>
      <div class="text-xl text-neutral-200">
        {{ props.armor[0].value }}
      </div>
    </div>

    <!-- IF desc armor -->
    <div
      v-if="props.armor[0].armor"
      class="grid grid-cols-1 gap-1 content-center"
    >
      <div
        v-for="armorEquip in props.armor[0].armor"
        :key="armorEquip"
        class="label"
      >
        {{ armorEquip.name.toLowerCase() }}
      </div>
    </div>

    <!-- NO desc armor -->
    <div
      v-if="!props.armor[0].armor"
      class="grid grid-cols-1 gap-1 content-center justify-items-center"
    >
      <div
        class="label"
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
