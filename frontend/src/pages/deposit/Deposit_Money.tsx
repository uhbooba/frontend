import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import MoneyInput from '@/components/common/MoneyInput';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import PeriodInput from '@/components/common/PeriodInput';
import { BottomTab } from '@/components/layouts/BottomTab';
import NoModal from '@/components/modals/No_Modal';  
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';

const DepositMoney = () => {
  const navigate = useNavigate();

  const [selectMoney, setSelectMoney] = useState('');
  const [selectPeriod, setSelectPeriod] = useState('');
  const [keyOpen, setKeyOpen] = useState(false);
  const [amountBtnColor, setAmountBtnColor] = useState('');
  const [periodBtnColor, setperiodBtnColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 뒤로가기
  const GoBack = () => {
    navigate(-1);
  };

  // 다음 페이지 가기
  const GoNext = () => {
    // 금액과 기간 선택 여부 확인
    if (!selectMoney || !selectPeriod) {
      setIsModalOpen(true); // 금애기간 전부 고르지 않으면 모달 뜨게하기
    } else {
      navigate('/deposit/account');
    }
  };

  // 모달 닫기 함수
  const ModalClose = () => {
    setIsModalOpen(false);
  };

  // 얼마로 시작할까요? 버튼 클릭 함수
  const amountClick = (amount: string) => {
    setAmountBtnColor(amount);
    console.log('Amount clicked:', amount);

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
    setperiodBtnColor(period);
    console.log('Period clicked:', period);
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
  const periods = [
    '6개월',
    '12개월',
    '24개월',
    '36개월',
  ];

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

  // 밑에서 나의 만기일에 보여줄 변수 (사용자가 선택한 개월 + 현재날짜 더한 값임))
  const maturityDate = selectPeriod ? calculateMaturityDate(selectPeriod) : '';

  // 금액 직접 입력할 때 천단위 , 넣어주는 함수
  const formatMoney = (value: string) => {
    // 클릭한 금액 버튼 값은 문자열이니까 쉼표 없애고 숫자로 변경
    const numberValue = parseInt(value.replace(/,/g, ''), 10);
    return numberValue.toLocaleString('ko-KR');
  };

  return (
    <div>
      <XTopBar title="예금 가입 - 상품 금액" />

      <div className='mt-2 mb-12'><LevelBar currentLevel={3} totalLevel={5}/></div>

      <div>
        <div className="pb-4 pl-4 text-3xl font-bold">
          <span>얼마로 시작할까요?</span>
        </div>

        <MoneyInput amounts={amounts} onAmountClick={amountClick} amountBtnColor={amountBtnColor} />

        <div className="px-4 relative">
          <Input
            value={selectMoney}
            onChange={(e) => setSelectMoney(formatMoney(e.target.value))}
            placeholder="금액을 입력하세요."
            className="rounded border-2 pl-4 w-full font-bold"
          />
          <span className="absolute right-8 top-1/2 transform -translate-y-1/2 text-black font-bold">원</span>
        </div>
      </div>

      <div>
        <div className="pb-4 pl-4 text-3xl font-bold mt-16">
          <span>언제까지 모아볼까요?</span>
        </div>

        <PeriodInput periods={periods} onPeriodClick={periodClick} periodBtnColor={periodBtnColor} />

        <div className="mt-2 flex justify-between px-4">
          <span className="text-gray-600">나의 만기일</span>
          {selectPeriod && (
            <span className="font-bold">{maturityDate} ({selectPeriod})</span>
          )}
        </div>
      </div>

      <div className="absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4">
        <Button
          label="이전"
          size="medium"
          color="orange"
          onClick={GoBack}
        />
        <Button
          label="다음"
          size="medium"
          color="orange"
          onClick={GoNext} 
        />
      </div>

      {/* 트루일때만 키패드가 열리게 하기 */}
      {keyOpen && (
        <div className="fixed bottom-0 w-full bg-white rounded-t-lg p-4 z-50">
          <div className="flex justify-end">
            <button
              className="text-sm font-bold text-gray-600 mb-2"
              onClick={() => setKeyOpen(false)}
            >
              닫기
            </button>
          </div>

          {/* 숫자 1~9까지만 3x3 배열로 만들기 */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                className="p-4 text-3xl bg-transparent focus:outline-none"
                onClick={() => keyClick(num)}
              >
                {num}
              </button>
            ))}

            {/* 3x3 배열 밑에 지움, 0, 확인 버튼 만들기 */}
            <button
              className="p-4 text-3xl bg-transparent focus:outline-none"
              onClick={handleDelete}
            >
              지움
            </button>

            <button
              className="p-4 text-3xl bg-transparent focus:outline-none"
              onClick={() => keyClick('0')}
            >
              0
            </button>

            <Button
              label="확인"
              size="small"
              color="orange"
              onClick={() => setKeyOpen(false)}
              className="text-black"
            />
          </div>
        </div>
      )}

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>

      {/* 모달 추가 */}
      <NoModal
        isOpen={isModalOpen}
        ModalClose={ModalClose}
        imageSrc='/assets/icons/warning.png'
        title="선택하지 않았어요!"
        description="금액과 기간을 모두 선택해주세요."
      />
    </div>
  );
};

export default DepositMoney;
