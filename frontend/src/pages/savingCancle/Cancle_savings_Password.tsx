import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import PasswordInput from '@/components/common/PasswordInput'; 

const CancleSavingsPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancle/savings/success');
  };

  return (
    <div>
      <XTopBar title="적금 중도해지" />
  
      <div className="mt-4 mb-12">
        <LevelBar currentLevel={2} totalLevel={2} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default CancleSavingsPassword;
