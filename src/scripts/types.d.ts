type ButtonHTML = React.HTMLProps<HTMLButtonElement>
type InputHTML = React.HTMLProps<HTMLInputElement>

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
  password: string
  newUser: boolean
};

type Game = {
  id: number
  user_id: number
  name: string
  code: string
  dm: number
  map_id: number
};

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
  image: string
};

type Token = {
  id: number
  asset_id: number
  map_id: number
  user_id?: number
  image: string
  creature: Creature
  x: number
  y: number
  size: number
};

type Board = {
  id: number
  game_id: number
  name: string
  filepath: string
  image: string
  cellSize: number
  gridColor: string
  gridOpacity: number
  offsetX: number
  offsetY: number
  boardState: Token[]
};

type Character = {
  id?: number
  name: string
  class: string
  race: string
  background: string
  alignment: string
  level: number
  ac: number
  max_health: number
  current_health: number
  temp_health: number
  prof_bonus: number
  initiative: number
  inspiration: boolean
  hit_dice: number | string
  str: number
  dex: number
  con: number
  int: number
  wis: number
  char: number
  image: string
  walk_speed: number
  swim_speed: number
  burrow_speed: number
  fly_speed: number
  climb_speed: number
};

type Creature = {
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

type Skill = {
  id: number
  name: string
  type: string
  bonus_mod: number
  proficient: boolean
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

interface Modifiers {
  strMod: number
  dexMod: number
  conMod: number
  intMod: number
  wisMod: number
  charMod: number
}

interface AtSpecificLevel {
  level: number
  dice: Dice
}

interface SpellSlots {
  1: number
  2: number
  3: number
  4: number
  5: number
  6: number
  7: number
  8: number
  9: number
}

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

type Damage = {
  dice: Dice
  type: string
};

type SpellDamage = {
  type: string
  damageAtSpellLevel?: AtSpecificLevel[]
  damageAtCharacterLevel?: AtSpecificLevel[]
};

type AbilityScore = {
  name: string
  value: number
  mod: number
};

type Prof = {
  type: 'skill' | 'save'
  name: string
  value: number
};

type SpecialAbility = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
};

type Action = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
  usage?: Usage
};

type Spell = {
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

type Spellcasting = {
  ability: string
  dc: number
  modifier: number
  class: string
  slots: SpellSlots
  spells: Spell[]
};

type Cost = {
  amount: number
  type: string
};

interface Range {
  normal: number
  long?: number
  display: string
}

type EquipmentCategory = 'Adventuring Gear' | 'Ammunition' | 'Weapon' | 'Armor' | 'Tool' | 'Treasure' | 'Holy Symbol' | 'Arcane Focus' | 'Druidic Focus' | 'Consumable' | 'Mount/Vehicle' | 'Ring' | 'Equipment Pack' | 'Wonderous Item' | 'Rod' | 'Staff' | 'Scroll' | 'Wand';

type Item = {
  id: number
  name: string
  desc: string
  type: EquipmentCategory
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Legendary' | 'Artifact'
  cost: Cost
  lbs: number
  properties: string[]
  armorType?: 'Light' | 'Medium' | 'Heavy' | 'Shield'
  weaponType?: 'Simple' | 'Martial' | 'Firearm'
  damage?: Damage
  range?: Range
};
