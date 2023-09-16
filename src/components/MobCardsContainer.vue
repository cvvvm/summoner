<template>
  <div
    v-for="mob in mobs"
    :key="mob.index"
    class="cards-container"
  >
    <div
      class="card-hold"
    >
      <!-- HP -->
      <div>
        <h3>health</h3>
        <h4>HP: {{ mob.hit_points }}</h4>
        <p>hit dice: {{ mob.hit_dice }}</p>
        <p>HP roll: {{ mob.hit_points_roll }}</p>
      </div>

      <!-- SPEED -->
      <div>
        <h3>speed</h3>
        <div
          v-for="(speedVal, speedType, index) in mob.speed"
          :key="index"
        >
          <p>{{ speedType }}: {{ speedVal }}</p>
        </div>
      </div>

      <!-- SENSES -->
      <div>
        <h3>senses</h3>
        <div
          v-for="(senseVal, senseKey) in mob.senses"
          :key="senseVal"
        >
          <p>{{ senseKey.replace('_', ' ') }}: {{ senseVal }}</p>
        </div>
      </div>

      <!-- LANGUAGES -->
      <div>
        <h3>languages</h3>
        <p>{{ mob.languages.toLowerCase() }}</p>
      </div>

      <!-- ACTIONS -->
      <div style="grid-column: span 3; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-xxl);">
        <h3 style="grid-column: span 3;">
          actions
        </h3>
        <div
          v-for="action in mob.actions"
          :key="action"
        >
          <h4>{{ action.name.toLowerCase() }}</h4>
          <p>{{ action.desc.toLowerCase() }}</p>

          <!-- subactions -->
          <div v-if="action.actions.length > 0">
            <div
              v-for="(subaction, index) in action.actions"
              :key="index"
            >
              <h5>{{ subaction.action_name.toLowerCase() }}: {{ subaction.count }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobCard
      :name="mob.name.toLowerCase()"
      :alignment="mob.alignment"
      :size="mob.size.toLowerCase()"
      :type="mob.type"
      :ability-scores="[
        {strength: mob.strength},
        {dext: mob.dexterity},
        {cons: mob.constitution},
        {cons: mob.intelligence},
        {cons: mob.wisdom},
        {cons: mob.charisma},
      ]"
      :base-hp="mob.hit_points"
      :armor-class="mob.armor_class"
      :challenge-rating="mob.challenge_rating"
      :xp-gained="mob.xp"
      :damage-vulnerabilities="mob.damage_vulnerabilities"
      :damage-resistances="mob.damage_resistances"
      :damage-immunities="mob.damage_immunities"
      :condition-immunities="mob.condition_immunities"
      :special-abilities="mob.special_abilities"
    />
  </div>
</template>

