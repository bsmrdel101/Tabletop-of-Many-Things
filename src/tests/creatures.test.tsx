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
});
