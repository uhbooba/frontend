import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import XButton from '@/components/common/buttons/XButton';
import { useNavigate } from 'react-router-dom';
import { TbMessageChatbot } from 'react-icons/tb';
import { postLogout } from '@/services/auth';
import { MdLogout } from 'react-icons/md';

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

  const handleLogout = async () => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    try {
      await postLogout(ACCESS_TOKEN!);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('ACCESS_TOKEN');
      navigate('/login');
    }
  };

  return (
    <div className='fixed left-1/2 top-0 z-10 flex h-20 w-full max-w-[430px] -translate-x-1/2 transform items-center justify-center border-b-2 bg-white py-4'>
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
        <div className='flex w-full justify-between p-6'>
          <div className='flex flex-row items-center justify-center'>
            <img
              src='https://s3.youm.me/uhbooba/icons/pig_face.png'
              alt='로고'
              className='mr-1 h-10 w-12'
            />
            <p className='text-2xl font-bold'>어부바</p>
          </div>
          <div className='flex flex-row items-end justify-center'>
            <div className='flex flex-col items-center'>
              <TbMessageChatbot
                onClick={() => navigate('/education/chatbot')}
                size={32}
                className='mb-2'
              />
              <span>챗봇</span>
            </div>
            <div className='ml-6 flex flex-col items-center'>
              <MdLogout onClick={handleLogout} size={30} className='mb-2' />
              <span>로그아웃</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
