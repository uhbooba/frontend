import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import {
  // selectAccountAtom,
  selectMoneyAtom,
  selectPeriodAtom,
  selectedDepositProductAtom,
  depositAccountAtom,
} from '@/atoms/deposit/depositDataAtoms';
import { useAtom } from 'jotai';
import TopBar from '@/components/layouts/TopBar';
import {
  getEarlyTerminationInterest,
  getUserDepositAccounts,
} from '@/services/deposit';
import { AccountData, TerminationInterestData } from '@/types/deposit';
import { depositCalculateInterest } from '@/utils/depositCalculateInterest';

const CancelDepositProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);
  // const [selectAccount] = useAtom(selectAccountAtom);
  const [, setAccountData] = useState<AccountData | null>(null);
  const [, setTerminationInterestData] =
    useState<TerminationInterestData | null>(null);
  const [selectedProduct] = useAtom(selectedDepositProductAtom);
  const [depositAccount] = useAtom(depositAccountAtom);

  useEffect(() => {
    setIsModalOpen(false);

    const fetchAccountData = async () => {
      try {
        const response = await getUserDepositAccounts(1);
        const account = response?.data?.result[0]; // 일단 첫번째 0번 계좌로 가져오기
        setAccountData(account);
        const interestResponse = await getEarlyTerminationInterest(
          99,
          account.accountNo,
        );

        setTerminationInterestData(interestResponse.data.result);
      } catch (error) {
        console.error('api 오류났음', error);
      }
    };

    fetchAccountData();
  }, [depositAccount]);

  const { interest, totalAmount } = depositCalculateInterest(
    selectMoney,
    selectedProduct!.earlyInterestRate,
  );

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

  return (
    <div>
      <div className='fixed left-0 top-0 w-full'>
        <TopBar title='예금 중도해지' />
      </div>

      <div className='mb-6 mt-20'>
        <LevelBar currentLevel={1} totalLevel={2} />
      </div>
      <div className='p-4'>
        <div className='border-b border-gray-300 py-4 text-2xl'>
          <span className='text-gray-500'>상품명</span>
          <div className='mt-2 flex items-center justify-between'>
            <span className='text-xl font-bold'>
              {/* {accountData
                ? accountData.accountName
                : '아직 상품명 정보가 없음'} */}
              {selectedProduct
                ? selectedProduct.name
                : '아직 상품명 정보가 없음'}
            </span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>계좌번호</span>
          <div className='mt-2 text-xl font-bold'>
            {/* {accountData ? accountData.accountNo : '아직 계좌번호 정보가 없음'} */}
            {depositAccount
              ? depositAccount.accountNo
              : '아직 생성된 예금 계좌 정보가 없음'}
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-3 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>연 이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {/* {accountData ? accountData.interestRate : '아직 없음'} */}
                {selectedProduct
                  ? `${selectedProduct.interestRate} %`
                  : '아직 없음'}
              </div>
            </div>
            <div className=''>
              <span className='text-2xl text-gray-500'>가입 금액</span>
              <div className='mt-2 w-40 text-xl font-bold'>
                {selectMoney ? `${selectMoney} 원` : '아직 없음'}
              </div>
            </div>
            <div>
              <span className='ml-5 text-2xl text-gray-500'>약정 기간</span>
              <div className='ml-5 mt-2 text-xl font-bold'>
                {selectPeriod ? `${selectPeriod}` : '아직 없음'}
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div>
              <span className='text-2xl text-gray-500'>중도해지 이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {/* {terminationInterestData
                  ? terminationInterestData.earlyTerminationInterest
                  : '아직 없음'} */}
                {selectedProduct
                  ? `${selectedProduct.earlyInterestRate} %`
                  : '없음'}
              </div>
            </div>
            <div className='ml-12 text-left'>
              <span className='text-2xl text-gray-500'>받을 이자 금액</span>
              <div className='mt-2 text-xl font-bold'>
                {interest.toLocaleString()} 원
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>받을 금액</span>
          <div className='mt-2 text-xl font-bold'>
            {totalAmount.toLocaleString()} 원
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

export default CancelDepositProduct;
