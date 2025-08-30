type Class_5e = {
  id: number
  gameId: number | null
  name: string
  lvl: number
  hitDice: number
  proficiencies: Prof_Dnd[]
  profChoices: ProfChoice_Dnd[]
  saves: Skill_Dnd[]
  startingItems: Item_Dnd[]
  startingItemChoices: Item_Dnd[]
  levels: Level_Dnd[]
  multiClassing: any[]
  subclasses: Subclass_Dnd[]
  features: NameDesc[]
};

type PlayerClass_5e = {
  id: number
  name: string
  lvl: number
  hitDice: number
  subclass: Subclass_Dnd | null
};

type Subclass_5e = {
  id: number
  name: string
  subclassFlavor: string | null
  desc: string | null
  levels: Level_Dnd[]
  spells: Spell_Dnd[]
  class: { id: number, name: string }
  features: NameDesc[]
};

type PlayerSubclass_5e = {
  id: number
  name: string
};

type Background_5e = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  proficiencies: string | null
  languages: string[]
  equipment: Item_Dnd[]
  features: NameDesc[]
  personalityTraits: string | null
  ideals: string | null
  bonds: string | null
  flaws: string | null
};

type PlayerBackground_5e = {
  id: number
  name: string
};

type Feat_5e = {
  id: number
  name: string
  desc: string
  prerequisites: Prerequisites_Dnd | null
  abilityIncrease: { abilityScore: AbilityScore_Dnd, amount: number } | null
  features: Feature_Dnd[]
  actions: Action_Dnd[]
};

type Spellcasting_5e = {
  ability: string
  dc: number
  mod: number
  class: string
  slots: SpellSlots_Dnd
  pactSlots: PactSlots_Dnd
  spells: Spell_Dnd[]
};
