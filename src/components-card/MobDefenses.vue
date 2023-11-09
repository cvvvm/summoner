<template>
  <!-- DEFENSES -->
  <div class="grid grid-cols-1 gap-1">
    <!-- damage vul -->
    <div
      v-if="props.damageVulnerabilities.length != 0"
      class="label-val"
    >
      <span class="label">damage vulnerabilities:</span>
      <span
        v-for="def in props.damageVulnerabilities"
        :key="def"
        class="val"
      >
        {{ def }}
      </span>
    </div>

    <!-- damage res -->
    <div
      v-if="props.damageResistances.length != 0"
      class="label-val"
    >
      <span class="label">damage resistances</span>
      <span
        v-for="def in props.damageResistances"
        :key="def"
        class="val"
      >
        {{ def }}
      </span>
    </div>

    <!-- damage imm -->
    <div
      v-if="props.damageImmunities.length != 0"
      class="label-val"
    >
      <span class="label">damage immunities</span>
      <span
        v-for="def in props.damageImmunities"
        :key="def"
        class="val"
      >
        {{ def }}
      </span>
    </div>

    <!-- cond imm -->
    <div
      v-if="props.conditionImmunities.length != 0"
      class="label-val"
    >
      <span class="label">condition immunities</span>
      <span
        v-for="def in props.conditionImmunities"
        :key="def"
        class="val"
      >
        {{ def.name.toLowerCase() }}
      </span>
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
