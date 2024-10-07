import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { getMissionClearStatus } from '@/services/mission';
import { savingPasswordAtom } from '@/atoms/savings/savingsDataAtoms';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { getUserInfo, checkPassword } from '@/services/auth';
import NoModal from '@/components/modals/NoModal';

const Savingspassword = () => {
  const navigate = useNavigate();
  const [, setSavingPassword] = useAtom(savingPasswordAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputKey, setInputKey] = useState(0); // PasswordInput 리렌더링을 위한 고유 키값

  const passwordComplete = async (password: string) => {
    try {
      const accessToken = window.localStorage.getItem('ACCESS_TOKEN');

      if (!accessToken) {
        console.error('토큰이 없음.');
        return;
      }

      // 사용자 정보 조회하는 api 부르기
      const userInfo = await getUserInfo(accessToken);
      const userId = userInfo.result.id;
      // 비밀번호 확인 api 부르기
      const isPasswordCorrect = await checkPassword(userId, password);

      if (isPasswordCorrect) {
        // 적금 가입 미션(4단계) 클리어 했는지 확인
        const response = await getMissionClearStatus(4);
        if (response.result === true) {
          // 클리어했으면 SavingsSuccess로 이동 (여긴 그냥 적금가입 성공 페이지)
          setSavingPassword(password); // 비밀번호도 전달
          navigate('/savings/success');
        } else {
          // 아직 미션 클리어 안했으면 SavingsSuccessMission로 이동 (여기는 미션+적금가입 성공페이지)
          setSavingPassword(password); // 비밀번호도 전달
          navigate('/savings/success/mission');
        }
      } else {
        setInputKey((prevKey) => prevKey + 1); // PasswordInput 리렌더링
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('getMissionClearStatus 에러', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 가입' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} key={inputKey} />

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

export default Savingspassword;
