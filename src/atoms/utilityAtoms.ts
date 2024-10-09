import { atom } from 'jotai';

export const utilityDataAtom = atom({
  corporation: '한국 전력 공사',
  amount: 150000,
  userName: '이수자',
  dueDate: '2025.09.06',
});

export const utilityMissionAtom = atom(false); // 미션인지 여부
