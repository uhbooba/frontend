import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import {
  selectedSavingsAccountAtom,
  selectedSavingsProductAtom,
} from '@/atoms/savings/savingsDataAtoms';
import TopBar from '@/components/layouts/TopBar';
import { getEarlyTerminationInterest } from '@/services/saving';

const CancelSavingsProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  //   // 사용자가 해지하려고 선택한 계좌정보 가져오기
  const selectedSavingsAccount = useAtomValue(selectedSavingsAccountAtom);
  const selectedProduct = useAtomValue(selectedSavingsProductAtom);

  // api 데이터 상태관리하기
  const [accountName, setAccountName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [depositBalance, setDepositBalance] = useState(0);
  const [earlyTerminationInterest, setEarlyTerminationInterest] = useState<
    number | null
  >(null);
  const [earlyTerminationBalance, setEarlyTerminationBalance] = useState<
    number | null
  >(null);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('');

  useEffect(() => {
    // 선택된 계좌 정보가 있을 때만 상태 설정
    if (selectedSavingsAccount) {
      setAccountName(selectedSavingsAccount.accountName);
      setAccountNo(selectedSavingsAccount.accountNo);
      setDepositBalance(parseInt(selectedSavingsAccount.depositBalance, 10));
      setSubscriptionPeriod(selectedSavingsAccount.subscriptionPeriod);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [selectedSavingsAccount]);

  useEffect(() => {
    if (accountNo) {
      // 중도 해지 시 이자 조회
      const fetchEarlyTerminationInterest = async () => {
        try {
          const response = await getEarlyTerminationInterest(accountNo);
          // console.log('적금 중도 해지 이자 확인', response.data);

          const result = response.data.result;
          setEarlyTerminationInterest(
            parseFloat(result.earlyTerminationInterest),
          );
          setEarlyTerminationBalance(
            parseInt(result.earlyTerminationBalance, 10),
          );
        } catch (error) {
          console.error('getEarlyTerminationInterest 에러', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEarlyTerminationInterest();
    }
  }, [accountNo]);

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/cancel/savings/password');
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
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='적금 중도해지' />
      </div>

      <div className='mb-4 mt-20'>
        <LevelBar currentLevel={1} totalLevel={2} />
      </div>

      <div className='p-4'>
        <div className='border-b border-gray-300 py-4 text-2xl'>
          <span className='text-gray-500'>상품명</span>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold'>
              {accountName || '상품명 정보 없음'}
            </span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>계좌번호</span>
          <div className='mt-2 text-xl font-bold'>
            {accountNo || '계좌번호 정보 없음'}
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-2 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>가입 금액</span>
              <div className='mt-2 text-xl font-bold'>
                {depositBalance
                  ? `${depositBalance.toLocaleString()} 원`
                  : '없음'}
              </div>
            </div>
            <div>
              <span className='ml-3 text-2xl text-gray-500'>약정 기간</span>
              <div className='ml-7 mt-2 text-xl font-bold'>
                {subscriptionPeriod ? `${subscriptionPeriod} 일` : '없음'}
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div>
              <span className='text-2xl text-gray-500'>중도해지 이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {selectedProduct
                  ? `${selectedProduct.earlyInterestRate} %`
                  : '없음'}
              </div>
            </div>
            <div className='ml-12 text-left'>
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

        <div className='mt-4 flex items-center justify-between'>
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

        <div className='fixed bottom-0 left-0 w-full'>
          <BottomTab />
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
    </div>
  );
};

export default CancelSavingsProduct;
