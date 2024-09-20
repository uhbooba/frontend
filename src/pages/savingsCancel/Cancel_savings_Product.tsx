import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/Big_Modal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  selectAccountAtom,
  selectMoneyAtom,
  selectPeriodAtom,
} from '@/atoms/savings/savingsDataAtoms';
import TotalTopBar from '@/components/layouts/TotalTopBar';

const CancelSavingsProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectAccount] = useAtom(selectAccountAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);

  useEffect(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/cancel/savings/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TotalTopBar
          title='적금 중도해지'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      <div className='mb-4 mt-20'>
        <LevelBar currentLevel={1} totalLevel={2} />
      </div>

      <div className='p-4'>
        <div className='border-b border-gray-300 py-4 text-2xl'>
          <span className='text-gray-500'>상품명</span>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold'>정기적금 2번 상품</span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>계좌번호</span>
          <div className='mt-2 text-xl font-bold'>{selectAccount}</div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-3 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>이자율</span>
              <div className='mt-2 text-xl font-bold'>5%</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>월 납입액</span>
              <div className='mt-2 text-xl font-bold'>{selectMoney}원</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>약정 기간</span>
              <div className='mt-2 text-xl font-bold'>{selectPeriod}</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex space-x-20'>
            <div>
              <span className='text-2xl text-gray-500'>납입 금액</span>
              <div className='mt-2 text-xl font-bold'>660 만 원</div>
            </div>
            <div className=''>
              <span className='text-2xl text-gray-500'>납입 개월</span>
              <div className='mt-2 text-xl font-bold'>11개월</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div>
              <span className='text-2xl text-gray-500'>중도해지 이자율</span>
              <div className='mt-2 text-xl font-bold'>1%</div>
            </div>
            <div className='ml-12 text-left'>
              <span className='text-2xl text-gray-500'>이자 금액</span>
              <div className='mt-2 text-xl font-bold'>2,750원</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>받을 금액</span>
          <div className='mt-2 text-xl font-bold'>660만 2,750원</div>
        </div>

        <div className='mb-2 mt-8 flex items-center justify-between'>
          <Button
            label='이전'
            size='medium'
            color='orange'
            onClick={GoBack}
            className='mr-2'
          />
          <Button
            label='해지하기'
            size='medium'
            color='red'
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
          title='중도 해지'
          description='정말로 해지하시겠습니까?'
          imageSrc='/assets/icons/warning.png'
        />
      </div>
    </div>
  );
};

export default CancelSavingsProduct;
