import { atom } from 'jotai';

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

export const userAtom = atom<User>(null as User);
export const gameAtom = atom<GameState>(intialGameState);
export const gridAtom = atom<GridState>(null);
export const rightClickMenuAtom = atom<RightClickMenuState>({ menuType: '' });
export const creaturesAtom = atom<Creature_5e[]>([]);
export const spellsAtom = atom<Spell_5e[]>([]);
export const racesAtom = atom<Race_5e[]>([]);
export const classesAtom = atom<Class_5e[]>([]);
export const backgroundsAtom = atom<Background_5e[]>([]);
