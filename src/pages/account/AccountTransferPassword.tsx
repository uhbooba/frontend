import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';

const AccountTransferPassword = () => {
  const navigate = useNavigate();

  const passwordComplete = (password: string) => {
    console.log('비밀번호 확인용 :', password);
    navigate('/account/transfer/success');
  };

  return (
    <div>
      <div className='fixed left-0 top-0 z-10 w-full'>
        <TopBar title='계좌 이체' showXButton={false} />
      </div>

      <div className='mb-2 mt-20'>
        <LevelBar currentLevel={5} totalLevel={5} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default AccountTransferPassword;
