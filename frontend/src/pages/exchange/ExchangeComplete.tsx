import { useLocation, useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import { useState } from 'react';
import Button from '@/components/common/buttons/Button';
import { useAtom } from 'jotai';
import { accountNoAtom, exchangeAmountAtom } from '@/atoms/exchangeAtoms';

const ExchangeComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exchangeResult } = location.state;
  const [accountNo] = useAtom(accountNoAtom);
  const [amount] = useAtom(exchangeAmountAtom);

  const exchangeData = {
    exchangeAccountNo: exchangeResult?.accountInfo?.accountNo,
    exchangeAmount: exchangeResult?.exchangeCurrency?.amount,
    currencyName: exchangeResult?.exchangeCurrency?.currencyName,
    krwAmount: exchangeResult?.accountInfo?.amount,
    exchangeDate: new Date(),
  };

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
            value={exchangeData.exchangeAccountNo}
            readOnly={true}
            className='mb-5'
          />
          <Input
            label='충전 금액'
            value={`${exchangeData?.exchangeAmount.toLocaleString()}${exchangeData.currencyName}`}
            readOnly={true}
            className='mb-5'
          />
          <Input
            label='원화 금액'
            value={`${Number(exchangeData.krwAmount).toLocaleString()}원`}
            readOnly={true}
            className='mb-5'
          />
          {/* <Input
            label='거래일시'
            value={exchangeData.exchangeDate}
            readOnly={true}
            className='mb-5'
          /> */}
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
