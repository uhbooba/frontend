import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import MainWrapper from '@/components/layouts/MainWrapper';

const CancelDepositPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancel/deposit/success');
  };

  return (
    <div>
      <TopBar title='예금 중도해지' />
      <MainWrapper>
        <LevelBar currentLevel={2} totalLevel={2} />

        <PasswordInput onComplete={passwordComplete} />
      </MainWrapper>
    </div>
  );
};

export default CancelDepositPassword;
