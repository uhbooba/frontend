import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import MoneyInput from '@/components/common/MoneyInput';
import { Input } from '@/components/common/Input';
import PeriodInput from '@/components/common/PeriodInput';
import NoModal from '@/components/modals/NoModal';
import LevelBar from '@/components/common/LevelBar';
import Keypad from '@/components/common/KeyPad';
import { useAtom } from 'jotai';
import {
  selectMoneyAtom,
  selectPeriodAtom,
  maturityDateAtom,
} from '@/atoms/deposit/depositDataAtoms';
import { useEffect, useState } from 'react';
import { calculateMaturityDate } from '@/utils/dateUtil';
import TopBar from '@/components/layouts/TopBar';
import { getUserFreeAccount } from '@/services/account';
import MainWrapper from '@/components/layouts/MainWrapper';

const DepositMoney = () => {
  const navigate = useNavigate();

  const [selectMoney, setSelectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod, setSelectPeriod] = useAtom(selectPeriodAtom);
  const [maturityDate, setMaturityDate] = useAtom(maturityDateAtom);
  const [keyOpen, setKeyOpen] = useState(false);
  const [amountBtnColor, setAmountBtnColor] = useState('');
  const [periodBtnColor, setPeriodBtnColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userBalance, setUserBalance] = useState(0); // 계좌 잔액 확인 상태

  useEffect(() => {
    resetState();
  }, []);

  // 사용자 수시입출금 계좌 잔액 조회 api 호출하는거
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const response = await getUserFreeAccount();
        if (response?.data?.result) {
          setUserBalance(response.data.result.balance);
        }
      } catch (error) {
        console.error('getUserFreeAccount 에러', error);
      }
    };

    fetchUserBalance();
  }, []);

  const resetState = () => {
    setSelectMoney('');
    setSelectPeriod('');
    setKeyOpen(false);
    setAmountBtnColor('');
    setPeriodBtnColor('');
    setIsModalOpen(false);
  };

  // 금액과 기간 선택 시 만기일 업데이트
  useEffect(() => {
    if (selectPeriod) {
      const calculatedMaturityDate = calculateMaturityDate(selectPeriod);
      setMaturityDate(calculatedMaturityDate); // maturityDateAtom에 저장
    }
  }, [selectPeriod, setMaturityDate]);

  // 뒤로가기
  const GoBack = () => {
    navigate(-1);
  };

  // 다음 페이지 가기
  const GoNext = () => {
    // 금액과 기간 선택 여부 확인
    if (!selectMoney || !selectPeriod) {
      setIsModalOpen(true); // 금액, 기간 전부 고르지 않으면 모달 뜨게하기
    } else {
      const selectedAmount = parseInt(selectMoney.replace(/,/g, ''), 10);
      if (selectedAmount > userBalance) {
        // 선택금액보다 사용자 계좌 잔액이 부족하면 모달 뜨게 하기
        setIsModalOpen(true);
      } else {
        navigate('/deposit/account');
      }
    }
  };

  // 모달 닫기 함수
  const ModalClose = () => {
    setIsModalOpen(false);
  };

  // 얼마로 시작할까요? 버튼 클릭 함수
  const amountClick = (index: number, amount: string) => {
    console.log(index);
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
  const periods = ['3개월', '6개월', '12개월'];

  // 금액과 기간 선택 시 만기일 업데이트
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
      <TopBar title='예금 가입' />

      <MainWrapper>
        <LevelBar currentLevel={3} totalLevel={5} />

        <div>
          <div className='pb-4 pl-4 text-3xl font-bold'>
            <span>얼마로 시작할까요?</span>
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

        <div className='mt-8 flex w-full items-center justify-between p-4'>
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

        <NoModal
          isOpen={isModalOpen}
          ModalClose={ModalClose}
          imageSrc='/assets/icons/warning.png'
          title={
            selectMoney &&
            userBalance < parseInt(selectMoney.replace(/,/g, ''), 10)
              ? '잔액 부족'
              : '선택하지 않았어요!'
          }
          description={
            selectMoney &&
            userBalance < parseInt(selectMoney.replace(/,/g, ''), 10)
              ? '계좌에 잔액이 부족합니다.'
              : '금액과 기간을 모두 선택해주세요.'
          }
        />
      </MainWrapper>
    </div>
  );
};

export default DepositMoney;
