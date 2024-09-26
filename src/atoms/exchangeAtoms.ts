import { atom } from 'jotai';

export const exchangeDataAtom = atom(''); // 환전 금액
export const exchangeStepAtom = atom(1); // 현재 스텝
export const isMissionAtom = atom(false); // 미션인지 여부
