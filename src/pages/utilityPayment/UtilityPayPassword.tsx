import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import PasswordInput from '@/components/common/PasswordInput';
import TopBar from '@/components/layouts/TopBar';
import { postUtilityPay } from '@/services/utility';
import { useAtom } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';

const UtilityPayPassword = () => {
  const navigate = useNavigate();

  const [utilityData] = useAtom(utilityDataAtom);

  const passwordComplete = (password: string) => {
    console.log('비밀번호 확인용 :', password);
    navigate('/utility/success');

    // 환전 시작
    fetchPayUtility();
  };

  const fetchPayUtility = async () => {
    try {
      await postUtilityPay(utilityData.corporation, utilityData.amount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='공과금 납부' />
      </div>

      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={3} totalLevel={3} />
      </div>

      <PasswordInput onComplete={passwordComplete} />
    </div>
  );
};

export default UtilityPayPassword;
