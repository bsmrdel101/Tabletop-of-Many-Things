interface CharacterCreationProcess_5e {
  focusedClass: Class_5e | null
  itemPage: 'gear' | 'gold' | null
  selectedChoices: Dispatch<SetStateAction<Record<number, number>>>
}

type CharacterDraft_5e = {
  img: string
  name: string
  ruleset: Ruleset | null
  lvl: number
  xp: number
  maxHp: number
  abilityScores: AbilityScore_Dnd[]
  race: Race_Dnd | null
  subrace: PlayerSubrace_Dnd | null
  classes: PlayerClass_5e[]
  background: PlayerBackground_5e | null
  feats: Feat_5e[]
  traits: Trait_Dnd[]
  features: Feature_Dnd[]
  currentHitDice: Dice_Dnd[]
  speeds: Speed_Dnd[]
  senses: NameValue[]
  proficiencies: ProfDraft_Dnd
  skills: ProfSelectionDraft_Dnd[]
  items: ItemSelection_Dnd[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost_Dnd[]
  spellcasting: Spellcasting_5e | null
};

type ProfSelectionDraft_Dnd = {
  name: string
  source: string
};

type ProfDraft_Dnd = {
  weapons: ProfSelectionDraft_Dnd[]
  armor: ProfSelectionDraft_Dnd[]
  tools: ProfSelectionDraft_Dnd[]
  instruments: ProfSelectionDraft_Dnd[]
  vehicles: ProfSelectionDraft_Dnd[]
};

type ItemSelection_Dnd = {
  qty: number
  data: { name: string, description: string }
};

type ItemChoices_Dnd = {
  description: string
  amount: number
  options: ItemSelection_Dnd[]
};

type Class_5e = {
  id: number
  name: string
  description: string | null
  source: Source
  hitDice: number
  proficiencies: Prof_Dnd
  profChoices: ProfChoice_Dnd[]
  saves: string[]
  startingItems: ItemSelection_Dnd[]
  startingItemChoices: ItemChoices_Dnd[]
  levels: Level_Dnd[]
  multiClassing: MultiClassing_Dnd
  subclasses: Subclass_5e[]
  features: Feature_Dnd[]
};

type PlayerClass_5e = {
  id: number
  classId: number
  name: string
  lvl: number
  hitDice: number
  subclass: Subclass_5e | null
};

type Subclass_5e = {
  id: number
  name: string
  source: Source
  subclassFlavor: string | null
  description: string | null
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
  name: string
  source: Source
  description: string | null
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
  source: Source
  description: string | null
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
