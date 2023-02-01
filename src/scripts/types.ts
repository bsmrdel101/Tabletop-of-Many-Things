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

export type MapToken = {
  map_id: number
  token_id: number
  x: number
  y: number
  size: number
};

export type Map = {
  id: number
  game_id: number
  name: string
  image: string
  gridSizeX: number
  gridSizeY: number
  gridColor: string
  gridOpacity: number
  boardState: JSON
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

export type ChatMsg = {
  text: string
  sender: string
};

export type MinifiedCreature = {
  index: string
  name: string
  url?: string
};

export interface Modifiers {
  strMod: number
  dexMod: number
  conMod: number
  intMod: number
  wisMod: number
  charMod: number
}

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
  dc?: DC
};

export type Action = {
  name: string
  desc: string
  attackBonus?: number
  damage?: Damage
  usage?: Usage
};

export type Dice = {
  amount: number
  type: number
  mod: number
};

export type Usage = {
  type: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll'
  times: number
};

export type DC = {
  type: string
  value: 14,
  successType: 'none' | 'half' | 'other'
};

export type Damage = {
  dice: Dice
  type: string
};
