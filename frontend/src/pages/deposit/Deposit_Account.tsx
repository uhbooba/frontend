import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import { BottomTab } from '@/components/layouts/BottomTab';
import XTopBar from '@/components/layouts/XTopbar';
import NoModal from '@/components/modals/No_Modal';
import clsx from 'clsx';
import { useAtom } from 'jotai';
import { selectAccountAtom } from '@/atoms/deposit/depositDataAtoms';
import { useEffect, useState } from 'react';

const DepositAccount = () => {
  const navigate = useNavigate();
  const [selectAccount, setSelectAccount] = useAtom(selectAccountAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSelectAccount(null);
    setIsModalOpen(false);
  }, [setSelectAccount, setIsModalOpen]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    if (selectAccount === null) {
      setIsModalOpen(true);
    } else {
      navigate('/deposit/product');
    }
  };

  const accountClick = (accountId: number) => {
    setSelectAccount(accountId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <XTopBar title='예금 가입' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={3} totalLevel={5} />
      </div>

      <div className='pb-4 pl-4 text-2xl font-bold'>
        <span>어떤 계좌에서 출금할까요?</span>
      </div>

      <div className='mt-4 pb-4 pl-4 text-lg font-bold'>
        <span>출금계좌 선택</span>
      </div>

      <div
        onClick={() => accountClick(1)}
        className={clsx(
          'm-4 cursor-pointer rounded-lg border-2 p-4',
          selectAccount === 1
            ? 'border-blue-400 text-blue-400'
            : 'border-gray-200',
        )}
      >
        <div className='text-base font-bold'>자유입출금 계좌 1</div>
        <div className='text-sm text-gray-500'>183-217-673215</div>
        <div className='mt-2 text-right'>
          <span className='mr-6 text-gray-400'>출금가능금액</span>
          <span className='font-bold text-black'>100,000,000 원</span>
        </div>
      </div>

      <div
        onClick={() => accountClick(2)}
        className={clsx(
          'm-4 cursor-pointer rounded-lg border-2 p-4',
          selectAccount === 2
            ? 'border-blue-400 text-blue-400'
            : 'border-gray-200',
        )}
      >
        <div className='text-base font-bold'>자유입출금 계좌 2</div>
        <div className='text-sm text-gray-500'>323-123-215423</div>
        <div className='mt-2 text-right'>
          <span className='mr-6 text-gray-400'>출금가능금액</span>
          <span className='font-bold text-black'>5,550,000 원</span>
        </div>
      </div>

      <div className='absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4'>
        <Button label='이전' size='medium' color='orange' onClick={GoBack} />
        <Button label='다음' size='medium' color='orange' onClick={GoNext} />
      </div>

      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>

      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        title='계좌 선택'
        description='출금할 계좌를 선택해주세요.'
        imageSrc='/assets/icons/warning.png'
      />
    </div>
  );
};

export default DepositAccount;