<script setup>
import MobCard from './MobCard.vue'
const mobs = [{
  index: 'goblin',
  name: 'Goblin',
  size: 'Small',
  type: 'humanoid',
  subtype: 'goblinoid',
  alignment: 'neutral evil',
  armor_class:
  {
    type: 'armor',
    value: 15,
    armor: [
      {
        index: 'leather-armor',
        name: 'Leather Armor',
        url: '/api/equipment/leather-armor'
      },
      {
        index: 'shield',
        name: 'Shield',
        url: '/api/equipment/shield'
      }
    ]
  },
  hit_points: 7,
  hit_dice: '2d6',
  hit_points_roll: '2d6',
  speed: {
    walk: '30 ft.',
    swim: '10 ft.'
  },
  strength: 8,
  dexterity: 14,
  constitution: 10,
  intelligence: 10,
  wisdom: 8,
  charisma: 8,
  proficiencies: [
    {
      value: 6,
      proficiency: {
        index: 'skill-stealth',
        name: 'Skill: Stealth',
        url: '/api/proficiencies/skill-stealth'
      }
    }
  ],
  damage_vulnerabilities: [],
  damage_resistances: [],
  damage_immunities: [],
  condition_immunities: [],
  senses: {
    darkvision: '60 ft.',
    passive_perception: 9
  },
  languages: 'Common, Goblin',
  challenge_rating: 0.25,
  xp: 50,
  special_abilities: [
    {
      name: 'Nimble Escape',
      desc: 'The goblin can take the Disengage or Hide action as a bonus action on each of its turns.'
    }
  ],
  actions: [
    {
      name: 'Scimitar',
      desc: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.',
      attack_bonus: 4,
      damage: [
        {
          damage_type: {
            index: 'slashing',
            name: 'Slashing',
            url: '/api/damage-types/slashing'
          },
          damage_dice: '1d6+2'
        }
      ],
      actions: []
    },
    {
      name: 'Shortbow',
      desc: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.',
      attack_bonus: 4,
      damage: [
        {
          damage_type: {
            index: 'piercing',
            name: 'Piercing',
            url: '/api/damage-types/piercing'
          },
          damage_dice: '1d6+2'
        }
      ],
      actions: []
    }
  ],
  image: '/api/images/monsters/mob.png',
  url: '/api/monsters/goblin',
  legendary_actions: []
}, /*  */
/* dragon */
/*  */ {
  index: 'adult-black-dragon',
  name: 'Adult Black Dragon',
  size: 'Huge',
  type: 'dragon',
  alignment: 'chaotic evil',
  armor_class: [
    {
      type: 'natural',
      value: 19
    }
  ],
  hit_points: 195,
  hit_dice: '17d12',
  hit_points_roll: '17d12+85',
  speed: {
    walk: '40 ft.',
    fly: '80 ft.',
    swim: '40 ft.'
  },
  strength: 23,
  dexterity: 14,
  constitution: 21,
  intelligence: 14,
  wisdom: 13,
  charisma: 17,
  proficiencies: [
    {
      value: 7,
      proficiency: {
        index: 'saving-throw-dex',
        name: 'Saving Throw: DEX',
        url: '/api/proficiencies/saving-throw-dex'
      }
    },
    {
      value: 10,
      proficiency: {
        index: 'saving-throw-con',
        name: 'Saving Throw: CON',
        url: '/api/proficiencies/saving-throw-con'
      }
    },
    {
      value: 6,
      proficiency: {
        index: 'saving-throw-wis',
        name: 'Saving Throw: WIS',
        url: '/api/proficiencies/saving-throw-wis'
      }
    },
    {
      value: 8,
      proficiency: {
        index: 'saving-throw-cha',
        name: 'Saving Throw: CHA',
        url: '/api/proficiencies/saving-throw-cha'
      }
    },
    {
      value: 11,
      proficiency: {
        index: 'skill-perception',
        name: 'Skill: Perception',
        url: '/api/proficiencies/skill-perception'
      }
    },
    {
      value: 7,
      proficiency: {
        index: 'skill-stealth',
        name: 'Skill: Stealth',
        url: '/api/proficiencies/skill-stealth'
      }
    }
  ],
  damage_vulnerabilities: ['psychic', 'holy'],
  damage_resistances: ['fire', 'ice'],
  damage_immunities: ['acid', 'fire'],
  condition_immunities: ['stun', 'exhaustion'],
  senses: {
    blindsight: '60 ft.',
    darkvision: '120 ft.',
    passive_perception: 21
  },
  languages: 'Common, Draconic',
  challenge_rating: 14,
  xp: 11500,
  special_abilities: [
    {
      name: 'Amphibious',
      desc: 'The dragon can breathe air and water.'
    },
    {
      name: 'Legendary Resistance',
      desc: 'If the dragon fails a saving throw, it can choose to succeed instead.',
      usage: {
        type: 'per day',
        times: 3,
        rest_types: []
      }
    }
  ],
  actions: [
    {
      name: 'Multiattack',
      multiattack_type: 'actions',
      desc: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
      actions: [
        {
          action_name: 'Frightful Presence',
          count: 1,
          type: 'ability'
        },
        {
          action_name: 'Bite',
          count: 1,
          type: 'melee'
        },
        {
          action_name: 'Claw',
          count: 2,
          type: 'melee'
        }
      ]
    },
    {
      name: 'Bite',
      desc: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.',
      attack_bonus: 11,
      damage: [
        {
          damage_type: {
            index: 'piercing',
            name: 'Piercing',
            url: '/api/damage-types/piercing'
          },
          damage_dice: '2d10+6'
        },
        {
          damage_type: {
            index: 'acid',
            name: 'Acid',
            url: '/api/damage-types/acid'
          },
          damage_dice: '1d8'
        }
      ],
      actions: []
    },
    {
      name: 'Claw',
      desc: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.',
      attack_bonus: 11,
      damage: [
        {
          damage_type: {
            index: 'slashing',
            name: 'Slashing',
            url: '/api/damage-types/slashing'
          },
          damage_dice: '2d6+6'
        }
      ],
      actions: []
    },
    {
      name: 'Tail',
      desc: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.',
      attack_bonus: 11,
      damage: [
        {
          damage_type: {
            index: 'bludgeoning',
            name: 'Bludgeoning',
            url: '/api/damage-types/bludgeoning'
          },
          damage_dice: '2d8+6'
        }
      ],
      actions: []
    },
    {
      name: 'Frightful Presence',
      desc: 'Each creature of the dragon\'s choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature\'s saving throw is successful or the effect ends for it, the creature is immune to the dragon\'s Frightful Presence for the next 24 hours.',
      dc: {
        dc_type: {
          index: 'wis',
          name: 'WIS',
          url: '/api/ability-scores/wis'
        },
        dc_value: 16,
        success_type: 'none'
      },
      actions: []
    },
    {
      name: 'Acid Breath',
      desc: 'The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.',
      usage: {
        type: 'recharge on roll',
        dice: '1d6',
        min_value: 5
      },
      dc: {
        dc_type: {
          index: 'dex',
          name: 'DEX',
          url: '/api/ability-scores/dex'
        },
        dc_value: 18,
        success_type: 'half'
      },
      damage: [
        {
          damage_type: {
            index: 'acid',
            name: 'Acid',
            url: '/api/damage-types/acid'
          },
          damage_dice: '12d8'
        }
      ],
      actions: []
    }
  ],
  legendary_actions: [
    {
      name: 'Detect',
      desc: 'The dragon makes a Wisdom (Perception) check.'
    },
    {
      name: 'Tail Attack',
      desc: 'The dragon makes a tail attack.'
    },
    {
      name: 'Wing Attack (Costs 2 Actions)',
      desc: 'The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.',
      dc: {
        dc_type: {
          index: 'dex',
          name: 'DEX',
          url: '/api/ability-scores/dex'
        },
        dc_value: 19,
        success_type: 'none'
      },
      damage: [
        {
          damage_type: {
            index: 'bludgeoning',
            name: 'Bludgeoning',
            url: '/api/damage-types/bludgeoning'
          },
          damage_dice: '2d6+6'
        }
      ]
    }
  ],

  image: '/api/images/monsters/adult-black-dragon.png',
  url: '/api/monsters/adult-black-dragon'
}]

/* const props = defineProps({
  }) */

</script>

  <style>
    h3 {
    color: blue;
    margin-bottom: .25rem !important;
    }
    .card-hold {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: var(--space-md);
    padding: var(--space-md);
    border: 1px solid black;
    border-radius: var(--space-xl);
    }
    .card-hold > div {
    padding: var(--space-lg);
    border: 1px solid lightgray;
    border-radius: var(--space-md);
    }
    .cards-container-header {
    flex-flow: row wrap;
    display: flex;
    place-content: space-between;
    grid-column: 1/-1;
    }
    .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    grid-template-rows: auto;
    place-content: start;
    gap: var(--space-xxxl);
    padding: var(--space-xxxl);
    }
  </style>
