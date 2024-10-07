import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { depositPasswordAtom } from '@/atoms/deposit/depositDataAtoms';
import { useAtom } from 'jotai';

const DepositPassword = () => {
  const navigate = useNavigate();
  const [, setDepositPassword] = useAtom(depositPasswordAtom);

  const passwordComplete = (password: string) => {
    setDepositPassword(password);
    console.log('패스워드 확인', password);
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
