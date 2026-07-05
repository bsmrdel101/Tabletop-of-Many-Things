type Class_2024 = {
  id: number
  playerClassId: number
  gameId: number | null
  name: string
  lvl: number
  hitDice: number
  proficiencies: Prof_dnd[]
  profChoices: ProfChoice_dnd[]
  saves: Skill_dnd[]
  startingItems: Item_dnd[]
  startingItemChoices: Item_dnd[]
  levels: Level_dnd[]
  multiClassing: any[]
  subclasses: Subclass_2024[]
  features: NameDesc[]
};

type PlayerClass_2024 = {
  id: number
  classId: number
  name: string
  lvl: number
  hitDice: number
  subclass: Subclass_2024 | null
};

type Subclass_2024 = {
  id: number
  name: string
  subclassFlavor: string | null
  desc: string | null
  levels: Level_dnd[]
  spells: Spell_dnd[]
  class: { id: number, name: string }
  features: NameDesc[]
};

type PlayerSubclass_2024 = {
  id: number
  name: string
};

type Background_2024 = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  proficiencies: string | null
  languages: string[]
  equipment: Item_dnd[]
  features: NameDesc[]
  personalityTraits: string | null
  ideals: string | null
  bonds: string | null
  flaws: string | null
};

type PlayerBackground_2024 = {
  id: number
  name: string
};

type Feat_dnd = {
  id: number
  name: string
  desc: string
  prerequisites: Prerequisites_dnd | null
  abilityIncrease: { abilityScore: AbilityScore_dnd, amount: number } | null
  features: Feature_dnd[]
  actions: Action_dnd[]
};

type Spellcasting_2024 = {
  ability: string
  dc: number
  mod: number
  class: string
  slots: SpellSlots_dnd
  pactSlots: PactSlots_dnd
  spells: Spell_dnd[]
};
