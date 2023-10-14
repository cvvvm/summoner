<template>
  <!-- DEFENSES -->
  <div class="grid grid-cols-1 gap-4">
    <!-- damage vul -->
    <div
      v-if="props.damageVulnerabilities.length != 0"
      class="grid grid-cols-1 gap-2
        text-sm"
    >
      <span class="label">damage vulnerabilities:</span>
      <p class="px-2">
        {{ props.damageVulnerabilities }}
      </p>
    </div>

    <!-- damage res -->
    <div
      v-if="props.damageResistances.length != 0"
      class="grid grid-cols-1 gap-2
        text-sm"
    >
      <span class="label">damage resistances:</span>
      <p class="px-2">
        {{ props.damageResistances }}
      </p>
    </div>

    <!-- damage imm -->
    <div
      v-if="props.damageImmunities.length != 0"
      class="grid grid-cols-1 gap-2
        text-sm"
    >
      <span class="label">damage immunities:</span>
      <p class="px-2">
        {{ props.damageImmunities }}
      </p>
    </div>

    <!-- cond imm -->
    <div
      v-if="props.conditionImmunities.length != 0"
      class="grid grid-cols-1 gap-2
        text-sm"
    >
      <span class="label">condition immunities:</span>
      <p class="px-2">
        {{ props.conditionImmunities }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' }
})

</script>

<style>
</style>
