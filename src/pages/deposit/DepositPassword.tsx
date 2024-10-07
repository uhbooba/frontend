import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { depositPasswordAtom } from '@/atoms/deposit/depositDataAtoms';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { getUserInfo, checkPassword } from '@/services/auth';
import NoModal from '@/components/modals/NoModal';

const DepositPassword = () => {
  const navigate = useNavigate();
  const [, setDepositPassword] = useAtom(depositPasswordAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0); // PasswordInput 리렌더링을 위한 고유 키값 설정

  const passwordComplete = async (password: string) => {
    try {
      const accessToken = window.localStorage.getItem('ACCESS_TOKEN');

      if (!accessToken) {
        console.error('토큰이 없음.');
        return;
      }

      const userInfo = await getUserInfo(accessToken);
      const userId = userInfo.result.id;

      // 빌밀번호 확인 api 요청
      const isPasswordCorrect = await checkPassword(userId, password);

      if (isPasswordCorrect) {
        // 비밀번호가 맞으면 다음 단계로 이동
        setDepositPassword(password);
        navigate('/deposit/success');
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
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='예금 가입' />
      </div>

      <div className='mb-2 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput key={inputKey} onComplete={passwordComplete} />

      <NoModal
        isOpen={isModalOpen}
        ModalClose={closeModal}
        imageSrc='/assets/icons/warning.png'
        title='비밀번호 오류'
        description='비밀번호가 틀립니다.'
      />
    </div>
  );
};

export default DepositPassword;
