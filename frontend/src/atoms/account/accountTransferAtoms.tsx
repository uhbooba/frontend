import { atom } from 'jotai';

export const depositAccountNoAtom = atom('');
export const withdrawalAccountNoAtom = atom('');
export const selectedBankAtom = atom('');
export const transactionBalanceAtom = atom(0);
// 추후 사용자의 실제 이름을 변수로 받아서 이용
export const depositTransactionSummaryAtom = atom('예금주명');
export const withdrawalTransactionSummaryAtom = atom('예금주명');
export const isTransferMissionProgressingAtom = atom(false)