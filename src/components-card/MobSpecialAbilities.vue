<template>
  <!-- SPECIAL ABILITIES -->
  <div class="grid grid-cols-1 items-start justify-items-stretch gap-4">
    <!-- abilities map -->
    <!-------------------------------------------------->
    <div
      v-for="ability in props.specialAbilities"
      :key="ability"
      class="title-content"
    >
      <h3 class="title">
        {{ ability.name.toLowerCase() }}
      </h3>
      <div class="content">
        <p>{{ ability.desc.toLowerCase() }}</p>
        <div v-if="ability.usage">
          <p>
            {{ ability.usage.type }}: <span
              v-for="index in ability.usage.times"
              :key="index"
            >
              <input type="checkbox">
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps( {
  specialAbilities: { type: Array, default: () => [''] }
} )

</script>

<style>
.sp-ability-block {
  display:       grid;
  place-content: start;
  padding:       var(--space-md);
  border-radius: var(--space-xs);
  background:    var(--grey-dk);
  gap:           var(--space-md);
}

</style>
