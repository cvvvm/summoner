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
      <h4
        class="
      text-xl
      text-neutral-200"
      >
        AC
      </h4>
      <div class="text-xxl">
        {{ props.armor[0].class }}
      </div>
    </div>

    <!-- IF desc armor -->
    <div
      v-if="props.armor[0].desc"
      class="grid grid-cols-1 gap-1 content-center"
    >
      <div
        v-for="type in props.armor[0].desc.split(',')"
        :key="type"
        class="label"
      >
        {{ type.replace('\(', '').replace('\)', '') }}
      </div>
    </div>

    <!-- NO desc armor -->
    <div
      v-if="!props.armor[0].desc"
      class="grid grid-cols-1 gap-1 content-center justify-items-center"
    >
      <div
        class="label text-center w-min"
      >
        none equipped
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
