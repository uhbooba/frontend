import { atom } from 'jotai';

export const selectAccountAtom = atom<number | null>(null);
export const isModalOpenAtom = atom(false);