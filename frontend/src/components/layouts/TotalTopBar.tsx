import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';

type TopBarProps = {
  title: string;
  showBackButton?: boolean;
  showXButton?: boolean;
  onXButtonClick?: () => void;
};

const TotalTopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = false,
  showXButton = false,
  onXButtonClick,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className='relative flex items-center justify-center border-b-4 bg-white py-4'>
      {showBackButton && (
        <div className='absolute left-0'>
          <BackButton className='ml-4' />
        </div>
      )}

      <span className='text-xl font-bold'>{title}</span>

      {showXButton && (
        <div className='absolute right-0'>
          <XButton className='mr-4' onClick={onXButtonClick || handleGoHome} />
        </div>
      )}
    </div>
  );
};

export default TotalTopBar;
