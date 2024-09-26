import { useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import Button from '@/components/common/buttons/Button';

const ExchangeComplete = () => {
  const navigate = useNavigate();

  const [ExchangeData] = useState({
    exchangeAdress: '000-1111-111111',
    exchangeAmount: 13,
    krwAmount: 6500,
    exchangeDate: '2024/09/07',
  });

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='환전' />
      </div>
      <div className='mb-6 mt-20'>
        <div className='mb-8 text-3xl font-bold'>
          <span>환전 내역</span>
        </div>
        <div>
          <Input
            label='출금 계좌'
            value={ExchangeData.exchangeAdress}
            readOnly={true}
            className='mb-5'
          />
          <Input
            label='충전 금액'
            value={`${ExchangeData.exchangeAmount.toLocaleString()}달러`}
            readOnly={true}
            className='mb-5'
          />
          <Input
            label='원화 금액'
            value={`${ExchangeData.krwAmount.toLocaleString()}원`}
            readOnly={true}
            className='mb-5'
          />
          <Input
            label='거래일시'
            value={ExchangeData.exchangeDate}
            readOnly={true}
            className='mb-5'
          />
        </div>
        <div>
          <Button
            label='확인했어요'
            onClick={() => navigate('/exchange/success')}
          />
        </div>
      </div>
    </div>
  );
};

export default ExchangeComplete;
