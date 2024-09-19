import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import PasswordInput from '@/components/common/PasswordInput';

const CancelSavingsPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancel/savings/success');
  };

  return (
    <div>
      <XTopBar title='적금 중도해지' />

      <div className='mb-12 mt-4'>
        <LevelBar currentLevel={2} totalLevel={2} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default CancelSavingsPassword;
