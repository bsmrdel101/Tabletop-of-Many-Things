type Dice_Dnd = {
  amount: number
  type: number
  mod: number
  display: string
};

type RollResult_Dnd = {
  total: number
  rolled: number
  mod: number
  dice: Dice_Dnd[]
};

type Prerequisites_Dnd = {
  abilityScore?: AbilityScore_Dnd
  lvl?: number
  classLvl?: { class: Class_5e | Class_2024, lvl: number }
  minValue?: number
};

type Token_Dnd = {
  id: number
  assetId: number
  mapId: number
  userId: number | null
  img: string
  creature: Creature_Dnd | null
  character: Character_Dnd | null
  x: number
  y: number
  size: number
};

type Map_Dnd = {
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
  boardState: Token_Dnd[]
};

type Character_Dnd = {
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
  bardicInsp: BardicInsp_Dnd | null
  abilityScores: AbilityScore_Dnd[]
  race: PlayerRace_Dnd | null
  subrace: PlayerSubrace_Dnd | null
  classes: PlayerClass_5e[] | PlayerClass_2024[]
  subclass: PlayerSubclass_5e | PlayerSubclass_2024 | null
  background: PlayerBackground_5e | PlayerBackground_2024 | null
  feats: Feat_5e[] | Feat_2024[]
  traits: Trait_Dnd[]
  features: Feature_Dnd[]
  currentHitDice: Dice_Dnd[]
  speeds: Speed_Dnd[]
  senses: NameValue[]
  proficiencies: Prof_Dnd[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost_Dnd[]
  spellcasting: Spellcasting_5e | Spellcasting_2024 | null
  ruleset: string
  targets: Token_Dnd[]
};

type BardicInsp_Dnd = {
  type: number
  amount: number
  keepOnFail: boolean
};

type CharacterCard_Dnd = {
  id: number
  name: string
  img: string
  lvl: number
  race: string | null
  subrace: string | null
  classes: { name: string, lvl: number, subclass: string | null }[]
  background: string
  ruleset: string
};

type Race_Dnd = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  abilityBonuses: NameValue[]
  age: string | null
  size: string | null
  sizeDesc: string | null
  alignment: string | null
  startingProficiencies: Prof_Dnd[]
  languages: string[]
  languageDesc: string | null
  speeds: Speed_Dnd[]
  traits: Trait_Dnd[]
  subraces: Subrace_Dnd[]
};

type PlayerRace_Dnd = {
  id: number
  name: string
  subraces: Subrace_Dnd | null
};

type Subrace_Dnd = {
  id: number
  name: string
  desc: string | null
  abilityBonuses: NameValue[]
  startingProficiencies: Prof_Dnd[]
  languages: string[]
  languageDesc: string | null
  traits: Trait_Dnd[]
  spells: Spell_Dnd[]
};

type PlayerSubrace_Dnd = {
  id: number
  name: string
};

type Trait_Dnd = {
  id: number
  name: string
  desc: string | null
  races: string | null
  subraces: string | null
  profChoices: ProfChoice_Dnd[]
  languageChoices: LangChoice_Dnd[]
};

type Level_Dnd = {
  name: string
};

type Creature_Dnd = {
  id: number
  asset: Asset
  name: string
  size: string
  type: string
  alignment: string
  ac: number
  maxHp: number
  hitDice: string
  abilityScores: AbilityScore_Dnd[]
  cr: number
  xp: number
  languages: string[]
  speeds: NameValue[]
  proficiencies: Prof_Dnd[]
  vulnerabilities: string[]
  resistances: string[]
  damageImmunities: string[]
  conditionImmunities: string[]
  senses: NameValue[]
  abilities: SpecialAbility_Dnd[]
  actions: NameDesc[]
  legActions: NameDesc[]
  targets: (Creature_Dnd | Character_Dnd)[]
  spellcasting?: Spellcasting_Dnd
};

type Skill_Dnd = {
  id: number
  name: string
  type: string
  mod: number
  proficient: boolean
};

type ProfType_Dnd = 'skill' | 'save' | 'weapon' | 'armor' | 'tool' | 'vehicle';
type Prof_Dnd = {
  type: ProfType_Dnd
  name: string
  value: number
};

type ProfChoice_Dnd = {
  desc: string | null
  choose: number
  type: ProfType_Dnd
  proficiencies: Prof_Dnd[]
};

type LangChoice_Dnd = {
  desc: string | null
  choose: number
  languages: string[]
};

type Speed_Dnd = {
  name: string
  value: number
  hover: boolean
};

type AbilityScore_Dnd = {
  id: number
  name: string
  value: number
  mod: number
  scoreOverride: number
  scoreMod: number
  prof: boolean
};

type Feature_Dnd = {
  id: number
  classId: number
  name: string
  desc: string
  lvl: number
};

type EquipmentCategory_Dnd = 'Adventuring Gear' | 'Ammunition' | 'Weapon' | 'Armor' | 'Tool' | 'Instrument' | 'Treasure' | 'Holy Symbol' | 'Arcane Focus' | 'Druidic Focus' | 'Consumable' | 'Mount/Vehicle' | 'Ring' | 'Equipment Pack' | 'Wonderous Item' | 'Ring' | 'Rod' | 'Staff' | 'Scroll' | 'Wand' | 'Gaming Set' | 'Potion';
type Rarity_Dnd = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
type Item_Dnd = {
  id: number
  name: string
  desc: string | null
  type: EquipmentCategory_Dnd
  rarity: Rarity_Dnd
  cost: Cost_Dnd | null
  lbs: number
  properties: string[]
  armorType?: 'Light' | 'Medium' | 'Heavy' | 'Shield'
  weaponType?: 'Simple' | 'Martial' | 'Firearm'
  damage?: Damage_Dnd
  range?: Range_Dnd
};

type Cost_Dnd = {
  amount: number
  type: string
};

type Range_Dnd = {
  normal: number
  long: number | null
  display: string
};

type Damage_Dnd = {
  dice: Dice_Dnd
  type: string
};

type SpellDamage_Dnd = {
  type: string
  damageAtSpellLevel: AtSpecificLevel_Dnd[]
  damageAtCharacterLevel: AtSpecificLevel_Dnd[]
};

type AtSpecificLevel_Dnd = {
  level: number
  dice: Dice_Dnd
};

type DC_Dnd = {
  type: string
  value?: number
  successType: 'none' | 'half' | 'other'
};

type AOE_Dnd = {
  type: 'radius' | 'line' | 'cone' | 'cube' | 'sphere' | 'hemisphere' | 'cylinder'
  size: number
};

type Usage_Dnd = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times?: number
  dice?: Dice_Dnd
  minValue?: number
};

type AtSpecificLevel_Dnd = {
  level: number
  dice: Dice_Dnd
};

type SpellSlots_Dnd = {
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

type PactSlots_Dnd = {
  amount: number
  level: number
};

type SpellRange_Dnd = {
  type: 'feet' | 'mile' | 'touch' | 'self' | 'unlimited' | 'sight' | 'special'
  amount?: number
};

type Spell_Dnd = {
  id: number
  name: string
  desc: string | null
  level: number
  range: string
  target: string
  components: string[]
  ritual: boolean
  duration: string
  concentration: boolean
  castingTime: string
  higherLevel: string | null
  aoe: AOE_Dnd | null
  damage: SpellDamage_Dnd | null
  dc: DC_Dnd | null
  healAtSlotLevel: AtSpecificLevel_Dnd | null
  school: string
  classes: string[]
  subclasses: string[]
  material: string | null
};
