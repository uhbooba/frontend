import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/buttons/Button';
import LevelBar from '@/components/common/LevelBar';
import { useAtom } from 'jotai';
import { utilityDataAtom } from '@/atoms/utilityAtoms';

const UtilityPayMoney = () => {
  const navigate = useNavigate();

  const [utilityData] = useAtom(utilityDataAtom);

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='공과금 납부' />
      </div>
      <div className='mb-12 mt-20'>
        <LevelBar currentLevel={2} totalLevel={3} />
      </div>
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
            onClick={() => navigate('/utility/password')}
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityPayMoney;
