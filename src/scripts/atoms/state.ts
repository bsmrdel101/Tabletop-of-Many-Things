import { atom } from 'jotai';


export const userAtom = atom<User>({ pubId: '', displayName: '', email: '', settings: {} });
export const gameAtom = atom<Game | null>(null);
export const roomAtom = atom<string>('');
export const dialogsAtom = atom<{ order: number, div: HTMLDivElement }[]>([]);
