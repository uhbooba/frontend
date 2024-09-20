import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TotalTopBar from '@/components/layouts/TotalTopBar';

const CancelDepositPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancel/deposit/success');
  };

  return (
    <div className='min-h-screen'>
      <div className='fixed left-0 top-0 w-full'>
        <TotalTopBar
          title='예금 중도해지'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={2} totalLevel={2} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default CancelDepositPassword;
