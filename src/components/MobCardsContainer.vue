<template>
  <!-- ALIVE -->
  <!--   <div v-show="aliveMobs.length > 0" class="mob-cards-container">

    <div v-for="mob in aliveMobs" :class="{ 'is-dead': mob.isDead }" class="mob-card"
      :key="mob.id">

      <div class="mob-edit-buttons-container">
        <button class="mob-edit-button">edit</button>
        <button class="mob-edit-button">duplicate</button>
      </div>

      <div class="mob-avatar-frame">
        <img :src="mob.avatar" alt="" class="mob-avatar" />
      </div>
      <h2 class="mob-name">{{ mob.name }}</h2>
      <p class="mob-desc">{{ mob.desc }}</p>

      <p class="mob-health" v-show="!mob.isDead">{{ mob.baseHp - mob.hpLost }}/{{ mob.baseHp }}
      </p>
      <p class="mob-health" v-show="mob.isDead">DEAD</p>

      <div @click="this.checkDead(mob)" class="mob-hp-buttons-container">
        <button class="mob-hp-button" @click="this.hurtCreature(mob, 1)" v-show="!mob.isDead">-1</button>
        <button class="mob-hp-button" @click="this.healCreature(mob, 1)" v-show="!mob.isDead">+1</button>
        <button class="mob-hp-button" @click="mob.hpLost = mob.baseHp" v-show="!mob.isDead">
          KILL
        </button>
      </div>
    </div>
  </div> -->

  <!-- DEAD -->
  <div
    v-show="deadMobs.length > 0"
    class="mob-cards-container"
  >
    <div class="mob-cards-container-header">
      <h2 style="grid-column: 1/-1">
        Dead ({{ deadMobs.length }})
      </h2>
      <button>revive all</button>
    </div>
    <div
      v-for="mob in deadMobs"
      :key="mob.id"
      :class="{ 'is-dead': mob.isDead }"
      class="mob-card"
    >
      <!-- details -->
      <div class="mob-avatar-frame">
        <img
          :src="mob.avatar"
          alt=""
          class="mob-avatar"
        >
      </div>
      <h2 class="mob-name">
        {{ mob.name }}
      </h2>
      <p class="mob-desc">
        {{ mob.desc }}
      </p>

      <!-- health -->
      <p
        v-show="!mob.isDead"
        class="mob-health"
      >
        {{ mob.baseHp - mob.hpLost }}/{{ mob.baseHp }}
      </p>
      <p
        v-show="mob.isDead"
        class="mob-health"
      >
        DEAD
      </p>

      <!-- toggles -->
      <div
        class="mob-hp-buttons-container"
        @click="checkDead(mob)"
      />
    </div>
  </div>

  <div class="mob-cards-container">
    <div class="mob-cards-container-header">
      <h2>Mobs: ({{ aliveMobs.length }})</h2>
      <slot />
    </div>
    <div
      v-for="mob, i in mobs"
      :key="i"
    >
      <MobCard
        :avatar="mob.avatar"
        :name="mob.name"
        :desc="mob.desc"
        :base-hp="mob.baseHp"
        :size="mob.size"
        :type="mob.type"
        :alignment="mob.alignment"
        :ability-scores="mob.abilityScores"
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
      mobs: [
        {
          avatar: 'https://pbs.twimg.com/media/FZLk1UmUsAAevh0.jpg:large',
          name: 'Lilium Mahoganea',
          desc: 'Owns a few samurai swords but never uses them. Can cook canned beans 2x per day',
          baseHp: 19,
          size: 'Huge',
          type: 'Dragon',
          alignment: 'Chaotic Evil',
          abilityScores: [
            { strength: 23 },
            { dexterity: 14 },
            { constitution: 21 },
            { intelligence: 14 },
            { wisdom: 13 },
            { charisma: 17 }
          ]
        },
        {
          avatar: 'https://cdna.artstation.com/p/assets/images/images/036/997/350/large/joie-arango-dark-elf-portrait.jpg?1619187643',
          name: 'Vilarri Lilise',
          desc: 'Went to community college. Lies about going to an Illuminated Study',
          baseHp: 10,
          size: 'Medium',
          type: 'Humanoid',
          alignment: 'Neutral Evil',
          abilityScores: [
            { strength: 23 },
            { dexterity: 14 },
            { constitution: 21 },
            { intelligence: 14 },
            { wisdom: 13 },
            { charisma: 17 }
          ]
        }
      ]
    }
  },
  computed: {
    aliveMobs () {
      return this.mobs.filter((mob) => !mob.isDead)
    },
    deadMobs () {
      return this.mobs.filter((mob) => mob.isDead)
    }
  },
  methods: {

  }
}
</script>

<style>
.mob-cards-container-header {
  flex-flow: row wrap;
  display: flex;
  place-content: space-between;
  grid-column: 1/-1;
}
.mob-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 450px));
  grid-template-rows: auto;
  place-content: start;
  gap: 2rem;
  padding: 3rem;
}
</style>
