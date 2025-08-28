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
  id: number
  username: string
  settings: ClientSettings
};

type Game = {
  id: number
  name: string
  dm: User
  playerList: User[]
  ruleset: string
  password?: string
  settings: GameSettings
};

type GameSettings = {
  dnd?: {
    ignoreCoinWeight: boolean
    usingXp: boolean
  }
};

type ClientSettings = {
  dnd?: any
};

type GameMin = {
  id: number
  gameId?: number
  name: string
  ruleset: string
};
