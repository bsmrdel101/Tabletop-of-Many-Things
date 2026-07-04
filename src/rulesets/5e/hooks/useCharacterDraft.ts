import { useState } from "react";


const createEmptyCharacter = (): CharacterDraft_5e => ({
  img: '/images/defaults/character.png',
  name: 'Unnamed Character',
  ruleset: null,
  lvl: 1,
  xp: 0,
  maxHp: 0,
  abilityScores: [
    { name: 'Strength', value: 10, mod: 0, prof: false } as AbilityScore_Dnd,
    { name: 'Dexterity', value: 10, mod: 0, prof: false } as AbilityScore_Dnd,
    { name: 'Constitution', value: 10, mod: 0, prof: false } as AbilityScore_Dnd,
    { name: 'Intelligence', value: 10, mod: 0, prof: false } as AbilityScore_Dnd,
    { name: 'Wisdom', value: 10, mod: 0, prof: false } as AbilityScore_Dnd,
    { name: 'Charisma', value: 10, mod: 0, prof: false } as AbilityScore_Dnd
  ],
  race: null,
  subrace: null,
  classes: [],
  background: null,
  feats: [],
  traits: [],
  features: [],
  currentHitDice: [],
  speeds: [],
  senses: [],
  proficiencies: {
    weapons: [],
    armor: [],
    tools: [],
    instruments: [],
    vehicles: []
  },
  skills: [],
  resistances: [],
  vulnerabilities: [],
  condImmunities: [],
  dmgImmunities: [],
  languages: [],
  currency: [],
  spellcasting: null
});

export function useCharacterDraft() {
  const [character, setCharacter] = useState<CharacterDraft_5e>(createEmptyCharacter());

  const updateCharacter = (updates: Partial<CharacterDraft_5e>) => {
    setCharacter((prev) => ({ ...prev, ...updates }));
  };


  return {
    character,
    updateCharacter,
    resetCharacter: () => setCharacter(createEmptyCharacter())
  };
}
