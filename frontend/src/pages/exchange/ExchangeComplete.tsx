import { useLocation, useNavigate } from 'react-router';
import TopBar from '@/components/layouts/TopBar';
import { Input } from '@/components/common/Input';
import Button from '@/components/common/buttons/Button';
import TitleText from '@/components/common/TitleText';
import MainWrapper from '@/components/layouts/MainWrapper';

const ExchangeComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { exchangeResult } = location.state;

  const exchangeData = {
    exchangeAccountNo: exchangeResult?.accountInfo?.accountNo,
    exchangeAmount: exchangeResult?.exchangeCurrency?.amount,
    currencyName: exchangeResult?.exchangeCurrency?.currencyName,
    krwAmount: exchangeResult?.accountInfo?.amount,
    exchangeDate: new Date(),
  };

  return (
    <div>
      <TopBar title='환전' showBackButton={false} />
      <MainWrapper>
        <TitleText>환전 내역</TitleText>
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
            onClick={() =>
              navigate('/exchange/success', {
                state: { amount: exchangeData?.exchangeAmount },
              })
            }
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default ExchangeComplete;
