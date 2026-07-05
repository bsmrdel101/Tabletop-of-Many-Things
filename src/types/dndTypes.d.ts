type ProfSelectionDraft_dnd = {
  name: string
  source: string
};

type ProfDraft_dnd = {
  weapons: ProfSelectionDraft_dnd[]
  armor: ProfSelectionDraft_dnd[]
  tools: ProfSelectionDraft_dnd[]
  instruments: ProfSelectionDraft_dnd[]
  vehicles: ProfSelectionDraft_dnd[]
};

type ItemSelection_dnd = {
  itemId: number
  qty: number
  data: { name: string, description: string }
};

type ItemChoices_dnd = {
  description: string
  amount: number
  options: (ItemSelection_dnd | ItemChoices_dnd)[][]
};

interface SelectedItemChoice_dnd {
  index: number
  items: ItemSelection_dnd[]
  customItems?: Record<number, ItemSelection_dnd[]>
}

type WeaponType_dnd = 'Simple' | 'Martial' | 'Firearm';

type Dice_dnd = {
  amount: number
  type: number
  mod: number
  display: string
};

type DieResult_dnd = {
  type: number
  rolled: number
};

type DiceGroupResult_dnd = {
  dice: Dice_dnd
  rolls: DieResult_dnd[]
  mod: number
  rolled: number
  total: number
};

type RollResult_dnd = {
  total: number
  rolled: number
  diceGroups: DiceGroupResult_dnd[]
};

type DCRollResult_dnd = {
  roll: number
  target: number
  success: boolean
};

type Prerequisites_dnd = {
  abilityScore?: AbilityScore_dnd
  lvl?: number
  classLvl?: { class: Class_5e | Class_2024, lvl: number }
  minValue?: number
};

type Token_dnd = {
  id: number
  assetId: number
  mapId: number
  userId: number | null
  img: string
  creature: Creature_dnd | null
  character: Character_dnd | null
  x: number
  y: number
  size: number
};

type Map_dnd = {
  id: number
  game: Game
  name: string
  filepath: string
  img: string
  sharedTo: User[]
  cellSize: number
  gridColor: string
  gridOpacity: number
  offsetX: number
  offsetY: number
  boardState: Token_dnd[]
};

