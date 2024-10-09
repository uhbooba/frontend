import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import TopBar from '@/components/layouts/TopBar';
import { getEarlyTerminationInterest } from '@/services/deposit';
import { useAtomValue } from 'jotai';
import { selectedAccountAtom } from '@/atoms/deposit/depositDataAtoms';
import MainWrapper from '@/components/layouts/MainWrapper';

const CancelDepositProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedAccount = useAtomValue(selectedAccountAtom);
  const [accountName, setAccountName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [depositBalance, setDepositBalance] = useState(0);
  const [interestRate, setInterestRate] = useState<number | null>(null);
  const [earlyTerminationBalance, setEarlyTerminationBalance] = useState<
    number | null
  >(null);
  const [earlyTerminationInterest, setEarlyTerminationInterest] = useState<
    number | null
  >(null);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      setAccountName(selectedAccount.accountName);
      setAccountNo(selectedAccount.accountNo);
      setDepositBalance(parseInt(selectedAccount.depositBalance, 10));
      setSubscriptionPeriod(selectedAccount.subscriptionPeriod);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (accountNo) {
      const fetchEarlyTerminationInterest = async () => {
        try {
          const response = await getEarlyTerminationInterest(accountNo);
          console.log(response.data);

          const result = response.data.result;
          setInterestRate(parseFloat(result.interestRate));
          setEarlyTerminationInterest(
            parseFloat(result.earlyTerminationInterest),
          );
          setEarlyTerminationBalance(
            parseInt(result.earlyTerminationBalance, 10),
          );
        } catch (error) {
          console.error('getEarlyTerminationInterest 에러', error);
        }
      };

      fetchEarlyTerminationInterest();
    } else {
      setLoading(false);
    }
  }, [accountNo]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/cancel/deposit/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <TopBar title='예금 중도해지' />
      <MainWrapper>
        <LevelBar currentLevel={1} totalLevel={2} />
        <div className=''>
          <div className='border-b border-gray-300 py-4 text-2xl'>
            <span className='text-gray-500'>상품명</span>
            <div className='mt-2 flex items-center justify-between'>
              <span className='text-xl font-bold'>
                {accountName || '아직 상품명 정보가 없음'}
              </span>
            </div>
          </div>

          <div className='border-b border-gray-300 py-4'>
            <span className='text-2xl text-gray-500'>계좌번호</span>
            <div className='mt-2 text-xl font-bold'>
              {accountNo || '아직 생성된 예금 계좌 정보가 없음'}
            </div>
          </div>

          <div className='border-b border-gray-300 py-4'>
            <div className='grid grid-cols-2 text-start'>
              <div>
                <span className='text-2xl text-gray-500'>가입 금액</span>
                <div className='mt-2 w-40 text-xl font-bold'>
                  {depositBalance
                    ? `${depositBalance.toLocaleString()} 원`
                    : '아직 없음'}
                </div>
              </div>
              <div>
                <span className='ml-5 text-2xl text-gray-500'>약정 기간</span>
                <div className='ml-5 mt-2 text-xl font-bold'>
                  {subscriptionPeriod} 일
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-300 py-4'>
            <div className='flex'>
              <div>
                <span className='text-2xl text-gray-500'>중도해지 이자율</span>
                <div className='mt-2 text-xl font-bold'>
                  {interestRate !== null ? `${interestRate} %` : '없음'}
                </div>
              </div>
              <div className='ml-6 text-left'>
                <span className='text-2xl text-gray-500'>받을 이자 금액</span>
                <div className='mt-2 text-xl font-bold'>
                  {earlyTerminationInterest !== null
                    ? `${earlyTerminationInterest.toLocaleString()} 원`
                    : '없음'}
                </div>
              </div>
            </div>
          </div>
          <div className='border-b border-gray-300 py-4'>
            <span className='text-2xl text-gray-500'>받을 금액</span>
            <div className='mt-2 text-xl font-bold'>
              {earlyTerminationBalance !== null
                ? `${earlyTerminationBalance.toLocaleString()} 원`
                : '없음'}
            </div>
          </div>

          <div className='mt-8 flex items-center justify-between'>
            <Button
              label='이전'
              size='medium'
              color='orange'
              onClick={GoBack}
              className='mr-2'
            />
            <Button
              label='해지하기'
              size='medium'
              color='red'
              onClick={openModal}
              className='ml-2'
            />
          </div>

          <BigModal
            isOpen={isModalOpen}
            ModalClose={closeModal}
            GoNext={GoNext}
            title='중도 해지'
            description='정말로 해지하시겠습니까?'
            imageSrc='/assets/icons/warning.png'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default CancelDepositProduct;
