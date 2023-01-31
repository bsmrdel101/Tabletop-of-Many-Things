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

export type Creature = {
  id: number
  user_id: number
  index: string
  name: string
  size: number
  type: string
  alignment: string
  ac: number
  hit_points: number
  hit_dice: string
  str: number
  dex: number
  con: number
  int: number
  wis: number
  char: number
  cr: number
  xp: number
  languages: any
  speeds: any
  proficiencies: any
  vulnerabilities: any
  resistances: any
  damageImmunities: any
  conditionImmunities: any
  senses: any
  abilities: any
  actions: any
  legActions: any
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
  url: string
};

export interface Modifiers {
  strMod: number
  dexMod: number
  conMod: number
  intMod: number
  wisMod: number
  charMod: number
}