type Character_dnd = {
  id: number
  user: User
  img: string
  name: string
  alignment: string | null
  lvl: number
  xp: number
  acOverride: number
  acMod: number
  ac: number
  maxHpOverride: number
  maxHpMod: number
  maxHp: number
  maxHpDmg: number
  hp: number
  tempHp: number
  insp?: boolean
  bardicInsp: BardicInsp_dnd | null
  abilityScores: AbilityScore_dnd[]
  race: PlayerRace_dnd | null
  subrace: PlayerSubrace_dnd | null
  classes: PlayerClass_5e[] | PlayerClass_2024[]
  background: PlayerBackground_5e | PlayerBackground_2024 | null
  feats: Feat_5e[] | Feat_2024[]
  traits: Trait_dnd[]
  features: Feature_dnd[]
  currentHitDice: Dice_dnd[]
  speeds: Speed_dnd[]
  senses: NameValue[]
  proficiencies: Prof_dnd
  skills: Skill_dnd[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost_dnd[]
  spellcasting: Spellcasting_5e | Spellcasting_2024 | null
  ruleset: Ruleset
  targets: Token_dnd[]
};

type BardicInsp_dnd = {
  type: number
  amount: number
  keepOnFail: boolean
};

type CharacterCard_dnd = {
  id: number
  name: string
  img: string
  lvl: number
  race: string | null
  subrace: string | null
  classes: { name: string, lvl: number, subclass: string | null }[]
  background: string
  ruleset: Ruleset
};

type Race_dnd = {
  id: number
  name: string
  source: Source
  description: string | null
  abilityBonuses: NameValue[]
  age: string | null
  size: string | null
  sizeDesc: string | null
  alignment: string | null
  startingProficiencies: Prof_dnd[]
  languages: string[]
  languageDesc: string | null
  speeds: Speed_dnd[]
  traits: Trait_dnd[]
  subraces: Subrace_dnd[]
};

type PlayerRace_dnd = {
  id: number
  name: string
  subraces: Subrace_dnd | null
};

type Subrace_dnd = {
  id: number
  name: string
  source: Source
  description: string | null
  abilityBonuses: NameValue[]
  startingProficiencies: Prof_dnd[]
  languages: string[]
  languageDesc: string | null
  traits: Trait_dnd[]
  spells: Spell_dnd[]
};

type PlayerSubrace_dnd = {
  id: number
  name: string
};

type Trait_dnd = {
  id: number
  name: string
  description: string | null
  races: string | null
  subraces: string | null
  profChoices: ProfChoice_dnd[]
  languageChoices: LangChoice_dnd[]
};

type Feature_dnd = {
  id: number
  name: string
  description: string | null
  lvl: number
  class: string
  subclass: string
};

type Level_dnd = {
  name: string
};

type Creature_dnd = {
  id: number
  asset: Asset
  name: string
  source: Source
  size: string
  type: string
  alignment: string
  ac: number
  maxHp: number
  hitDice: string
  abilityScores: AbilityScore_dnd[]
  cr: number
  xp: number
  languages: string[]
  speeds: NameValue[]
  proficiencies: Prof_dnd[]
  vulnerabilities: string[]
  resistances: string[]
  damageImmunities: string[]
  conditionImmunities: string[]
  senses: NameValue[]
  abilities: SpecialAbility_dnd[]
  actions: NameDesc[]
  legActions: NameDesc[]
  targets: (Creature_dnd | Character_dnd)[]
  spellcasting?: Spellcasting_dnd
};

type Skill_dnd = {
  id: number
  name: string
  type: string
  mod: number
  proficient: boolean
};

type Prof_dnd = {
  weapons: string[]
  armor: string[]
  tools: string[]
  instruments: string[]
  vehicles: string[]
};

type ProfChoice_dnd = {
  amount: number
  description: string
  options: string[] | ProfChoice_dnd[]
};

type LangChoice_dnd = {
  amount: number
  description: string
  languages: string[]
};

type Speed_dnd = {
  name: string
  value: number
  hover: boolean
};

type AbilityScore_dnd = {
  id: number
  name: string
  value: number
  mod: number
  scoreOverride: number
  scoreMod: number
  prof: boolean
};

type EquipmentCategory_dnd = 'Adventuring Gear' | 'Ammunition' | 'Weapon' | 'Armor' | 'Tool' | 'Instrument' | 'Treasure' | 'Holy Symbol' | 'Arcane Focus' | 'Druidic Focus' | 'Consumable' | 'Mount/Vehicle' | 'Ring' | 'Equipment Pack' | 'Wonderous Item' | 'Ring' | 'Rod' | 'Staff' | 'Scroll' | 'Wand' | 'Gaming Set' | 'Potion';
type Rarity_dnd = 'None' | 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
type ArmorType_dnd = 'Light' | 'Medium' | 'Heavy' | 'Shield';

type Cost_dnd = {
  amount: number
  type: string
};

type Range_dnd = {
  normal: number
  long: number | null
};

type Damage_dnd = {
  dice: Dice_dnd
  type: string
};

type SpellDamage_dnd = {
  type: string
  damageAtSpellLevel: AtSpecificLevel_dnd[]
  damageAtCharacterLevel: AtSpecificLevel_dnd[]
};

type AtSpecificLevel_dnd = {
  lvl: number
  dice: Dice_dnd
};

type DC_dnd = {
  type: string
  value?: number
  successType: 'none' | 'half' | 'other'
};

type AOE_dnd = {
  type: 'radius' | 'line' | 'cone' | 'cube' | 'sphere' | 'hemisphere' | 'cylinder'
  size: number
};

type Usage_dnd = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times?: number
  dice?: Dice_dnd
  minValue?: number
};

type AtSpecificLevel_dnd = {
  lvl: number
  dice: Dice_dnd
};

type SpellSlots_dnd = {
  1: number
  2: number
  3: number
  4: number
  5: number
  6: number
  7: number
  8: number
  9: number
};

type PactSlots_dnd = {
  amount: number
  lvl: number
};

type SpellRange_dnd = {
  type: 'feet' | 'mile' | 'touch' | 'self' | 'unlimited' | 'sight' | 'special'
  amount?: number
};

type Spell_dnd = {
  id: number
  name: string
  source: Source
  description: string | null
  lvl: number
  range: string
  target: string
  components: string[]
  ritual: boolean
  duration: string
  concentration: boolean
  castingTime: string
  higherLevel: string | null
  aoe: AOE_dnd | null
  damage: SpellDamage_dnd | null
  dc: DC_dnd | null
  healAtSlotLevel: AtSpecificLevel_dnd | null
  school: string
  classes: string[]
  subclasses: string[]
  material: string | null
};

type MultiClassing_dnd = {
  prerequisites: NameValue[]
  proficiencies: Prof_dnd
  profChoices: ProfChoice_dnd[]
};
