interface CharacterCreationProcess_5e {
  focusedClass: Class_5e | null
  itemPage: 'gear' | 'gold' | null
  selectedChoices: Dispatch<SetStateAction<Record<number, SelectedItemChoice_dnd>>>
}

type CharacterDraft_5e = {
  img: string
  name: string
  ruleset: Ruleset | null
  lvl: number
  xp: number
  maxHp: number
  abilityScores: AbilityScore_dnd[]
  race: Race_dnd | null
  subrace: PlayerSubrace_dnd | null
  classes: PlayerClass_5e[]
  background: PlayerBackground_5e | null
  feats: Feat_5e[]
  traits: Trait_dnd[]
  features: Feature_dnd[]
  currentHitDice: Dice_dnd[]
  speeds: Speed_dnd[]
  senses: NameValue[]
  proficiencies: ProfDraft_dnd
  skills: ProfSelectionDraft_dnd[]
  items: ItemSelection_dnd[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost_dnd[]
  spellcasting: Spellcasting_5e | null
};

type Class_5e = {
  id: number
  name: string
  description: string | null
  source: Source
  hitDice: number
  proficiencies: Prof_dnd
  profChoices: ProfChoice_dnd[]
  saves: string[]
  startingItems: ItemSelection_dnd[]
  startingItemChoices: ItemChoices_dnd[]
  levels: Level_dnd[]
  multiClassing: MultiClassing_dnd
  subclasses: Subclass_5e[]
  features: Feature_dnd[]
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
  levels: Level_dnd[]
  spells: Spell_dnd[]
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
  equipment: Item_5e[]
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
  prerequisites: Prerequisites_dnd | null
  abilityIncrease: { abilityScore: AbilityScore_dnd, amount: number } | null
  features: Feature_dnd[]
  actions: Action_dnd[]
};

type Item_5e = {
  id: number
  name: string
  source: Source
  description: string | null
  type: EquipmentCategory_dnd
  rarity: Rarity_dnd
  cost: Cost_dnd | null
  lbs: number
  properties: string[]
  armor: {
    armorType: ArmorType_dnd | null
    stealthDisadvantage: boolean
    strMinimum: number | null
    ac: { base: number, dexBonus: boolean, maxBonus: number } | null
  } | null
  weapon: {
    weaponType: WeaponType_dnd | null
    weaponRange: 'Melee' | 'Ranged' | null
    dmg: Damage_dnd | null
    twoHandedDmg: Damage_dnd | null
    range: Range_dnd | null
  } | null
};

type Spellcasting_5e = {
  ability: string
  dc: number
  mod: number
  class: string
  slots: SpellSlots_dnd
  pactSlots: PactSlots_dnd
  spells: Spell_dnd[]
};
