import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import XTopBar from '@/components/layouts/XTopbar';
import { useState } from 'react';

const DepositAccount = () => {
  const navigate = useNavigate();
  const [selectAccount, setSelectAccount] = useState<number | null>(null);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/product');
  };

  const accountClick = (accountId: number) => {
    setSelectAccount(accountId);
  };

  return (
    <div>
      {/* 상단바 */}
      <XTopBar title='예금 가입 - 출금 계좌' />

      <div className='mt-2 mb-12'><LevelBar currentLevel={3} totalLevel={5}/></div>

      <div className="pb-4 pl-4 text-2xl font-bold">
        <span>어떤 계좌에서 출금할까요?</span>
      </div>

      <div className="pb-4 pl-4 text-lg font-bold mt-4">
        <span>출금계좌 선택</span>
      </div>

      <div 
        onClick={() => accountClick(1)} 
        className={`border-2 m-4 p-4 rounded-lg cursor-pointer ${
          selectAccount === 1 ? 'border-blue-400' : ''
        }`}
      >
        <div className="text-base font-bold">자유입출금 계좌 1</div>
        <div className="text-gray-500 text-sm">183-217-673215</div>
        <div className="text-right mt-2">
          <span className='text-gray-400 mr-6'>출금가능금액</span> 
        <span className="text-black font-bold">100,000,000 원</span>
        </div>
      </div>

      <div 
        onClick={() => accountClick(2)} 
        className={`border-2 m-4 p-4 rounded-lg cursor-pointer ${
        selectAccount === 2 ? 'border-blue-400' : ''
        }`}
      >
        <div className="text-base font-bold">자유입출금 계좌 2</div>
        <div className="text-gray-500 text-sm">323-123-215423</div>
        <div className="text-right mt-2">
          <span className='text-gray-400 mr-6'>출금가능금액</span> 
        <span className="text-black font-bold">5,550,000 원</span>
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

      {/* 바텀탭 */}
      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>

    </div>
  );
};

export default DepositAccount;
