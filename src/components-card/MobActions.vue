<template>
  <!-- SPECIAL ABILITIES -->
  <div class="actions-container container-lvl1">
    <h2 class="section-title">
      actions
    </h2>
    <div
      v-for="action in props.actions"
      :key="action"
      class="action-block container-lvl2"
    >
      <!-- NAME -->
      <h3>{{ action.name.toLowerCase() }}</h3>

      <!-- DESC -->
      <div class="action-desc-block">
        <div
          v-for="subaction in action.desc.toLowerCase().replace('ft.', 'ft').split(/\. /g)"
          :key="subaction"
        >
          <!-- FIXME: add conditional for atk roll/no atk roll -->
          <p>{{ subaction.replace('damage plus ', 'damage + ').replace('hit: ', '').replace(/\./gm, '') }}.</p>
        </div>

        <!-- IF USAGE -->
        <div v-if="action.usage">
          <p v-if="action.usage.dice">
            {{ action.usage.type }} of <span class="val-sm">{{ action.usage.min_value }}</span> with <span class="val-sm">{{ action.usage.dice }}</span>
          </p>

          <p v-if="action.usage.times">
            {{ action.usage.type }}:
            <span
              v-for="index in action.usage.times"
              :key="index"
            >
              <input type="checkbox">
            </span>
          </p>
        </div>
      </div>

      <!-- DMG -->
      <div v-if="action.damage_dice">
        <MobActionDmg
          :hit-mod="action.attack_bonus"
          :dice="action.damage_dice.split('+')"
          :dmg-mod="action.damage_bonus"
        />
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
      grid-template-columns: 1fr;
      padding: var(--space-lg);
      place-items: start stretch;
    }

  .action-block {
      display: grid;
      gap: var(--space-md);
      padding: var(--space-md);
      border-radius: var(--space-xs);
      place-content: start stretch;
      place-items: start stretch;
  }

  .action-desc-block {
      display: grid;
      gap: var(--space-md);
      color: var(--grey-lt);
  }
</style>
