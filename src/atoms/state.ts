import { atom } from 'jotai';


export const userAtom = atom<User>({ id: 0, username: '', settings: {} });
export const gameAtom = atom<Game | null>(null);
