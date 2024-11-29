import { atom } from 'jotai';

interface GameState {
  game: Game
  room: string
  map: Board
}

interface GridState {
  cellSize: number;
  gridOpacity: number;
  gridColor: string;
  offsetX: number;
  offsetY: number;
}

const intialGameState = {
  game: null,
  room: '',
  map: null
} as GameState;

export const userAtom = atom<User>(null);
export const gameAtom = atom<GameState>(intialGameState);
export const gridAtom = atom<GridState>(null);
export const rightClickMenuAtom = atom<RightClickMenuState>({ menuType: '' });
export const creaturesAtom = atom<Creature[]>([]);
export const spellsAtom = atom<Spell[]>([]);
export const racesAtom = atom<Race[]>([]);
export const classesAtom = atom<Class[]>([]);
export const backgroundsAtom = atom<Background[]>([]);
