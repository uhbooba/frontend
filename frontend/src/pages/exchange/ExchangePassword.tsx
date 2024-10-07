import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { postExchange } from '@/services/exchange';
import { useAtom } from 'jotai';
import { accountNoAtom, exchangeAmountAtom } from '@/atoms/exchangeAtoms';

const ExchangePassword = () => {
  const navigate = useNavigate();
  const [accountNo] = useAtom(accountNoAtom);
  const [amount] = useAtom(exchangeAmountAtom);

  const passwordComplete = (password: string) => {
    console.log('비밀번호 확인용 :', password);

    fetchExchange(); // 추후 비밀번호 확인 추가 예정
  };

  const fetchExchange = async () => {
    try {
      const response = await postExchange(accountNo, 'USD', amount);
      navigate('/exchange/complete', {
        state: { exchangeResult: response.data?.result },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='환전' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={4} totalLevel={4} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default ExchangePassword;
