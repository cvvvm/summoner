<template>
  <div
    class="legendary-actions-container container-lvl1"
  >
    <h2 class="section-title">
      legendary actions
    </h2>
    <p>
      {{ props.legendaryDesc }}
    </p>
    <div
      v-for="action in props.legendaryActions"
      :key="action"
      class="legendary-action-block container-lvl2"
    >
      <h3>{{ action.name.toLowerCase() }}</h3>
      <div v-if="action.usage">
        <p>
          {{ action.usage.type }} of <span class="val-sm">{{ action.usage.min_value }}</span> with <span
            class="val-sm"
          >{{ action.usage.dice }}</span>
        </p>
      </div>
      <!-- damage -->
      <div v-if="action.damage">
        <!-- <p><span class="val-sm">{{ damageFeat.damage_dice }}</span> {{ damageFeat.damage_type.name.toLowerCase() }}</p> -->
        <MobActionDmg :dmg-actions="action.damage" />
      </div>
      <div class="legendary-action-desc-block">
        <div
          v-for="subaction in action.desc.toLowerCase().split(/\. /g)"
          :key="subaction"
        >
          <p>{{ subaction.replace('damage plus ', 'damage + ').replace('hit: ', '').replace(/\./gm, '') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobActionDmg from './MobActionDmg.vue'

const props = defineProps({
  legendaryActions: { type: Object, default: () => { } },
  legendaryDesc: { type: String, default: '' }
})

</script>

<style>
.legendary-actions-container {
    grid-template-columns: 1fr;
    place-items: start stretch;
    padding: var(--space-lg);
}

.legendary-action-block {
    display: grid;
    gap: var(--space-md);
    place-content: start stretch;
    place-items: start stretch;

    padding: var(--space-md);
    border-radius: var(--space-xs);
}

.legendary-action-desc-block {
    display: grid;
    gap: var(--space-md);
    color: var(--grey-lt);
}
</style>
