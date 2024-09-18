import { atom } from 'jotai';

export const isModalOpenAtom = atom(false);
export const nameAtom = atom('');
export const idNumberAtom = atom('');
export const phoneNumberAtom = atom('');
export const accountNumberAtom = atom('');
export const errorsAtom = atom({
  name: '',
  idNumber: '',
  phoneNumber: '',
  accountNumber: '',
});