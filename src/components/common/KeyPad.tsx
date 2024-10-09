import React from 'react';
import Button from '@/components/common/buttons/Button';

interface KeypadProps {
  onNumberClick: (num: string) => void;
  onDeleteClick: () => void;
  onConfirmClick: () => void;
}

const Keypad: React.FC<KeypadProps> = ({
  onNumberClick,
  onDeleteClick,
  onConfirmClick,
}) => {
  return (
    <div className='fixed bottom-0 left-0 z-50 w-full max-w-[430px] rounded-t-lg bg-white p-4'>
      <div className='flex justify-end'>
        <button
          className='mb-2 text-2xl font-bold text-gray-600'
          onClick={onConfirmClick}
          type='button'
        >
          닫기
        </button>
      </div>

      {/* 숫자 1~9까지만 3x3 배열로 만들기 */}
      <div className='grid grid-cols-3 gap-4 text-center'>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            className='bg-transparent p-4 text-3xl focus:outline-none'
            onClick={() => onNumberClick(num)}
            type='button'
          >
            {num}
          </button>
        ))}

        {/* 3x3 배열 밑에 지움, 0, 확인 버튼 만들기 */}
        <button
          className='bg-transparent p-4 text-3xl focus:outline-none'
          onClick={onDeleteClick}
          type='button'
        >
          지움
        </button>

        <button
          className='bg-transparent p-4 text-3xl focus:outline-none'
          onClick={() => onNumberClick('0')}
          type='button'
        >
          0
        </button>

        <Button
          label='확인'
          size='small'
          color='orange'
          onClick={onConfirmClick}
          className='text-black'
          type='button'
        />
      </div>
    </div>
  );
};

export default Keypad;
