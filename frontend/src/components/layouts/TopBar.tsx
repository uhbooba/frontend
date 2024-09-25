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

      {/* 나중에 챗봇이랑 내정보 함수 해당 페이지로 가게 바꿔야함 */}
      {showMainButton && (
        <div className='flex py-5'>
          <div className='absolute left-4 top-6'>
            <p className='text-2xl font-bold'>어부바</p>
          </div>
          <div className='absolute right-20 top-4 flex-col'>
            <TbMessageChatbot onClick={handleGoHome} size={30} />
            <p>챗봇</p>
          </div>
          <div className='absolute right-2 top-4 flex-col'>
            <FaUser onClick={handleGoHome} size={30} className='ml-2' />
            <span>내정보</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
