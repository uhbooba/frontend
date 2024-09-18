import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import BigModal from '@/components/modals/Big_Modal';
import { useAtom } from 'jotai';
import { isModalOpenAtom } from '@/atoms/deposit/depositCancleProduct';
import { useEffect } from 'react';


const CancleDepositProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);

  useEffect(() => {
    setIsModalOpen(false);
  },[setIsModalOpen])

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/cancle/deposit/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <XTopBar title="예금 중도해지" />

      <div className="mt-4 mb-6">
        <LevelBar currentLevel={1} totalLevel={2} />
      </div>
      <div className='p-4'>
      <div className="border-b border-gray-300 py-4 text-2xl">
        <span className="text-gray-500">상품명</span>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-xl">정기예금 2번 상품</span>
        </div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <span className="text-gray-500 text-2xl">계좌번호</span>
        <div className="font-bold mt-2 text-xl">111-222-333333</div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <div className="grid grid-cols-3 text-start">
          <div>
            <span className="text-gray-500 text-2xl">연 이자율</span>
            <div className="font-bold mt-2 text-xl">10%</div>
          </div>
          <div>
            <span className="text-gray-500 text-2xl">가입 금액</span>
            <div className="font-bold mt-2 text-xl">200 만 원</div>
          </div>
          <div>
            <span className="text-gray-500 text-2xl">약정 기간</span>
            <div className="font-bold mt-2 text-xl">24개월</div>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-300 py-4">
        <div className="flex">
          <div> 
            <span className="text-gray-500 text-2xl">중도해지 이자율</span>
            <div className="font-bold mt-2 text-xl">1%</div>
          </div>
          <div className="text-left ml-12"> 
            <span className="text-gray-500 text-2xl">이자 금액</span>
            <div className="font-bold mt-2 text-xl">13만 8,750원</div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 py-4">
        <span className="text-gray-500 text-2xl">받을 금액</span>
        <div className="font-bold text-xl mt-2">213 만 8,750원</div>
      </div>

      <div className="absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4">
        <Button
          label="이전"
          size="medium"
          color="orange"
          onClick={GoBack}
        />
        <Button
          label="해지하기"
          size="medium"
          color="red"
          onClick={openModal}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <BottomTab />
      </div>

      <BigModal
        isOpen={isModalOpen}
        ModalClose={closeModal} 
        GoNext={GoNext} 
        title="중도 해지"
        description="정말로 해지하시겠습니까?"
        imageSrc="/assets/icons/warning.png"
      />

    </div>
    </div>
  );
};

export default CancleDepositProduct;
