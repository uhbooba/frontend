import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/buttons/Button';
import LevelBar from '@/components/common/LevelBar';
import { useAtom } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';

const UtilityPayMoney = () => {
  const navigate = useNavigate();

  const [utilityData] = useAtom(utilityDataAtom);

  return (
    <div>
      <TopBar title='공과금 납부' />
      <MainWrapper>
        <LevelBar currentLevel={2} totalLevel={4} />
        <div className='mb-6 mt-4 text-center'>
          <div>
            <div className='mb-3 text-2xl text-gray-600'>
              {utilityData.corporation}
            </div>
            <div className='mb-8 text-4xl font-bold'>
              {utilityData.amount.toLocaleString()}원
            </div>
          </div>
          <div className='mb-4 w-full text-left'>
            <h3 className='mb-2 text-2xl font-bold'>납부 정보 안내</h3>
            <Input
              label='성명'
              value={utilityData.userName}
              readOnly={true}
              className='mb-5'
            />
            <Input
              label='납부 기한'
              value={utilityData.dueDate}
              readOnly={true}
              className='mb-5'
            />
          </div>
          <div>
            <Button
              label='납부하기'
              onClick={() => navigate('/utility/account')}
            />
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default UtilityPayMoney;
