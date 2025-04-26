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
  proficiencies: Prof[]
  resistances: string[]
  vulnerabilities: string[]
  condImmunities: string[]
  dmgImmunities: string[]
  languages: string[]
  currency: Cost[]
  spellcasting: Spellcasting_5e | null
  ruleset: string
  targets: Token_5e
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
  startingProficiencies: Prof[]
  languages: string[]
  languageDesc: string | null
  speeds: Speed[]
  traits: NameDesc[]
  subraces: Subrace[]
};

type Subrace_5e = {
  id: number
  name: string
  desc: string | null
  abilityBonuses: NameValue[]
  startingProficiencies: Prof[]
  languages: string[]
  languageDesc: string | null
  traits: NameDesc[]
};

type Class_5e = {
  id: number
  gameId: number | null
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
  subclasses: Subclass_5e[]
};

type Subclass_5e = {
  id: number
  name: string
  subclassFlavor: string | null
  desc: string | null
  levels: Level[]
  spells: Spell[]
};

type Background_5e = {
  id: number
  gameId: number | null
  name: string
  desc: string | null
  proficiencies: string | null
  languages: string[]
  equipment: Item[]
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
  mod: number
  proficient: boolean
};

type Speed_5e = {
  name: string
  value: number
  hover: boolean
};
