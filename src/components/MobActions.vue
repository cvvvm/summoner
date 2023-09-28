<template>
  <!-- SPECIAL ABILITIES -->
  <div class="actions-container sub-container">
    <h2 class="section-title">
      actions
    </h2>
    <div
      v-for="action in props.actions"
      :key="action"
      class="sp-action-container"
    >
      <h3>{{ action.name.toLowerCase() }}</h3>
      <div class="sp-action-desc-container">
        <div
          v-for="subaction in action.desc.toLowerCase().split(/\. /g)"
          :key="subaction"
        >
          <p>{{ subaction.replace('damage plus ', 'damage + ').replace('hit: ', '').replace(/\./gm, '') }}</p>
        </div>

        <div v-if="action.usage">
          <p>
            {{ action.usage.type }}: <span
              v-for="index in action.usage.times"
              :key="index"
            >
              <input type="checkbox">
            </span>
          </p>
        </div>
        <!-- damage -->
        <div v-if="action.damage">
          <!-- <p><span class="val-sm">{{ damageFeat.damage_dice }}</span> {{ damageFeat.damage_type.name.toLowerCase() }}</p> -->

          <MobActionDmg
            :dmg-actions="action.damage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MobActionDmg from './MobActionDmg.vue'

const props = defineProps({
  actions: { type: Object, default: () => { } }
})

</script>

<style>
.actions-container {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-lg);
    padding: var(--space-lg);
    border-radius: var(--space-sm);
    place-items: start stretch;
}

.sp-action-container {
    display: grid;
    gap: var(--space-md);
    place-content: start;
    padding: var(--space-md);
    border-radius: var(--space-xs);
    background: var(--grey-dk);
}

.sp-action-desc-container {
    display: grid;
    gap: var(--space-md);
    color: var(--grey-lt);
}
</style>
