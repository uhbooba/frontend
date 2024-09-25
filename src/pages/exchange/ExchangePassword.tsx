import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';

const ExchangePassword = () => {
  const navigate = useNavigate();

  const passwordComplete = (password: string[]) => {
    console.log('비밀번호 확인용 :', password.join(''));
    navigate('/exchange/complete');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='환전' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={3} totalLevel={3} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default ExchangePassword;
