import { atom } from 'jotai';

export const accountNumberAtom = atom(''); 
export const accountHolderNameAtomn = atom('사용자');
export const selectedBankAtom = atom('');
export const amountAtom = atom(0);
// 추후 사용자의 실제 이름을 변수로 받아서 이용
export const myAccountRecordAtom = atom('예금주명')
export const yourAccountRecordAtom = atom('예금주명')