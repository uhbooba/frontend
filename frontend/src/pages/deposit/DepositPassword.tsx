import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';

const DepositPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = () => {
    navigate('/deposit/success');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='예금 가입' />
      </div>

      <div className='mb-2 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default DepositPassword;
