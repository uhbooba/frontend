import { atom } from 'jotai';

// 입금 (대상) 계좌 번호
export const depositAccountNoAtom = atom('');
// 출금 계좌 번호
export const withdrawalAccountNoAtom = atom('');
// 입금 (대상) 계좌 예금주명
export const depositUsernameAtom = atom('')
// 출금 계좌 예금주명
export const withdrawalUsernameAtom = atom('')
// 선택된 은행명
export const selectedBankAtom = atom('');
// 이체 금액
export const transactionBalanceAtom = atom(0);
// 입금 (대상) 계좌 기록
export const depositTransactionSummaryAtom = atom('');
// 출금 계좌 기록
export const withdrawalTransactionSummaryAtom = atom('');
// 계좌 이체 미션 진행 여부
export const isTransferMissionProgressingAtom = atom(false);
