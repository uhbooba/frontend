import React from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import Button from '@/components/common/buttons/Button';

interface ExchangeConfirmProps {
  usdAmount: string;
  krwAmount: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

const ExchangeConfirm: React.FC<ExchangeConfirmProps> = ({
  usdAmount,
  krwAmount,
  onConfirm,
  onCancel,
  isOpen,
}) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onCancel}>
      <div className='w-full space-y-4'>
        <h2 className='text-center text-xl font-bold'>환전하시겠습니까?</h2>
        <div className='space-y-2'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>미국 USD</span>
            <span className='font-semibold'>
              {Number(usdAmount).toLocaleString()} 달러
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>한국 KRW</span>
            <span className='font-semibold'>
              {Number(krwAmount).toLocaleString()}원
            </span>
          </div>
        </div>
        <div className='flex space-x-4 pt-4'>
          <Button label='취소' size='medium' color='white' onClick={onCancel} />
          <Button
            label='환전하기'
            size='medium'
            color='orange'
            onClick={onConfirm}
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default ExchangeConfirm;
