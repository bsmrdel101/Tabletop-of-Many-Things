type Dice_5e = {
  amount: number
  type: number
  mod: number
  display: string
};

type Token_5e = {
  id: number
  assetId: number
  mapId: number
  userId: number | null
  img: string
  creature: Creature_5e | null
  character: Character_5e | null
  x: number
  y: number
  size: number
};

type Map_5e = {
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
  boardState: Token_5e[]
};

type Character_5e = {
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
  prevMaxHp: number
  hp: number
  tempHp: number
  insp: boolean
  abilityScores: AbilityScore_5e[]
  race: Race_5e | null
  subrace: Subrace_5e | null
  classes: Class_5e[]
  subclass: Subclass_5e | null
  background: Background_5e | null
  currentHitDice: Dice[]
  speeds: Speed_5e[]
  senses: NameValue[]
  proficiencies: Prof_5e[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost_5e[]
  spellcasting: Spellcasting_5e | null
  ruleset: string
  targets: Token_5e[]
};

type CharacterMin_5e = {
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

type Race_5e = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  abilityBonuses: NameValue[]
  age: string | null
  size: string | null
  sizeDesc: string | null
  alignment: string | null
  startingProficiencies: Prof_5e[]
  languages: string[]
  languageDesc: string | null
  speeds: Speed_5e[]
  traits: Trait_5e[]
  subraces: Subrace_5e[]
};

type Subrace_5e = {
  id: number
  name: string
  desc: string | null
  abilityBonuses: NameValue[]
  startingProficiencies: Prof_5e[]
  languages: string[]
  languageDesc: string | null
  traits: Trait_5e[]
  spells: Spell_5e[]
};

type Trait_5e = {
  id: number
  name: string
  desc: string | null
  races: string | null
  subraces: string | null
  profChoices: ProfChoice_5e[]
  languageChoices: LangChoice_5e[]
};

type Class_5e = {
  id: number
  gameId: number | null
  name: string
  lvl: number
  hitDice: number
  proficiencies: Prof_5e[]
  profChoices: ProfChoice_5e[]
  saves: Skill_5e[]
  startingItems: Item_5e[]
  startingItemChoices: Item_5e[]
  levels: Level_5e[]
  multiClassing: any[]
  subclasses: Subclass_5e[]
};

type Subclass_5e = {
  id: number
  name: string
  subclassFlavor: string | null
  desc: string | null
  levels: Level_5e[]
  spells: Spell_5e[]
  class: { id: number, name: string }
};

type Background_5e = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  proficiencies: string | null
  languages: string[]
  equipment: Item_5e[]
  features: NameDesc[]
  personalityTraits: string | null
  ideals: string | null
  bonds: string | null
  flaws: string | null
};

type Level_5e = {
  name: string
};

type Creature_5e = {
  id: number
  asset: Asset
  name: string
  size: string
  type: string
  alignment: string
  ac: number
  maxHp: number
  hitDice: string
  abilityScores: AbilityScore[]
  cr: number
  xp: number
  languages: string[]
  speeds: NameValue[]
  proficiencies: Prof_5e[]
  vulnerabilities: string[]
  resistances: string[]
  damageImmunities: string[]
  conditionImmunities: string[]
  senses: NameValue[]
  abilities: SpecialAbility_5e[]
  actions: NameDesc[]
  legActions: NameDesc[]
  targets: (Creature_5e | Character_5e)[]
  spellcasting?: Spellcasting_5e
};

type Skill_5e = {
  id: number
  name: string
  type: string
  mod: number
  proficient: boolean
};

type ProfType_5e = 'skill' | 'save' | 'weapon' | 'armor' | 'tool' | 'vehicle';
type Prof_5e = {
  type: ProfType_5e
  name: string
  value: number
};

type ProfChoice_5e = {
  desc: string | null
  choose: number
  type: ProfType_5e
  proficiencies: Prof_5e[]
};

type LangChoice_5e = {
  desc: string | null
  choose: number
  languages: string[]
};

type Speed_5e = {
  name: string
  value: number
  hover: boolean
};

type AbilityScore_5e = {
  name: string
  value: number
  mod: number
  scoreOverride: number
  scoreMod: number
  prof: boolean
};

type EquipmentCategory_5e = 'Adventuring Gear' | 'Ammunition' | 'Weapon' | 'Armor' | 'Tool' | 'Instrument' | 'Treasure' | 'Holy Symbol' | 'Arcane Focus' | 'Druidic Focus' | 'Consumable' | 'Mount/Vehicle' | 'Ring' | 'Equipment Pack' | 'Wonderous Item' | 'Ring' | 'Rod' | 'Staff' | 'Scroll' | 'Wand' | 'Gaming Set' | 'Potion';
type Rarity_5e = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
type Item_5e = {
  id: number
  name: string
  desc: string | null
  type: EquipmentCategory
  rarity: Rarity_5e
  cost: Cost_5e | null
  lbs: number
  properties: string[]
  armorType?: 'Light' | 'Medium' | 'Heavy' | 'Shield'
  weaponType?: 'Simple' | 'Martial' | 'Firearm'
  damage?: Damage_5e
  range?: Range_5e
};

type Cost_5e = {
  amount: number
  type: string
};

type Range_5e = {
  normal: number
  long: number | null
  display: string
};

type Damage_5e = {
  dice: Dice_5e
  type: string
};

type SpellDamage_5e = {
  type: string
  damageAtSpellLevel: AtSpecificLevel_5e[]
  damageAtCharacterLevel: AtSpecificLevel_5e[]
};

type AtSpecificLevel_5e = {
  level: number
  dice: Dice_5e
};

type DC_5e = {
  type: string
  value?: number
  successType: 'none' | 'half' | 'other'
};

type AOE_5e = {
  type: 'radius' | 'line' | 'cone' | 'cube' | 'sphere' | 'hemisphere' | 'cylinder'
  size: number
};

type Usage_5e = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times?: number
  dice?: Dice_5e
  minValue?: number
};

type AtSpecificLevel_5e = {
  level: number
  dice: Dice_5e
};

type SpellSlots_5e = {
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

type PactSlots_5e = {
  amount: number
  level: number
};

type SpellRange_5e = {
  type: 'feet' | 'mile' | 'touch' | 'self' | 'unlimited' | 'sight' | 'special'
  amount?: number
};

type Spell_5e = {
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
  aoe: AOE_5e | null
  damage: SpellDamage_5e | null
  dc: DC_5e | null
  healAtSlotLevel: AtSpecificLevel_5e | null
  school: string
  classes: string[]
  subclasses: string[]
  material: string | null
};

type Spellcasting_5e = {
  ability: string
  dc: number
  mod: number
  class: string
  slots: SpellSlots_5e
  pactSlots: PactSlots_5e
  spells: Spell_5e[]
};
