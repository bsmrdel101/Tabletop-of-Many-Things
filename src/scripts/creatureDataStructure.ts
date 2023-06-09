import { getApiSpell } from "./controllers/spellsController";
import { capitalize } from "./tools/stringUtils";
import { convertACTypeFormat, convertDamageTypeFormat, convertDCTypeFormat, getAbilityScoreMod, removeNullValues } from "./tools/utils";
import { AbilityScore, NameDesc, NameValue, Prof, SpecialAbility, Spell, Spellcasting } from "./types";


export class Creature {
  index: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  ac: number;
  maxHp: number;
  hitDice: string;
  abilityScores: AbilityScore[];
  cr: number;
  xp: number;
  languages: string[];
  speeds: NameValue[];
  proficiencies: Prof[];
  vulnerabilities: string[];
  resistances: string[];
  damageImmunities: string[];
  conditionImmunities: string[];
  senses: NameValue[];
  abilities: SpecialAbility[];
  actions: NameDesc[];
  legActions: NameDesc[];

  constructor(index: string, name: string, size: string, type: string, alignment: string, ac: number, maxHp: number, hitDice: string, abilityScores: AbilityScore[], cr: number, xp: number, languages: string[], speeds: NameValue[], proficiencies: Prof[], vulnerabilities: string[], resistances: string[], damageImmunities: string[], conditionImmunities: string[], senses: NameValue[], abilities: SpecialAbility[], actions: NameDesc[], legActions: NameDesc[]) {
    this.index = index;
    this.name = name;
    this.size = size;
    this.type = type;
    this.alignment = alignment;
    this.ac = ac;
    this.maxHp = maxHp;
    this.hitDice = hitDice;
    this.abilityScores = abilityScores;
    this.cr = cr;
    this.xp = xp;
    this.languages = languages;
    this.speeds = speeds;
    this.proficiencies = proficiencies;
    this.vulnerabilities = vulnerabilities;
    this.resistances = resistances;
    this.damageImmunities = damageImmunities;
    this.conditionImmunities = conditionImmunities;
    this.senses = senses;
    this.abilities = abilities;
    this.actions = actions;
    this.legActions = legActions;
  }
}

// Takes creature API data and formats it into a custom data type
export const convertApiCreature = (creature: any) => {
  const { index, name, size, type, alignment, armor_class, hit_points, hit_dice, strength, dexterity, constitution, intelligence, wisdom, charisma, challenge_rating, xp, languages, speed, proficiencies, damage_vulnerabilities, damage_resistances, damage_immunities, condition_immunities, senses, special_abilities, actions, legendary_actions } = creature;  
  const convertedCreature: any = {
    index: index,
    name: name,
    size: size,
    type: type,
    alignment: alignment,
    ac: convertACTypeFormat(armor_class),
    maxHp: hit_points,
    hitDice: hit_dice,
    abilityScores: [
      { name: 'str', value: strength, mod: getAbilityScoreMod(strength) },
      { name: 'dex', value: dexterity, mod: getAbilityScoreMod(dexterity) },
      { name: 'con', value: constitution, mod: getAbilityScoreMod(constitution) },
      { name: 'int', value: intelligence, mod: getAbilityScoreMod(intelligence) },
      { name: 'wis', value: wisdom, mod: getAbilityScoreMod(wisdom) },
      { name: 'char', value: charisma, mod: getAbilityScoreMod(charisma) },
    ],
    cr: challenge_rating,
    xp: xp,
    languages: languages.split(', ').map((language: string) => language.replace('.', '')),
    speeds: getCreatureSpeeds(speed),
    proficiencies: getCreatureProf(proficiencies),
    vulnerabilities: damage_vulnerabilities,
    resistances: damage_resistances,
    damageImmunities: damage_immunities,
    conditionImmunities: condition_immunities.map((condition: any) => `${condition.index}`),
    senses: getCreatureSenses(senses),
    abilities: getCreatureAbilities(special_abilities),
    actions: getCreatureActions(actions),
    legActions: getCreatureActions(legendary_actions)
  };
  return convertedCreature;
};

const getCreatureSpeeds = (speed: string): NameValue[] => {
  return Object.keys(speed).map((key: any) => { 
    return { name: key, value: parseInt(speed[key].replace(' ft.', '')) };
  });
};

const getCreatureProf = (proficiencies: any): Prof[] => {
  return proficiencies.map((prof: any) => {
    const [ type, name ] = prof.proficiency.name.split(': ');
    return { type: type.toLowerCase(), name: name, value: prof.value };
  });
};

const getCreatureSenses = (senses: any): NameValue[] => {
  return Object.keys(senses).map((key: any) => {
    return { name: key !== 'passive_perception' ? capitalize(key) : 'Passive perception', value: parseInt(senses[key].toString().replace(' ft.', '')) };
  });
};

const getCreatureAbilities = (abilities: any) => {
  const convertedAbilities = abilities.map((ability: any) => {
    return { name: ability.name, desc: ability.desc, dc: ability.dc && convertDCTypeFormat(ability.dc), spellcasting: ability.spellcasting && getCreatureSpellcasting(ability.spellcasting) };
  });
  return removeNullValues(convertedAbilities);
};

const getCreatureActions = (actions: any) => {
  const convertedActions = actions.map((action: any) => {
    return { name: action.name, desc: action.desc.replace(' .', '.'), attackBonus: action.attack_bonus, dc: action.dc && convertDCTypeFormat(action.dc),  damage: action.damage && convertDamageTypeFormat(action.damage), usage: action.usage };
  });
  return removeNullValues(convertedActions);
};

const getCreatureSpellcasting = (spellcasting: any): Spellcasting => {
  return {
    level: spellcasting.level,
    ability: spellcasting.ability.index,
    dc: spellcasting.dc,
    modifier: spellcasting.modifier,
    components: spellcasting.components_required,
    class: spellcasting.school,
    slots: {
      1: spellcasting.slots['1'] ? spellcasting.slots['1'] : 0,
      2: spellcasting.slots['2'] ? spellcasting.slots['2'] : 0,
      3: spellcasting.slots['3'] ? spellcasting.slots['3'] : 0,
      4: spellcasting.slots['4'] ? spellcasting.slots['4'] : 0,
      5: spellcasting.slots['5'] ? spellcasting.slots['5'] : 0,
      6: spellcasting.slots['6'] ? spellcasting.slots['6'] : 0,
      7: spellcasting.slots['7'] ? spellcasting.slots['7'] : 0,
      8: spellcasting.slots['8'] ? spellcasting.slots['8'] : 0,
      9: spellcasting.slots['9'] ? spellcasting.slots['9'] : 0
    },
    spells: spellcasting.spells
  };
};
