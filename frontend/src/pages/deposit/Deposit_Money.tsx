import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { BottomTab } from '@/components/layouts/BottomTab';
// import { Input } from '@/components/common/Input';
import MoneyInput from '@/components/common/MoneyInput';

const DepositMoney = () => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/account');
  };

  // 상품에 따른 금액 설정
  const amounts = [
    '10,000원',
    '50,000원',
    '100,000원',
    '500,000원',
    '1,000,000원',
    '직접입력',
  ];

  return (
    <div>
      {/* 상단바 */}
      <TopBar title='예금 가입3 - 상품 금액' />

      <div className='mb-6 mt-4 bg-gray-400 py-4 text-center'>단계표시바</div>

      <div>
        <MoneyInput amounts={amounts} />
      </div>

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
