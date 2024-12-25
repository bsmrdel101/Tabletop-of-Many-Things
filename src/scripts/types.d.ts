type ButtonHTML = React.HTMLProps<HTMLButtonElement>
type InputHTML = React.HTMLProps<HTMLInputElement>
type SelectHTML = React.HTMLProps<HTMLSelectElement>

interface NameValue {
  name: string
  value: number
}

interface NameDesc {
  name: string
  desc: string
}

interface RightClickMenuState {
  menuType: string
  token?: Token
}

type User = {
  id: number
  username: string
  newUser: boolean
};

type Game = {
  id: number
  userId: number
  name: string
  code: string
  dm: number
  map: Map
  ruleset: string
};

interface GameState {
  game: Game
  room: string
  map: Board
}

interface Coord {
  x: number
  y: number
}

interface GridSize {
  gridSizeX: number
  gridSizeY: number
}

type Asset = {
  id: number
  filepath: string
  img: string
};

type Token_5e = {
  id: number
  assetId: number
  mapId: number
  userId?: number
  img: string
  creature?: Creature
  character?: Character
  x: number
  y: number
  size: number
};

type Board_5e = {
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
  boardState: Token[]
};

type Character_5e = {
  id: number
  userId: number
  img: string
  name: string
  alignment: string
  lvl: number
  xp: number
  acOverride: number
  acMod: number
  maxHpOverride: number
  maxHpMod: number
  maxHp: number
  prevMaxHp: number
  hp: number
  tempHp: number
  insp: boolean
  race?: Race
  classes: Class[]
  background?: Background
  currentHitDice: Dice[]
  speeds: Speed[]
  senses: NameValue[]
  proficiencies: Prof[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost[]
  spellcasting: Spellcasting
  ruleset: string
  targets: Token
};

type Race_5e = {
  id: number
  gameId: number
  name: string
  desc: string
  abilityBonuses: NameValue[]
  age: string
  size: string
  sizeDesc: string
  alignment: string
  startingProficiencies: Prof[]
  languages: string[]
  languageDesc: string
  speeds: Speed[]
  traits: NameDesc[]
  subrace?: Subrace
};

type Subrace_5e = {
  id: number
  name: string
  desc: string
  abilityBonuses: NameValue[]
  startingProficiencies: Prof[]
  languages: string[]
  languageDesc: string
  traits: NameDesc[]
};

type Class_5e = {
  id: number
  name: string
  lvl: number
  hitDice: number
  proficiencies: Prof[]
  skillChoices: Skill[]
  saves: Skill[]
  startingItems: Item[]
  startingItemChoices: Item[]
  levels: Level[]
  multiClassing: any[]
};

type Subclass_5e = {
  id: number
  name: string
  subclassFlavor: string
  desc: string
  levels: Level[]
  spells: Spell[]
};

type Background_5e = {
  id: number
  name: string
  desc: string
  proficiencies: string
  languages: string[]
  equipment: Item[]
  features: NameDesc[]
  personalityTraits: string
  ideals: string
  bonds: string
  flaws: string
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
  proficiencies: Prof[]
  vulnerabilities: string[]
  resistances: string[]
  damageImmunities: string[]
  conditionImmunities: string[]
  senses: NameValue[]
  abilities: SpecialAbility[]
  actions: NameDesc[]
  legActions: NameDesc[]
  targets: (Creature | Character)[]
  spellcasting?: Spellcasting
};

type Skill_5e = {
  id: number
  name: string
  type: string
  bonus_mod: number
  proficient: boolean
};

type Speed_5e = {
  name: string
  value: number
  hover: boolean
};

type Roll = {
  type: number
  amount: number
  mod: number
  roll: number
  total: number
};

type RollResult = {
  type: number
  amount: number
  mod: number
  roll: number
  total: number
  owner: string
  rollType: string
  targets: (Creature | Character)[]
  damageType: string
};

type ChatMsg = {
  text: string
  sender: string
};

interface Modifiers_5e {
  strMod: number
  dexMod: number
  conMod: number
  intMod: number
  wisMod: number
  charMod: number
}

interface AtSpecificLevel_5e {
  level: number
  dice: Dice
}

type SpellSlots = {
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

type PactSlots = {
  amount: number
  level: number
};

type Dice = {
  amount: number
  type: number
  mod: number
  display: string
};

type Usage = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times?: number
  dice?: Dice
  minValue?: number
};

type DC = {
  type: string
  value?: 14,
  successType: 'none' | 'half' | 'other'
};

type AOE = {
  type: string
  size: number
};

type Damage_5e = {
  dice: Dice
  type: string
};

type SpellDamage_5e = {
  type: string
  damageAtSpellLevel?: AtSpecificLevel[]
  damageAtCharacterLevel?: AtSpecificLevel[]
};

type AbilityScore_5e = {
  name: string
  value: number
  mod: number
};

type ProfType = 'skill' | 'save' | 'weapon' | 'armor' | 'tool' | 'vehicle';
type Prof = {
  type: ProfType
  name: string
  value: number
};

type SpecialAbility_5e = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
};

type Action_5e = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
  usage?: Usage
};

type Spell_5e = {
  id: number
  name: string
  desc: string
  level: number
  range: string
  components: string[]
  ritual: boolean
  duration: string
  concentration: boolean
  castingTime: string
  higherLevel?: string
  aoe?: AOE
  damage?: SpellDamage
  dc?: DC
  healAtSlotLevel?: AtSpecificLevel
  school: string
  classes: string[]
  subclasses?: string[]
  material?: string
};

type Spellcasting_5e = {
  ability: string
  dc: number
  mod: number
  class: string
  slots: SpellSlots
  pactSlots: PactSlots
  spells: Spell[]
};

type Cost = {
  amount: number
  type: string
};

type Range_5e = {
  normal: number
  long?: number
  display: string
};

type EquipmentCategory_5e = 'Adventuring Gear' | 'Ammunition' | 'Weapon' | 'Armor' | 'Tool' | 'Instrument' | 'Treasure' | 'Holy Symbol' | 'Arcane Focus' | 'Druidic Focus' | 'Consumable' | 'Mount/Vehicle' | 'Ring' | 'Equipment Pack' | 'Wonderous Item' | 'Ring' | 'Rod' | 'Staff' | 'Scroll' | 'Wand' | 'Gaming Set' | 'Potion';
type Rarity_5e = 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact';
type Item_5e = {
  id: number
  name: string
  desc: string
  type: EquipmentCategory
  rarity: Rarity_5e
  cost: Cost
  lbs: number
  properties: string[]
  armorType?: 'Light' | 'Medium' | 'Heavy' | 'Shield'
  weaponType?: 'Simple' | 'Martial' | 'Firearm'
  damage?: Damage
  range?: Range
};
