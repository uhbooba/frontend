import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';

const DepositMoney = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/account');
  };

  return (
    <div>
      {/* 상단바 */}
      <TopBar title='예금 가입3 - 상품 금액' />

      <div className='mb-6 mt-4 bg-gray-400 py-4 text-center'>단계표시바</div>

      <div> 여기에 내용 넣어야 함</div>

      <div className='absolute bottom-24 left-0 flex w-full justify-between space-x-4 px-4'>
        <Button
          label='이전'
          size='medium'
          color='orange'
          onClick={() => GoBack()}
        />
        <Button
          label='다음'
          size='medium'
          color='orange'
          onClick={() => GoNext()}
        />
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <BottomTab />
      </div>
    </div>
  );
};

export default DepositMoney;
