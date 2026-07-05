import { atom } from 'jotai';

export const userAtom = atom<User>({ pubId: '', img: '', displayName: '', email: '', settings: {} });
export const gameAtom = atom<Game | null>(null);
export const roomAtom = atom<string>('');
export const dialogsAtom = atom<{ order: number, div: HTMLDivElement }[]>([]);
export const characterCreationProcess5eAtom = atom<CharacterCreationProcess_5e>({
  focusedClass: null,
  itemPage: 'gear',
  selectedChoices: {}
});
