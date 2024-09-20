import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';

type XTopBarProps = {
  title: string;
};

const XTopBar: React.FC<XTopBarProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='flex items-center justify-between border-b-4 bg-white py-4'>
      <BackButton className='ml-4' />
      <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
        {title}
      </span>
      <XButton className='mr-4' onClick={handleGoHome} />
    </div>
  );
};

export default XTopBar;
