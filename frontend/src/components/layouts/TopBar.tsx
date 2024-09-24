import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';

type TopBarProps = {
  title: string;
  showBackButton?: boolean;
  showXButton?: boolean;
  showMainButton?: boolean;
  onXButtonClick?: () => void;
};

const TopBar: React.FC<TopBarProps> = ({
  title,
  showBackButton = true,
  showXButton = true,
  showMainButton = false,
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

      {showMainButton && (
        <div>
          <div className=''>어부바</div>
          <div className=''>
            <TbMessageChatbot onClick={handleGoHome} />
          </div>
          <div className=''>
            <FaUser onClick={handleGoHome} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
