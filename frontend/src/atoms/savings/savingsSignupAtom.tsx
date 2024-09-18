import { atom } from 'jotai';

export const checkAtom = atom('');
export const errorsAtom = atom({
    name: '',
    idNumber: '',
    phoneNumber: '',
    accountNumber: '',
  });
