import { atom } from 'jotai';

export const selectMoneyAtom = atom('');
export const selectPeriodAtom = atom('');
export const maturityDateAtom = atom('');
export const selectAccountAtom = atom<number | null>(null);
export const checkAtom = atom('');
export const errorsAtom = atom({
  name: '',
  idNumber: '',
  phoneNumber: '',
  accountNumber: '',
});
