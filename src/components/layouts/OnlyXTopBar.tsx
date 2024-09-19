import React from 'react';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';

type XTopBarProps = {
  title: string;
};

const OnlyXTopBar: React.FC<XTopBarProps> = ({ title }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='flex items-center justify-between border-b-4 bg-white py-4'>
      
      <span className='absolute left-1/2 -translate-x-1/2 transform text-xl font-bold'>
        {title}
      </span>
      <XButton className='ml-auto mr-4' onClick={handleGoHome} /> {/* ml-auto 추가 */}
    </div>
  );
};

export default OnlyXTopBar;
