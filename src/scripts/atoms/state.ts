import { atom } from 'jotai';

interface CoordGridState {
  currentZoom: number;
  panOffsetX: number;
  panOffsetY: number;
}

interface GridState {
  cellSize: number;
  gridOpacity: number;
  gridColor: string;
  offsetX: number;
  offsetY: number;
}

interface RightClickMenuState {
  rightClickMenuType: string
  token?: Token
}

export const userAtom = atom<User>(null);
export const gameAtom = atom<Game>(null);
export const gridCoordAtom = atom<CoordGridState>(null);
export const gridAtom = atom<GridState>(null);
export const rightClickMenuAtom = atom<RightClickMenuState>(null);
export const tokenAtom = atom<Coord>(null);
export const creaturesAtom = atom<Creature[]>([]);
