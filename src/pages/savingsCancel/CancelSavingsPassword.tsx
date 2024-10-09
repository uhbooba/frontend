import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

const CancelSavingsPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancel/savings/success');
  };

  return (
    <div>
      <TopBar title='적금 중도해지' />
      <MainWrapper>
        <div className='mt-20'>
          <LevelBar currentLevel={2} totalLevel={2} />
        </div>

        <PasswordInput onComplete={passwordComplete} />
      </MainWrapper>
    </div>
  );
};

export default CancelSavingsPassword;
