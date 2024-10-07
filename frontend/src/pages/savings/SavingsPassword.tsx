import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { getMissionClearStatus } from '@/services/mission';

const Savingspassword = () => {
  const navigate = useNavigate();

  const passwordComplete = async () => {
    try {
      // 적금 가입 미션(4단계) 클리어 했는지 확인
      const response = await getMissionClearStatus(4);
      if (response.result === true) {
        // 클리어했으면 SavingsSuccess로 이동 (여긴 그냥 적금가입 성공 페이지)
        navigate('/savings/success');
      } else {
        // 아직 미션 클리어 안했으면 SavingsSuccessMission로 이동 (여기는 미션+적금가입 성공페이지)
        navigate('/savings/success/mission');
      }
    } catch (error) {
      console.error('getMissionClearStatus 에러', error);
    }
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 가입' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default Savingspassword;
