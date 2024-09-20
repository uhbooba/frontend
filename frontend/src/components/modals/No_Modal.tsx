import React from 'react';
import Button from '@/components/common/buttons/Button';

interface ModalProps {
  isOpen: boolean;
  ModalClose: () => void;
  title: React.ReactNode;
  description: React.ReactNode;
  imageSrc: string;
}

const NoModal: React.FC<ModalProps> = ({
  isOpen,
  ModalClose,
  title,
  description,
  imageSrc,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='m-4 w-full max-w-sm rounded-xl bg-white p-8 pt-2 shadow-lg'>
        <div className='mb-4 ml-4 flex items-center justify-center pr-8'>
          {imageSrc && <img src={imageSrc} alt='Icon' className='h-24 w-24' />}
          <h2 className='whitespace-nowrap text-3xl font-bold'>{title}</h2>
        </div>
        <p className='mb-12 whitespace-nowrap text-left text-xl'>
          {description}
        </p>
        <div className='flex justify-between space-x-4'>
          <Button
            label='확인'
            size='medium'
            color='orange'
            onClick={ModalClose}
            className='flex-1'
          />
        </div>
      </div>
    </div>
  );
};

export default NoModal;
