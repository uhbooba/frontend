import { atom } from 'jotai';

export const exchangeStepAtom = atom(1); // 현재 스텝
export const exchangeMissionAtom = atom(false); // 미션인지 여부

export const accountNoAtom = atom(''); // 계좌
export const exchangeAmountAtom = atom(''); // 환전 금액
