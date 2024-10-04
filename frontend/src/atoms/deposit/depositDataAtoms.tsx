import { atom } from 'jotai';

interface SelectedDepositProduct {
  name: string;
  interestRate: number;
  minimumAmount: number;
  earlyInterestRate: number;
}

export const selectAccountAtom = atom<number | null>(null);
export const selectMoneyAtom = atom('');
export const selectPeriodAtom = atom('');
export const maturityDateAtom = atom('');
export const selectedDepositProductAtom = atom<SelectedDepositProduct | null>(
  null,
);
export const selectedKeywordAtom = atom('예금 상품');
