import { atom } from 'jotai';

interface SelectedSavingsProduct {
  name: string;
  interestRate: number;
  minimumAmount: number;
  earlyInterestRate: number;
}

export const selectAccountAtom = atom<number | null>(null);
export const selectMoneyAtom = atom('');
export const selectPeriodAtom = atom('');
export const maturityDateAtom = atom('');
export const checkAtom = atom('');
export const errorsAtom = atom({
  name: '',
  idNumber: '',
  phoneNumber: '',
  accountNumber: '',
});
export const selectedSavingsProductAtom = atom<SelectedSavingsProduct | null>(
  null,
);
