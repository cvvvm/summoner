<template>
  <!-- ALIVE -->
  <div v-show="aliveCreatures.length > 0" class="creature-cards-container">
    <h2 style="grid-column: 1/-1">Alive ({{ aliveCreatures.length }})</h2>
    <div v-for="creature in aliveCreatures" :class="{ 'is-dead': creature.isDead }" class="creature-card"
      :key="creature.id">
      <!-- details -->
      <div class="creature-avatar-frame">
        <img :src="creature.avatar" alt="" class="creature-avatar" />
      </div>
      <h2 class="creature-name">{{ creature.name }}</h2>
      <p class="creature-desc">{{ creature.desc }}</p>

      <!-- health -->
      <p class="creature-health" v-show="!creature.isDead">{{ creature.totalHp - creature.hpLost }}/{{ creature.totalHp }}
      </p>
      <p class="creature-health" v-show="creature.isDead">DEAD</p>

      <!-- toggles -->
      <div @click="this.checkDead(creature)" class="creature-hp-buttons-container">
        <button class="creature-hp-button" @click="this.hurtCreature(creature, 1)" v-show="!creature.isDead">-1</button>
        <button class="creature-hp-button" @click="this.healCreature(creature, 1)" v-show="!creature.isDead">+1</button>
        <button class="creature-hp-button" @click="creature.hpLost = creature.totalHp" v-show="!creature.isDead">
          KILL
        </button>
      </div>
    </div>
  </div>

  <!-- DEAD -->
  <div v-show="deadCreatures.length > 0" class="creature-cards-container">
    <h2 style="grid-column: 1/-1">Dead ({{ deadCreatures.length }})</h2>
    <div v-for="creature in deadCreatures" :class="{ 'is-dead': creature.isDead }" class="creature-card"
      :key="creature.id">
      <!-- details -->
      <div class="creature-avatar-frame">
        <img :src="creature.avatar" alt="" class="creature-avatar" />
      </div>
      <h2 class="creature-name">{{ creature.name }}</h2>
      <p class="creature-desc">{{ creature.desc }}</p>

      <!-- health -->
      <p class="creature-health" v-show="!creature.isDead">{{ creature.totalHp - creature.hpLost }}/{{ creature.totalHp }}
      </p>
      <p class="creature-health" v-show="creature.isDead">DEAD</p>

      <!-- toggles -->
      <div @click="this.checkDead(creature)" class="creature-hp-buttons-container">
        <button class="creature-hp-button revive" @click="creature.hpLost = 0" v-show="creature.isDead">REVIVE</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      creatures: [
        {
          name: 'Lilium Mahoganea',
          desc: 'Owns a few samurai swords but never uses them. Can cook canned beans 2x per day',
          totalHp: 19,
          hpLost: 0,
          isDead: false,
          avatar: 'https://pbs.twimg.com/media/FZLk1UmUsAAevh0.jpg:large',
        },
        {
          name: 'Vilarri Lilise',
          desc: 'Went to community college. Lies about going to an Illuminated Study',
          totalHp: 10,
          hpLost: 0,
          isDead: false,
          avatar: 'https://cdna.artstation.com/p/assets/images/images/036/997/350/large/joie-arango-dark-elf-portrait.jpg?1619187643',
        },
      ],
    };
  },
  methods: {
    checkDead(creature) {
      if (creature.hpLost >= creature.totalHp) {
        creature.isDead = true;
        creature.hpLost = creature.totalHp;
      } else {
        creature.isDead = false;
      }
    },
    healCreature(creature, speed) {
      creature.hpLost = creature.hpLost - speed;
    },
    hurtCreature(creature, speed) {
      creature.hpLost = creature.hpLost + speed;
    },
  },
  computed: {
    aliveCreatures() {
      return this.creatures.filter((creature) => !creature.isDead);
    },
    deadCreatures() {
      return this.creatures.filter((creature) => creature.isDead);
    },
  },
}
</script>

<style>
.creature-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 450px));
  grid-template-rows: 1fr auto;
  place-content: start;
  gap: 2rem;
  padding: 3rem;
}

.creature-card {
  display: grid;
  gap: 1rem;
  grid-template-areas:
    'avatar name name'
    'avatar desc desc'
    'health desc desc'
    'hp-buttons hp-buttons hp-buttons';
  grid-template-columns: 150px 1fr 1fr;
  grid-template-rows: .75fr 1fr .5fr .5fr;
  padding: 1rem;
  background: lightgreen;
  border: 2px solid green;
}

.creature-card>* {
  margin: 0;
}

.creature-avatar-frame {
  aspect-ratio: 1/1;
  overflow: hidden;
  grid-area: avatar;
  object-fit: cover;
  object-position: center;
}

.creature-avatar {
  width: 100%;
}

.creature-name {
  grid-area: name;
  place-self: end start;
}

.creature-desc {
  grid-area: desc;
}

.creature-health {
  grid-area: health;
  place-self: center;
  font-size: 1.5rem;
  font-weight: 500;
}

.creature-hp-buttons-container {
  grid-area: hp-buttons;
  display: grid;
  grid-template-columns: 75px 75px 2fr;
  justify-content: space-evenly;
}

.creature-hp-button {
  border: 1px solid green;
  padding: .5rem 1rem;
  margin: 0px 4px;
}

.creature-hp-button.revive {
  grid-column: 1/-1;
}

.is-dead {

  background: red;
  border: 1px solid red;
}
</style>