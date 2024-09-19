import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import XTopBar from '@/components/layouts/XTopbar';
import PasswordInput from '@/components/common/PasswordInput';

const Savingspassword = () => {
  const navigate = useNavigate();

  const passwordComplete = (password: string[]) => {
    console.log('비밀번호 확인용 :', password.join(''));
    navigate('/savings/success');
  };

  return (
    <div>
      <XTopBar title='적금 가입' />

      <div className='mb-12 mt-2'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default Savingspassword;
