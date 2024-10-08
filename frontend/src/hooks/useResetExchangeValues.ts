import { useSetAtom } from 'jotai';
import {
  exchangeStepAtom,
  exchangeMissionAtom,
  accountNoAtom,
  exchangeAmountAtom,
} from '@/atoms/exchangeAtoms';

const useResetExchangeValues = () => {
  const setExchangeStep = useSetAtom(exchangeStepAtom);
  const setIsMission = useSetAtom(exchangeMissionAtom);
  const setAccountNo = useSetAtom(accountNoAtom);
  const setExchangeAmount = useSetAtom(exchangeAmountAtom);

  const resetValues = () => {
    setExchangeStep(1); // 스텝 초기화
    setIsMission(false); // 미션 여부 초기화
    setAccountNo(''); // 계좌 초기화
    setExchangeAmount(''); // 환전 금액 초기화
  };

  return resetValues;
};

export default useResetExchangeValues;
