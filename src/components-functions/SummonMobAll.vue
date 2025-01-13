<template>
  <!-- search list container -->
  <!------------------------------------------------>
  <div
    class="
    grid grid-cols-1
    items-start justify-items-stretch
    h-full
    overflow-y-auto
    p-1"
  >
    <!-- search list -->
    <div
      class="
      flex flex-col gap-1
      place-content-start
      overflow-y-auto
      h-full
      pr-2"
    >
      <div
        v-for="mob in props.mobsAll.slice(0, props.searchLimit)"
        :key="mob"
        class="
          grid gap-1
          grid-cols-[min-content,_1fr,_min-content]
          items-center
          border border-neutral-950
          transition-colors"
        @keypress.enter="$emit('summonMob', mob.url);
                         $emit('toggleSummonModal')"
      >
        <!-- pin to faves -->
        <i
          class="
            bi bi-heart-fill
            text-sm leading-none
            p-3 rounded-sm
            bg-neutral-900 hover:bg-neutral-800
            text-neutral-700 hover:text-pink-500"
          @click="$emit('addFav', { index: mob.index, name: mob.name, url: mob.url})"
        />
        <!-- name / summon & close -->
        <button
          class="
          self-stretch
          p-2 rounded-sm
          text-sm text-left
          bg-neutral-900 hover:bg-green-400
          hover:text-green-950"
          @click="$emit('summonMob', mob.url);
                  $emit('toggleSummonModal')"
        >
          {{ mob.name.toLowerCase() }}
        </button>
        <!-- summon multiple -->
        <button
          class="
          bi bi-plus-lg
          text-sm leading-none
          p-3 rounded-sm
          bg-neutral-900 hover:bg-green-400
          hover:text-green-950"
          @click="$emit('summonMob', mob.url)"
        />
      </div>
      <button
        v-show="props.mobsAll.length >= props.searchLimit"
        @click="$emit('updateSearchLimit')"
      >
        load more
      </button>
    </div><!-- end search list -->
  </div><!-- end search list container -->
</template>

<script setup>
defineEmits( [
  'toggleSummonModal',
  'summonMob',
  'updateSearchLimit',
  'addFav'] )
const props = defineProps( {
  mobsAll: {
    type: Object,
    default: () => {
    }
  },
  searchLimit: { type: Number, default: 100 }
} )

</script>

<style scoped>
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  color: inherit;
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  color:      inherit;
  width:      4px;
  height: 4px;
  background: rgba(37, 197, 94, 0.5);
}

::-webkit-scrollbar-thumb {
  color:      inherit;
  width:      4px;
  height: 4px;
  background: rgba(37, 197, 94, 1);
}

::-webkit-scrollbar:window-inactive {
  visibility: hidden;
}
</style>
