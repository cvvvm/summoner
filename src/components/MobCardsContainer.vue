<template>
  <!-- ALIVE -->
  <!--   <div v-show="aliveCreatures.length > 0" class="creature-cards-container">

    <div v-for="creature in aliveCreatures" :class="{ 'is-dead': creature.isDead }" class="creature-card"
      :key="creature.id">

      <div class="creature-edit-buttons-container">
        <button class="creature-edit-button">edit</button>
        <button class="creature-edit-button">duplicate</button>
      </div>

      <div class="creature-avatar-frame">
        <img :src="creature.avatar" alt="" class="creature-avatar" />
      </div>
      <h2 class="creature-name">{{ creature.name }}</h2>
      <p class="creature-desc">{{ creature.desc }}</p>

      <p class="creature-health" v-show="!creature.isDead">{{ creature.baseHp - creature.hpLost }}/{{ creature.baseHp }}
      </p>
      <p class="creature-health" v-show="creature.isDead">DEAD</p>

      <div @click="this.checkDead(creature)" class="creature-hp-buttons-container">
        <button class="creature-hp-button" @click="this.hurtCreature(creature, 1)" v-show="!creature.isDead">-1</button>
        <button class="creature-hp-button" @click="this.healCreature(creature, 1)" v-show="!creature.isDead">+1</button>
        <button class="creature-hp-button" @click="creature.hpLost = creature.baseHp" v-show="!creature.isDead">
          KILL
        </button>
      </div>
    </div>
  </div> -->

  <!-- DEAD -->
  <div
    v-show="deadCreatures.length > 0"
    class="creature-cards-container"
  >
    <div class="creature-cards-container-header">
      <h2 style="grid-column: 1/-1">
        Dead ({{ deadCreatures.length }})
      </h2>
      <button>revive all</button>
    </div>
    <div
      v-for="creature in deadCreatures"
      :key="creature.id"
      :class="{ 'is-dead': creature.isDead }"
      class="creature-card"
    >
      <!-- details -->
      <div class="creature-avatar-frame">
        <img
          :src="creature.avatar"
          alt=""
          class="creature-avatar"
        >
      </div>
      <h2 class="creature-name">
        {{ creature.name }}
      </h2>
      <p class="creature-desc">
        {{ creature.desc }}
      </p>

      <!-- health -->
      <p
        v-show="!creature.isDead"
        class="creature-health"
      >
        {{ creature.baseHp - creature.hpLost }}/{{ creature.baseHp }}
      </p>
      <p
        v-show="creature.isDead"
        class="creature-health"
      >
        DEAD
      </p>

      <!-- toggles -->
      <div
        class="creature-hp-buttons-container"
        @click="checkDead(creature)"
      />
    </div>
  </div>

  <div class="creature-cards-container">
    <div class="creature-cards-container-header">
      <h2>Mobs: ({{ aliveCreatures.length }})</h2>
      <slot />
    </div>
    <div
      v-for="creature, i in creatures"
      :key="i"
    >
      <MobCard
        :avatar="creature.avatar"
        :name="creature.name"
        :desc="creature.desc"
        :base-hp="creature.baseHp"
        :is-dead="creature.isDead"
      />
    </div>
  </div>
</template>

<script>
import MobCard from './MobCard.vue'
export default {
  name: 'MobCards',
  components: { MobCard },
  data () {
    return {
      creatures: [
        {
          avatar: 'https://pbs.twimg.com/media/FZLk1UmUsAAevh0.jpg:large',
          name: 'Lilium Mahoganea',
          desc: 'Owns a few samurai swords but never uses them. Can cook canned beans 2x per day',
          baseHp: 19
        },
        {
          avatar: 'https://cdna.artstation.com/p/assets/images/images/036/997/350/large/joie-arango-dark-elf-portrait.jpg?1619187643',
          name: 'Vilarri Lilise',
          desc: 'Went to community college. Lies about going to an Illuminated Study',
          baseHp: 10
        }
      ]
    }
  },
  computed: {
    aliveCreatures () {
      return this.creatures.filter((creature) => !creature.isDead)
    },
    deadCreatures () {
      return this.creatures.filter((creature) => creature.isDead)
    }
  },
  methods: {

  }
}
</script>

<style>
.creature-cards-container-header {
  flex-flow: row wrap;
  display: flex;
  place-content: space-between;
  grid-column: 1/-1;
}
.creature-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 450px));
  grid-template-rows: auto;
  place-content: start;
  gap: 2rem;
  padding: 3rem;
}
</style>
