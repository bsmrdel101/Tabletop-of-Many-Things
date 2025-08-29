type Character_2024 = {
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
  insp: boolean
  abilityScores: AbilityScore_5e[]
  race: PlayerRace_5e | null
  subrace: PlayerSubrace_5e | null
  classes: PlayerClass_5e[]
  subclass: PlayerSubclass_5e | null
  background: PlayerBackground_5e | null
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
