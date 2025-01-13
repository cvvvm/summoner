<template>
  <!-- DEFENSES -->
  <div class="grid grid-cols-1 gap-2">
    <!-- damage vul -->
    <div
      v-if="props.damageVulnerabilities.length != 0"
      class="label-val"
    >
      <span class="label">damage vulnerabilities:</span>
      <span class="val flex flex-col gap-2">

        <span
          v-for="def in props.damageVulnerabilities"
          :key="def"
        >
          {{ def }}
        </span>
      </span>
    </div>

    <!-- damage res -->
    <div
      v-if="props.damageResistances.length != 0"
      class="label-val"
    >
      <span class="label">damage resistances</span>
      <span class="val flex flex-col gap-2">

        <span
          v-for="def in props.damageResistances"
          :key="def"
        >
          {{ def }}
        </span>
      </span>
    </div>

    <!-- damage imm -->
    <div
      v-if="props.damageImmunities.length != 0"
      class="label-val"
    >
      <span class="label">damage immunities</span>
      <span class="val flex flex-col gap-2">

        <span
          v-for="def in props.damageImmunities"
          :key="def"
        >
          {{ def }}
        </span>
      </span>
    </div>

    <!-- cond imm -->
    <div
      v-if="props.conditionImmunities.length != 0"
      class="label-val"
    >
      <span class="label">condition immunities</span>
      <span class="val flex flex-col gap-2">

        <span
          v-for="def in props.conditionImmunities"
          :key="def"
        >
          {{ def.name.toLowerCase() }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps( {
  damageVulnerabilities: { type: String, default: '' },
  damageResistances: { type: String, default: '' },
  damageImmunities: { type: String, default: '' },
  conditionImmunities: { type: String, default: '' }
} )

</script>

<style>
</style>
