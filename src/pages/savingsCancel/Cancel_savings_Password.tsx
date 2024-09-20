import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';

const CancelSavingsPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancel/savings/success');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar
          title='적금 중도해지'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      <div className='mt-20'>
        <LevelBar currentLevel={2} totalLevel={2} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default CancelSavingsPassword;
