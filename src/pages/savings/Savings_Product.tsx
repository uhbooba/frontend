import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import BigModal from '@/components/modals/Big_Modal';
import { useAtom } from 'jotai';
import { isModalOpenAtom } from '@/atoms/deposit/depositProductAtoms';
import { useEffect } from 'react';

const SavingsProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);

  useEffect(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/savings/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <XTopBar title='적금 가입' />

      <div className='mb-6 mt-2'>
        <LevelBar currentLevel={4} totalLevel={5} />
      </div>

      <div className='p-4'>
        <div className='text-3xl font-bold'>가입 상품 안내</div>

        <div className='border-b border-gray-300 py-4 text-2xl'>
          <span className='text-gray-500'>상품명</span>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold'>정기적금 2번 상품</span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-3 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>이자율</span>
              <div className='mt-2 text-xl font-bold'>5%</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>월 납입액</span>
              <div className='mt-2 text-xl font-bold'>60 만 원</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>약정 기간</span>
              <div className='mt-2 text-xl font-bold'>36개월</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div>
            <span className='text-2xl text-gray-500'>만기일</span>
            <div className='mt-2 text-xl font-bold'>2025.09.06</div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div>
              <span className='text-2xl text-gray-500'>원금</span>
              <div className='mt-2 text-xl font-bold'>2,160만 원</div>
            </div>
            <div className='ml-12 text-left'>
              <span className='text-2xl text-gray-500'>예상 이자</span>
              <div className='mt-2 text-xl font-bold'>13만 8,750원</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>예상 금액</span>
          <div className='mt-2 text-xl font-bold'>2,173만 8,750원</div>
        </div>

        <div className='absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4'>
          <Button label='이전' size='medium' color='orange' onClick={GoBack} />
          <Button
            label='가입하기'
            size='medium'
            color='green'
            onClick={openModal}
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

export default SavingsProduct;
