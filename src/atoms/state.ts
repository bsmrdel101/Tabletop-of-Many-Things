import { atom } from 'jotai';


export const userAtom = atom<User>({ id: 0, username: '' });
