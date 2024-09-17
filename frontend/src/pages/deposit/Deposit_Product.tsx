import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';

const DepositProduct = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/password');
  };

  return (
    <div className="p-4">
      <XTopBar title="예금 가입" />

      <div className="mt-4 mb-6">
        <LevelBar currentLevel={4} totalLevel={5} />
      </div>

      <div className="pb-4 text-3xl font-bold">
        가입 상품 안내
      </div>

      <div className="border-b border-gray-300 py-4 text-2xl">
        <span className="text-gray-500">상품명</span>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-xl">정기예금 2번 상품</span>
        </div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <div className="grid grid-cols-3 text-start">
          <div>
            <span className="text-gray-500 text-2xl">연 이자율</span>
            <div className="font-bold mt-2 text-xl">10%</div>
          </div>
          <div>
            <span className="text-gray-500 text-2xl">최소 금액</span>
            <div className="font-bold mt-2 text-xl">200 만 원</div>
          </div>
          <div>
            <span className="text-gray-500 text-2xl">약정 기간</span>
            <div className="font-bold mt-2 text-xl">24개월</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <span className="text-gray-500 text-2xl">만기일</span>
        <div className="font-bold mt-2 text-xl">2025.09.06</div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <div className="flex">
          <div className="text-left mr-20"> 
            <span className="text-gray-500 text-2xl">가입금액</span>
            <div className="font-bold mt-2 text-xl">200 만원</div>
          </div>
          <div className="text-left"> 
            <span className="text-gray-500 text-2xl">예상 이자</span>
            <div className="font-bold mt-2 text-xl">13만 8,750원</div>
          </div>
        </div>
      </div>


      <div className="border-b border-gray-300 py-4">
        <span className="text-gray-500 text-2xl">예상 금액</span>
        <div className="font-bold text-xl mt-2">242 만 원</div>
      </div>

      <div className="absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4">
        <Button
          label="이전"
          size="medium"
          color="orange"
          onClick={GoBack}
        />
        <Button
          label="가입하기"
          size="medium"
          color="green"
          onClick={GoNext}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositProduct;
