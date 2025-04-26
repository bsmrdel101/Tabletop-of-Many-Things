type ButtonHTML = React.ButtonHTMLAttributes<HTMLButtonElement>
type InputHTML = React.InputHTMLAttributes<HTMLInputElement>
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

type Asset = {
  id: number
  filepath: string
  img: string
  name: string
};

type User = {
  id: number
  username: string
};

type Game = {
  id: number
  name: string
  dm: User
  playerList: User[]
  ruleset: string
  password?: string
};

type GameMin = {
  id: number
  gameId?: number
  name: string
  ruleset: string
};
