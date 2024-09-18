import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import PasswordInput from '@/components/common/PasswordInput'; 

const CancleDepositPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/cancle/deposit/success');
  };

  return (
    <div>
      <XTopBar title="예금 가입 - 비밀번호" />
  
      <div className="mt-4 mb-12">
        <LevelBar currentLevel={2} totalLevel={2} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default CancleDepositPassword;
