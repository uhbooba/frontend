import { atom } from 'jotai';

export const selectAccountAtom = atom<number | null>(null);
export const selectMoneyAtom = atom('');
export const selectPeriodAtom = atom('');
export const maturityDateAtom = atom('');
