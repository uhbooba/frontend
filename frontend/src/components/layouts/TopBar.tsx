import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { TbMessageChatbot } from 'react-icons/tb';

type TopBarProps = {
  title: string | React.ReactNode;
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
    <div className='relative flex items-center justify-center border-b-2 bg-white py-4'>
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
        <div className='flex py-6'>
          <div className='absolute left-3 top-1 flex'>
            {/* <p className='text-2xl font-bold'>어부바</p> */}
            <img
              src='/assets/images/small_logo.png'
              alt='로고'
              className='h-16 w-16'
            ></img>
            <p className='pl-1 pt-4 text-2xl font-bold'>어부바</p>
          </div>
          <div className='absolute right-20 top-3 flex-col'>
            <TbMessageChatbot
              onClick={() => navigate('/chatbot')}
              size={32}
              className='mb-2'
            />
            <p>챗봇</p>
          </div>
          <div className='absolute right-2 top-3.5 flex-col'>
            <FaUser onClick={handleGoHome} size={30} className='mb-2 ml-2' />
            <span>내정보</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
