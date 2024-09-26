import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import MoneyInput from '@/components/common/MoneyInput';
import { Input } from '@/components/common/Input';
import PeriodInput from '@/components/common/PeriodInput';
import { BottomTab } from '@/components/layouts/BottomTab';
import NoModal from '@/components/modals/No_Modal';
import LevelBar from '@/components/common/LevelBar';
import Keypad from '@/components/common/KeyPad';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  maturityDateAtom,
  selectMoneyAtom,
  selectPeriodAtom,
} from '@/atoms/savings/savingsDataAtoms';
import TopBar from '@/components/layouts/TopBar';

const SavingsMoney = () => {
  const navigate = useNavigate();

  const [selectMoney, setSelectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod, setSelectPeriod] = useAtom(selectPeriodAtom);
  const [maturityDate, setMaturityDate] = useAtom(maturityDateAtom);
  const [keyOpen, setKeyOpen] = useState(false);
  const [amountBtnColor, setAmountBtnColor] = useState('');
  const [periodBtnColor, setPeriodBtnColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    resetState();
  }, []);

  const resetState = () => {
    setSelectMoney('');
    setSelectPeriod('');
    setKeyOpen(false);
    setAmountBtnColor('');
    setPeriodBtnColor('');
    setIsModalOpen(false);
  };

  // 뒤로가기
  const GoBack = () => {
    navigate(-1);
  };

  // 다음 페이지 가기
  const GoNext = () => {
    // 금액과 기간 선택 여부 확인
    if (!selectMoney || !selectPeriod) {
      setIsModalOpen(true); // 금애기간 전부 고르지 않으면 모달 뜨게하기
      console.log(selectPeriod);
    } else {
      navigate('/savings/account');
    }
  };

  // 모달 닫기 함수
  const ModalClose = () => {
    setIsModalOpen(false);
  };

  // 얼마씩 적금할까요? 버튼 클릭 함수
  const amountClick = (index: number, amount: string) => {
    setAmountBtnColor(amount);

    if (amount !== '직접입력') {
      setSelectMoney(formatMoney(amount.replace('원', '')));
      setKeyOpen(false);
    } else {
      setSelectMoney('');
      setKeyOpen(true);
    }
  };

  // 언제까지 모아볼까요? 버튼 클릭 함수
  const periodClick = (period: string) => {
    setPeriodBtnColor(period);
    setSelectPeriod(period);
  };

  // 키패드 숫자 클릭할 때 함수
  const keyClick = (num: string) => {
    setSelectMoney((prev) => formatMoney(prev + num));
  };

  // 키패트 지우기 버튼 클릭할 때 함수
  const handleDelete = () => {
    setSelectMoney((prev) => formatMoney(prev.slice(0, -1)));
  };

  // 금액 버튼 내용값
  const amounts = [
    '10,000원',
    '50,000원',
    '100,000원',
    '500,000원',
    '1,000,000원',
    '직접입력',
  ];

  // 기간 버튼 내용값
  const periods = ['6개월', '12개월', '24개월', '36개월'];

  // 나의 만기일 계산 함수
  const calculateMaturityDate = (months: string) => {
    const currentDate = new Date(); // 현재 날짜 가져오기
    const periodInMonths = parseInt(months.replace('개월', ''), 10); // 선택한 버튼 값 숫자로 변경
    currentDate.setMonth(currentDate.getMonth() + periodInMonths); // 현재날짜 + 선택 개월수

    // 한국식 날짜로 변환하기 (2222년 22월 22일처럼 바꾸는컷)
    return currentDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    if (selectPeriod) {
      const calculatedMaturityDate = calculateMaturityDate(selectPeriod);
      setMaturityDate(calculatedMaturityDate); // maturityDateAtom에 저장
    }
  }, [selectPeriod, setMaturityDate]);

  // 금액 직접 입력할 때 천단위 , 넣어주는 함수
  const formatMoney = (value: string) => {
    // 클릭한 금액 버튼 값은 문자열이니까 쉼표 없애고 숫자로 변경
    const numberValue = parseInt(value.replace(/,/g, ''), 10);
    return numberValue.toLocaleString('ko-KR');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 가입' />
      </div>
      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={3} totalLevel={5} />
      </div>

      <div>
        <div className='pb-4 pl-4 text-3xl font-bold'>
          <span>얼마씩 적금할까요?</span>
        </div>

        <MoneyInput
          amounts={amounts}
          onAmountClick={amountClick}
          amountBtnColor={amountBtnColor}
        />

        <div className='relative px-4'>
          <Input
            value={selectMoney}
            onChange={(e) => setSelectMoney(formatMoney(e.target.value))}
            onClick={() => setKeyOpen(true)}
            placeholder='금액을 입력하세요.'
            className='w-full rounded border-2 pl-4 font-bold'
          />
          <span className='absolute right-8 top-1/2 -translate-y-1/2 transform font-bold text-black'>
            원
          </span>
        </div>
      </div>

      <div>
        <div className='mt-16 pb-4 pl-4 text-3xl font-bold'>
          <span>언제까지 모아볼까요?</span>
        </div>

        <PeriodInput
          periods={periods}
          onPeriodClick={periodClick}
          periodBtnColor={periodBtnColor}
        />

        <div className='mt-2 flex justify-between px-4'>
          <span className='text-gray-600'>나의 만기일</span>
          {selectPeriod && (
            <span className='font-bold'>
              {maturityDate} ({selectPeriod})
            </span>
          )}
        </div>
      </div>

      <div className='mb-20 mt-8 flex w-full items-center justify-center p-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={GoBack}
          className='mr-2'
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={GoNext}
          className='ml-2'
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

      {/* 바텀탭 */}
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>

      {/* 모달 추가 */}
      <NoModal
        isOpen={isModalOpen}
        ModalClose={ModalClose}
        imageSrc='/assets/icons/warning.png'
        title='선택하지 않았어요!'
        description='금액과 기간을 모두 선택해주세요.'
      />
    </div>
  );
};

export default SavingsMoney;
