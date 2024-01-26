export interface NameValue {
  name: string
  value: number
}

export interface NameDesc {
  name: string
  desc: string
}

export type User = {
  id: number
  username: string
  password: string
  newUser: boolean
};

export type Game = {
  id: number
  user_id: number
  name: string
  code: string
  dm: number
  map_id: number
};

export interface Coord {
  x: number
  y: number
}

export interface GridSize {
  gridSizeX: number
  gridSizeY: number
}

export type Asset = {
  id: number
  image: string
};

export type Token = {
  id: number
  map_id: number
  image: string
  creature: Creature
  x: number
  y: number
  size: number
};

export type Map = {
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

export type Character = {
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

export type Creature = {
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
};

export type Skill = {
  id: number
  name: string
  type: string
  bonus_mod: number
  proficient: boolean
};

export type Roll = {
  type: number
  amount: number
  mod: number
  roll: number
  total: number
};

export type RollResult = {
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

export type ChatMsg = {
  text: string
  sender: string
};

export interface Modifiers {
  strMod: number
  dexMod: number
  conMod: number
  intMod: number
  wisMod: number
  charMod: number
}

export interface AtSpecificLevel {
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

export type Dice = {
  amount: number
  type: number
  mod: number
  display: string
};

export type Usage = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times: number
};

export type DC = {
  type: string
  value?: 14,
  successType: 'none' | 'half' | 'other'
};

export type AOE = {
  type: string
  size: number
};

export type Damage = {
  dice: Dice
  type: string
};

export type SpellDamage = {
  type: string
  damageAtSpellLevel?: AtSpecificLevel[]
  damageAtCharacterLevel?: AtSpecificLevel[]
};

export type AbilityScore = {
  name: string
  value: number
  mod: number
};

export type Prof = {
  type: 'skill' | 'save'
  name: string
  value: number
};

export type SpecialAbility = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
  spellcasting?: Spellcasting
};

export type Action = {
  name: string
  desc: string
  attackBonus?: number
  dc?: DC
  damage?: Damage[]
  usage?: Usage
};

export type MinifiedSpell = {
  id?: number
  name: string
  level: number
};

export type Spell = {
  id?: number
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
  areaOfEffect?: AOE
  damage?: SpellDamage
  dc?: DC
  healAtSlotLevel?: AtSpecificLevel
  school: string
  classes: string[]
  subclasses?: string[]
  material?: string
};

export type Spellcasting = {
  ability: string
  dc: number
  modifier: number
  class: string
  slots: SpellSlots
  spells: MinifiedSpell[]
};
