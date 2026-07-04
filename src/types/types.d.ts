type ButtonHTML = React.ButtonHTMLAttributes<HTMLButtonElement>
type InputHTML = React.InputHTMLAttributes<HTMLInputElement>
type TextAreaHTML = React.InputHTMLAttributes<HTMLTextAreaElement>
type LinkHTML = React.AnchorHTMLAttributes<HTMLAnchorElement>
type SelectHTML = React.SelectHTMLAttributes<HTMLSelectElement>

interface NameValue {
  name: string
  value: number
}

interface NameDesc {
  name: string
  desc: string
}

type Coord = {
  x: number
  y: number
};

type Asset = {
  id: number
  filepath: string
  img: string
  name: string
};

type User = {
  pubId: string
  displayName: string
  email: string
  img: string | null
  settings: ClientSettings
};

type World = {
  id: number
  pubId: string
  name: string
};

type Game = {
  id: number
  pubId: string
  worldId: string
  name: string
  dm: User
  playerList: User[]
  ruleset: Ruleset
  password: string | null
  settings: GameSettings
};

type GameSettings = {
  dnd?: {
    ignoreCoinWeight: boolean
    usingXp: boolean
    trackNormalArrows: boolean
  }
};

type ClientSettings = {
  dnd?: any
};

type Ruleset = '5e' | '2024';
type Source = 'default' | 'user' | 'game' | 'world';
