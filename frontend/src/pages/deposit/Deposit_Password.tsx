import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TotalTopBar from '@/components/layouts/TotalTopBar';

const DepositPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = (password: string[]) => {
    console.log('비밀번호 확인용 :', password.join(''));
    navigate('/deposit/success');
  };

  return (
    <div className='min-h-screen'>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TotalTopBar
          title='예금 가입'
          showBackButton={true}
          showXButton={true}
        />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default DepositPassword;
