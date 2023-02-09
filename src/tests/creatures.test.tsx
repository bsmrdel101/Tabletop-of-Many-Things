import { convertApiCreature, Creature } from "../scripts/creatureDataStructure";
import { sortDuplicateArrayItems, sortDuplicateArrayItemsInObjects } from "../scripts/tools/utils";


const doughElemental: any = {
  id: 1,
  name: 'Dough Elemental',
  size: 'Medium',
  type: 'elemental',
  alignment: 'NG',
  ac: 12,
  hit_points: 40,
  hit_dice: '12d8',
  str: 14,
  dex: 15,
  con: 10,
  int: 12,
  wis: 11,
  char: 13,
  cr: 4,
  xp: 30,
  languages: ['Auran', 'Auran'],
  speeds: [{ name: 'walk', value: 30 }, { name: 'walk', value: 30 }],
  skills: [{ name: 'Athletics', value: 4 }, { name: 'Athletics', value: 4 }],
  vulnerabilities: ['fire', 'fire'],
  resistances: ['bludgeoning', 'bludgeoning'],
  damageImmunities: ['poison', 'poison'],
  conditionImmunities: ['stunned', 'stunned'],
  senses: [{ name: 'Darkvision', value: 60 }],
  abilities: [{ name: 'Regeneration', desc: 'The dough elemental regenerates 10 hp at the start of its turn' }],
  actions: [
    { name: 'Slam', desc: 'Make a slam attack.' },
    { name: 'Multiattack', desc: 'Can make 2 slam attacks.' }
  ],
  legActions: [{ name: 'Detect', desc: 'Make a perception check.' }],
};

const acolyte: any = {
  id: 1,
  name: 'Acolyte',
  size: 'Medium',
  type: 'humanoid',
  alignment: 'LG',
  armor_class: [{ type: 'leather armor', value: 12 }],
  hit_points: 40,
  hit_dice: '12d8',
  strength: 14,
  dexterity: 15,
  constitution: 10,
  intelligence: 12,
  wisdom: 11,
  charisma: 13,
  challenge_rating: 4,
  xp: 30,
  languages: 'Common',
  speed: { walk: '30 ft.' },
  proficiencies: [],
  damage_vulnerabilities: [],
  damage_resistances: [],
  damage_immunities: [],
  condition_immunities: [],
  senses: [],
  special_abilities: [
    {
      name: 'Spellcasting',
      desc: 'The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (3 slots): bless, cure wounds, sanctuary',
      spellcasting: {
        level: 1,
        ability: { index: 'wis' },
        dc: 12,
        modifier: 4,
        components_required: ['V', 'S', 'M'],
        school: 'cleric',
        slots: { 1: 3 },
        spells: [
          {
            name: 'Light',
            level: 0,
            url: '/api/spells/light'
          },
          {
            name: 'Sacred Flame',
            level: 0,
            url: '/api/spells/sacred-flame'
          },
          {
            name: 'Cure Wounds',
            level: 1,
            url: '/api/spells/cure-wounds'
          }
        ]
      }
    }
  ],
  actions: [],
  legendary_actions: []
};

