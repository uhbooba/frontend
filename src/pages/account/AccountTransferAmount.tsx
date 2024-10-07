import Button from '@/components/common/buttons/Button';
import { Input } from '@/components/common/Input';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import TopBar from '@/components/layouts/TopBar';
import { useEffect, useState } from 'react';
import MoneyInput from '@/components/common/MoneyInput';
import Keypad from '@/components/common/KeyPad';
import { getUserFreeAccount } from '@/services/account';
import { useAtom } from 'jotai';
import {
  accountHolderNameAtomn,
  depositAccountNoAtom,
  transactionBalanceAtom,
  selectedBankAtom,
} from '@/atoms/account/accountTransferAtoms';

const AccountTransferAmount = () => {
  const navigate = useNavigate();
  const [transactionBalance, setTransactionBalance] = useAtom(
    transactionBalanceAtom,
  );
  const [keyOpen, setKeyOpen] = useState(false);
  const [selectedBank] = useAtom(selectedBankAtom);
  const [depositAccountNo] = useAtom(depositAccountNoAtom);
  const [accountHolderName] = useAtom(accountHolderNameAtomn);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const transactionBalanceLabels = [
    '+1만원',
    '+5만원',
    '+10만원',
    '+100만원',
    '전액',
    '직접 입력',
  ];

  const amountValues = [10000, 50000, 100000, 1000000, balance, 0];

  const GoBack = () => {
    navigate(-1);
  };

  const handleAmountSelect = (index: number) => {
    const selectedAmount = amountValues[index];
    if (selectedAmount > 0) {
      const newTransactionBalance = transactionBalance + selectedAmount;
      if (newTransactionBalance > balance) {
        setErrorMessage('잔액을 초과할 수 없습니다.');
        setTransactionBalance(balance); // 잔액으로 한정
      } else {
        setTransactionBalance(newTransactionBalance);
        setErrorMessage(null); // 오류 메시지 초기화
      }
      setKeyOpen(false);
    } else if (selectedAmount == 0) {
      setTransactionBalance(0);
      setKeyOpen(true);
    } else {
      console.log('전액 처리나 직접 입력 로직을 찾아보자');
    }
  };

  // 키패드 숫자 클릭할 때 함수
  const keyClick = (num: string) => {
    const newTransactionBalance = Number(String(transactionBalance) + num);
    if (newTransactionBalance > balance) {
      setErrorMessage('잔액을 초과할 수 없습니다.');
    } else {
      setTransactionBalance(newTransactionBalance);
      setErrorMessage(null);
    }
  };

  // 키패트 지우기 버튼 클릭할 때 함수
  const handleDelete = () => {
    setTransactionBalance((prev) => Math.floor(prev / 10));
  };

  const setAmountToZero = () => {
    setTransactionBalance(0);
  };

  const handleSubmit = () => {
    if (!transactionBalance) {
      alert('입금할 금액을 선택해주세요.');
      return;
    }
    if (transactionBalance > balance) {
      setErrorMessage('잔액을 초과할 수 없습니다.');
      return;
    }

    navigate('/account/transfer/deposit-name', {
      state: { depositAccountNo, selectedBank },
    });
  };

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const response = await getUserFreeAccount();
        if (response?.data?.result) {
          const account = response.data.result;
          setBalance(account.balance);
        }
      } catch (error) {
        console.error('계좌 정보 API 호출 중 오류 발생:', error);
      }
    };

    fetchAccountBalance();
  }, []);

  return (
    <div className='flex h-screen flex-col'>
      <div className='w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mt-4'>
        <LevelBar currentLevel={2} totalLevel={5} />
      </div>

      <div className='ml-4 mt-4'>
        <div>
          {selectedBank} {depositAccountNo}
        </div>
        {accountHolderName}님께
      </div>

      <div className='ml-4 mr-4 mt-6'>
        <div className='relative'>
          <Input
            label='얼마를 보낼까요?'
            variant='full'
            placeholder='금액을 입력해 주세요.'
            value={`${transactionBalance}원`}
            onChange={(e) => setTransactionBalance(Number(e.target.value))}
            className='pr-20'
          />

          <Button
            label='지우기'
            size='customMedium'
            className='absolute right-2 top-14 -translate-y-1/2 transform'
            onClick={setAmountToZero}
          />
        </div>

        {errorMessage && (
          <div className='mt-2 text-red-500'>{errorMessage}</div>
        )}

        <div className='mt-4'>
          <MoneyInput
            amounts={transactionBalanceLabels}
            onAmountClick={(index) => handleAmountSelect(index)}
            amountBtnColor='None'
          />
        </div>

        <div className='mt-[30vh] w-full'>
          <div className='flex w-full justify-between space-x-4 px-4 pb-4'>
            <Button
              label='이전'
              size='large'
              color='orange'
              className='flex-grow'
              onClick={() => GoBack()}
            />
            <Button
              label='다음'
              size='medium'
              color='orange'
              className='flex-grow'
              onClick={handleSubmit}
            />
          </div>

          {/* 키패드 */}
          {keyOpen && (
            <Keypad
              onNumberClick={keyClick}
              onDeleteClick={handleDelete}
              onConfirmClick={() => setKeyOpen(false)}
            />
          )}

          <div className='fixed bottom-0 left-0 w-full'>
            <BottomTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTransferAmount;
