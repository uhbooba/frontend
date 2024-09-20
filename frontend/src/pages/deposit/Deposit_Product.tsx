import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/Big_Modal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  maturityDateAtom,
  selectMoneyAtom,
  selectPeriodAtom,
} from '@/atoms/deposit/depositDataAtoms';
import TotalTopBar from '@/components/layouts/TotalTopBar';

const DepositProduct = () => {
  const navigate = useNavigate();
  const [maturityDate] = useAtom(maturityDateAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className=''>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TotalTopBar
          title='예금 가입'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      <div className='mb-6 mt-20'>
        <LevelBar currentLevel={4} totalLevel={5} />
      </div>
      <div className='p-4'>
        <div className='pb-4 text-3xl font-bold'>가입 상품 안내</div>

        <div className='border-b border-gray-300 py-4 text-2xl'>
          <span className='text-gray-500'>상품명</span>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold'>정기예금 2번 상품</span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-3 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>연 이자율</span>
              <div className='mt-2 text-xl font-bold'>10%</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>최소 금액</span>
              <div className='mt-2 text-xl font-bold'>20 만 원</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>약정 기간</span>
              <div className='mt-2 text-xl font-bold'>{selectPeriod}</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>만기일</span>
          <div className='mt-2 text-xl font-bold'>{maturityDate}</div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div className='mr-20 text-left'>
              <span className='text-2xl text-gray-500'>가입금액</span>
              <div className='mt-2 text-xl font-bold'>{selectMoney} 원</div>
            </div>
            <div className='text-left'>
              <span className='text-2xl text-gray-500'>예상 이자</span>
              <div className='mt-2 text-xl font-bold'>13만 8,750원</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>예상 금액</span>
          <div className='mt-2 text-xl font-bold'>242 만 원</div>
        </div>

        <div className='mb-2 mt-8 flex w-full items-center justify-between'>
          <Button
            label='이전'
            size='medium'
            color='orange'
            onClick={GoBack}
            className='mr-2'
          />
          <Button
            label='가입하기'
            size='medium'
            color='green'
            onClick={openModal}
            className='ml-2'
          />
        </div>

        <div className='fixed bottom-0 left-0 w-full'>
          <BottomTab />
        </div>

        <BigModal
          isOpen={isModalOpen}
          ModalClose={closeModal}
          GoNext={GoNext}
          title='가입 확인'
          description='정말로 상품에 가입하시겠습니까?'
          imageSrc='/assets/icons/warning.png'
        />
      </div>
    </div>
  );
};

export default DepositProduct;