const convertedAcolyte: any = {
  id: 1,
  name: 'Acolyte',
  size: 'Medium',
  type: 'humanoid',
  alignment: 'LG',
  ac: 12,
  maxHp: 40,
  hitDice: '12d8',
  abilityScores: [
    { name: 'str', value: 14, mod: 2 },
    { name: 'dex', value: 15, mod: 2 },
    { name: 'con', value: 10, mod: 0 },
    { name: 'int', value: 12, mod: 1 },
    { name: 'wis', value: 11, mod: 0 },
    { name: 'char', value: 13, mod: 1 },
  ],
  cr: 4,
  xp: 30,
  languages: ['Common'],
  speeds: [{ name: 'walk', value: 30 }],
  proficiencies: [],
  vulnerabilities: [],
  resistances: [],
  damageImmunities: [],
  conditionImmunities: [],
  senses: [],
  abilities: [
    {
      name: 'Spellcasting',
      desc: 'The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (3 slots): bless, cure wounds, sanctuary',
      spellcasting: {
        level: 1,
        ability: 'wis',
        dc: 12,
        modifier: 4,
        components: ['V', 'S', 'M'],
        class: 'cleric',
        slots: { 1: 3, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
        spells: [
          {
            name: 'Light',
            level: 0,
            url: '/api/spells/light'
          },
          {
            name: 'Sacred Flame',
            level: 0,
            url: '/api/spells/sacred-flame'
          },
          {
            name: 'Cure Wounds',
            level: 1,
            url: '/api/spells/cure-wounds'
          }
          // {
          //   name: 'Light',
          //   desc: 'You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.\nIf you target an object held or worn by a hostile creature, that creature must succeed on a dexterity saving throw to avoid the spell.',
          //   level: 0,
          //   range: 'Touch',
          //   components: ['V', 'M'],
          //   ritual: false,
          //   duration: '1 hour',
          //   concentration: false,
          //   castingTime: '1 action',
          //   school: 'evocation',
          //   classes: ['Bard', 'Cleric', 'Sorcerer', 'Wizard'],
          //   subclasses: ['Lore']
          // },
          // {
          //   name: 'Sacred Flame',
          //   desc: 'Flame-like radiance descends on a creature that you can see within range. The target must succeed on a dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.\nThe spell\'s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).',
          //   level: 0,
          //   range: '60 feet',
          //   components: ['V', 'S'],
          //   ritual: false,
          //   duration: 'Instantaneous',
          //   concentration: false,
          //   castingTime: '1 action',
          //   damage: {
          //     type: 'radiant',
          //     damageAtCharacterLevel: {
          //       1: '1d8',
          //       5: '2d8',
          //       11: '3d8',
          //       17: '4d8'
          //     }
          //   },
          //   dc: {
          //     type: 'dex',
          //     successType: 'none'
          //   },
          //   school: 'evocation',
          //   classes: ['Cleric'],
          //   subclasses: ['Lore']
          // },
          // {
          //   name: 'Cure Wounds',
          //   desc: 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.',
          //   higherLevel: 'When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.',
          //   level: 1,
          //   range: 'Touch',
          //   components: ['V', 'S'],
          //   ritual: false,
          //   duration: 'Instantaneous',
          //   concentration: false,
          //   castingTime: '1 action',
          //   healAtSlotLevel: {
          //     1: '1d8 + MOD',
          //     2: '2d8 + MOD',
          //     3: '3d8 + MOD',
          //     4: '4d8 + MOD',
          //     5: '5d8 + MOD',
          //     6: '6d8 + MOD',
          //     7: '7d8 + MOD',
          //     8: '8d8 + MOD',
          //     9: '9d8 + MOD'              
          //   },
          //   school: 'evocation',
          //   classes: ['Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger'],
          //   subclasses: ['Lore', 'Life']
          // },
        ]
      }
    }
  ],
  actions: [],
  legActions: []
};

const aboleth: any = {
  image: "/api/images/monsters/aboleth.png",
  index: "aboleth",
  name: "Aboleth",
  proficiencies: [
    { proficiency: {index: 'skill-perception', name: 'Skill: Perception', url: '/api/proficiencies/skill-perception'}, value: 10 }
  ],
  senses: { darkvision: '120 ft.', passive_perception: 20 },
  size: "Large",
  alignment: "lawful evil",
  armor_class: [{ type: 'natural', value: 17 }],
  challenge_rating: 10,
  charisma: 18,
  condition_immunities: [],
  constitution: 15,
  damage_immunities: [],
  damage_resistances: [],
  damage_vulnerabilities: [],
  dexterity: 9,
  hit_dice: "18d10",
  hit_points: 135,
  hit_points_roll: "18d10+36",
  intelligence: 18,
  languages: "Deep Speech, telepathy 120 ft.",
  legendary_actions: [
    { name: 'Detect', desc: 'The aboleth makes a Wisdom (Perception) check.' }
  ],
  actions: [
    {
      attack_bonus: 9,
      damage: [
        { damage_type: {index: "bludgeoning", name: "Bludgeoning", url: "/api/damage-types/bludgeoning"}, damage_dice: '2d6+5' },
        { damage_type: {index: "acid", name: "Acid", url: "/api/damage-types/acid"}, damage_dice: '1d12' }
      ],
      dc: {
        dc_type: {index: "con", name: "CON", url: "/api/ability-scores/con"},
        dc_value: 14,
        success_type: 'none'
      },
      name: "Tentacle",
      desc: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed."
    },
    {
      attack_bonus: 9,
      damage: [
        { damage_type: {index: "bludgeoning", name: "Bludgeoning", url: "/api/damage-types/bludgeoning"}, damage_dice: '3d6+5' },
      ],
      name: "Tail",
      desc: "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage."
    },
    {
      attack_bonus: 9,
      damage: [
        { damage_type: {index: "bludgeoning", name: "Bludgeoning", url: "/api/damage-types/bludgeoning"}, damage_dice: '2d6+5' },
        { damage_type: {index: "acid", name: "Acid", url: "/api/damage-types/acid"}, damage_dice: '1d12' }
      ],
      dc: {
        dc_type: {index: "wis", name: "WIS", url: "/api/ability-scores/wis"},
        dc_value: 14,
        success_type: 'none'
      },
      usage: { type: 'per day', times: 3 },
      name: "Enslave",
      desc: "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance. Whenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth."
    },
  ],
  special_abilities: [
    { name: 'Amphibious', desc: 'The aboleth can breathe air and water.' },
    {
      name: 'Mucous Cloud',
      desc: 'While underwater, the aboleth is surrounded by tra…he diseased creature can breathe only underwater.',
      dc: {
        dc_type: {index: "con", name: "CON", url: "/api/ability-scores/con"},
        dc_value: 14,
        success_type: 'none'
      }
    },
    { name: 'Probing Telepathy', desc: 'If a creature communicates telepathically with the…test desires if the aboleth can see the creature.' }
  ],
  speed: { walk: '10 ft.', swim: '40 ft.' },
  strength: 21,
  type: "aberration",
  url: "/api/monsters/aboleth",
  wisdom: 15,
  xp: 5900
};

const convertedAboleth: any = {
  index: 'aboleth',
  name: 'Aboleth',
  size: 'Large',
  type: 'aberration',
  alignment: 'lawful evil',
  ac: 17,
  maxHp: 135,
  hitDice: '18d10',
  abilityScores: [
    { name: 'str', value: 21, mod: 5 },
    { name: 'dex', value: 9, mod: -1 },
    { name: 'con', value: 15, mod: 2 },
    { name: 'int', value: 18, mod: 4 },
    { name: 'wis', value: 15, mod: 2 },
    { name: 'char', value: 18, mod: 4 },
  ],
  cr: 10,
  xp: 5900,
  languages: ['Deep Speech', 'telepathy 120 ft'],
  speeds: [{ name: 'walk', value: 10 }, { name: 'swim', value: 40 }],
  proficiencies: [{ type: 'skill', name: 'Perception', value: 10 }],
  vulnerabilities: [],
  resistances: [],
  damageImmunities: [],
  conditionImmunities: [],
  senses: [{ name: 'Darkvision', value: 120 }, { name: 'Passive perception', value: 20 }],
  abilities: [
    { name: 'Amphibious', desc: 'The aboleth can breathe air and water.' },
    {
      name: 'Mucous Cloud',
      desc: 'While underwater, the aboleth is surrounded by tra…he diseased creature can breathe only underwater.',
      dc: {
        type: 'con',
        value: 14,
        successType: 'none'
      }
    },
    { name: 'Probing Telepathy', desc: 'If a creature communicates telepathically with the…test desires if the aboleth can see the creature.' }
  ],
  actions: [
    {
      attackBonus: 9,
      damage: [
        { type: 'bludgeoning', dice: { amount: 2, type: 6, mod: 5 } },
        { type: 'acid', dice: { amount: 1, type: 12, mod: 0 } }
      ],
      dc: {
        type: 'con',
        value: 14,
        successType: 'none'
      },
      name: "Tentacle",
      desc: "Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature's skin becomes translucent and slimy, the creature can't regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed."
    },
    {
      attackBonus: 9,
      damage: [
        { type: 'bludgeoning', dice: { amount: 3, type: 6, mod: 5 } },
      ],
      name: "Tail",
      desc: "Melee Weapon Attack: +9 to hit, reach 10 ft. one target. Hit: 15 (3d6 + 5) bludgeoning damage."
    },
    {
      attackBonus: 9,
      damage: [
        { type: 'bludgeoning', dice: { amount: 2, type: 6, mod: 5 } },
        { type: 'acid', dice: { amount: 1, type: 12, mod: 0 } }
      ],
      dc: {
        type: 'wis',
        value: 14,
        successType: 'none'
      },
      usage: { type: 'per day', times: 3 },
      name: "Enslave",
      desc: "The aboleth targets one creature it can see within 30 ft. of it. The target must succeed on a DC 14 Wisdom saving throw or be magically charmed by the aboleth until the aboleth dies or until it is on a different plane of existence from the target. The charmed target is under the aboleth's control and can't take reactions, and the aboleth and the target can communicate telepathically with each other over any distance. Whenever the charmed target takes damage, the target can repeat the saving throw. On a success, the effect ends. No more than once every 24 hours, the target can also repeat the saving throw when it is at least 1 mile away from the aboleth."
    },
  ],
  legActions: [{ name: 'Detect', desc: 'The aboleth makes a Wisdom (Perception) check.' }]
};


describe('CreatureDataStructure', () => {
  test('Duplicate creature data removed from primitive arrays', () => {
    expect(sortDuplicateArrayItems(doughElemental.languages)).toEqual(['Auran']);
    expect(sortDuplicateArrayItems(doughElemental.vulnerabilities)).toEqual(['fire']);
    expect(sortDuplicateArrayItems(doughElemental.resistances)).toEqual(['bludgeoning']);
    expect(sortDuplicateArrayItems(doughElemental.damageImmunities)).toEqual(['poison']);
    expect(sortDuplicateArrayItems(doughElemental.conditionImmunities)).toEqual(['stunned']);
  });

  test('Duplicate creature data removed from arrays of objects', () => {
    expect(sortDuplicateArrayItemsInObjects(doughElemental.speeds)).toEqual([{ name: 'walk', value: 30 }]);
    expect(sortDuplicateArrayItemsInObjects(doughElemental.senses)).toEqual([{ name: 'Darkvision', value: 60 }]);
  });

  const getConvertedStats = () => {
    const { index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = convertedAboleth;
    return new Creature(index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions);
  };

  test('API creature data is formatted correctly', () => {
    const { index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = convertApiCreature(aboleth);
    const creature = new Creature(index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions);
    const convertedCreature = getConvertedStats();
    expect(creature).toEqual(convertedCreature);
  });

  const getConvertedAcolyte = () => {
    const { index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = convertedAcolyte;
    return new Creature(index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions);
  };

  test('Spellcasting data can be parsed', () => {
    const { index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = convertApiCreature(acolyte);
    const creature = new Creature(index, name, size, type, alignment, ac, maxHp, hitDice, abilityScores, cr, xp, languages, speeds, skills, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions);
    const convertedCreature = getConvertedAcolyte();
    expect(creature).toEqual(convertedCreature);
  });
});
