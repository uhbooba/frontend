import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';
import { getUserInfo, checkPassword } from '@/services/auth';
import { useState } from 'react';
import NoModal from '@/components/modals/NoModal';

const CancelSavingsPassword = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0); // PasswordInput 리렌더링을 위한 고유 키값 설정

  const passwordComplete = async (password: string) => {
    try {
      const userInfo = await getUserInfo();
      const userId = userInfo.result.id;

      // 비밀번호 확인 api 요청
      const isPasswordCorrect = await checkPassword(userId, password);

      if (isPasswordCorrect) {
        navigate('/cancel/savings/success');
      } else {
        // 비밀번호가 틀리면 모달 표시
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputKey((prevKey) => prevKey + 1); // PasswordInput 컴포넌트 리렌더링 시키기
  };

  return (
    <div>
      <TopBar title='적금 중도해지' />
      <MainWrapper>
        <div className='mt-20'>
          <LevelBar currentLevel={2} totalLevel={2} />
        </div>

        <PasswordInput onComplete={passwordComplete} key={inputKey} />

        <NoModal
          isOpen={isModalOpen}
          ModalClose={closeModal}
          imageSrc='/assets/icons/warning.png'
          title='비밀번호 오류'
          description='비밀번호가 틀립니다.'
        />
      </MainWrapper>
    </div>
  );
};

export default CancelSavingsPassword;
