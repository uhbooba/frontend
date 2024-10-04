import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  selectAccountAtom,
  selectMoneyAtom,
  selectPeriodAtom,
  selectedSavingsProductAtom,
  maturityDateAtom,
} from '@/atoms/savings/savingsDataAtoms';
import TopBar from '@/components/layouts/TopBar';
import {
  getUserSavingsAccounts,
  getEarlyTerminationInterest,
} from '@/services/saving';
import { CancelProductData } from '@/types/saving';
import { savingCalculateInterest } from '@/utils/savingCalculateInterest';
import {
  calculatePaymentMonths,
  calculatePaidAmount,
} from '@/utils/paymentCalculate';

const CancelSavingsProduct = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectAccount] = useAtom(selectAccountAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);
  const [productData, setProductData] = useState<CancelProductData | null>(
    null,
  );
  const [selectedProduct] = useAtom(selectedSavingsProductAtom);
  const [maturityDate] = useAtom(maturityDateAtom);

  useEffect(() => {
    setIsModalOpen(false);

    const fetchProductDetails = async () => {
      try {
        if (selectAccount) {
          const response = await getUserSavingsAccounts(selectAccount);
          if (response?.data?.result?.length > 0) {
            const account = response.data.result[0];
            // 중도해지 이자율 부르는 api
            const earlyTerminationResponse = await getEarlyTerminationInterest(
              selectAccount,
              account.accountNo,
            );

            setProductData({
              accountName: account.accountName,
              accountNo: account.accountNo,
              interestRate: account.interestRate,
              earlyTerminationInterestRate:
                earlyTerminationResponse.data.result.earlyTerminationInterest,
            });
          } else {
            console.error('해당 계좌의 적금 상품 정보를 가져올 수 없습니다.');
          }
        }
      } catch (error) {
        console.error('적금 계좌 정보 가져오는 중 에러 발생:', error);
      }
    };

    fetchProductDetails();
  }, [selectAccount]);

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

  const paymentMonths = calculatePaymentMonths(maturityDate, selectPeriod);

  const paidAmount = calculatePaidAmount(paymentMonths, selectMoney);

  const { interest, totalAmount } = savingCalculateInterest(
    selectMoney,
    selectedProduct!.earlyInterestRate,
    String(paymentMonths),
  );

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
              {/* {productData ? productData.accountName : '상품명 정보 없음'} */}
              {selectedProduct ? selectedProduct.name : '상품명 정보 없음'}
            </span>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>계좌번호</span>
          <div className='mt-2 text-xl font-bold'>
            {productData ? productData.accountNo : '계좌번호 정보 없음'}
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-3 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {/* {productData ? productData.interestRate : '정보 없음'} */}
                {selectedProduct
                  ? `${selectedProduct.interestRate}%`
                  : '이자 정보 없음'}
              </div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>월 납입액</span>
              <div className='mt-2 text-xl font-bold'>{selectMoney}원</div>
            </div>
            <div>
              <span className='ml-3 text-2xl text-gray-500'>약정 기간</span>
              <div className='ml-7 mt-2 text-xl font-bold'>{selectPeriod}</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex space-x-20'>
            <div>
              <span className='text-2xl text-gray-500'>납입 금액</span>
              <div className='mt-2 text-xl font-bold'>{paidAmount} 원</div>
            </div>
            <div className=''>
              <span className='text-2xl text-gray-500'>납입 개월</span>
              <div className='mt-2 text-xl font-bold'>{paymentMonths}개월</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='flex'>
            <div>
              <span className='text-2xl text-gray-500'>중도해지 이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {/* {productData
                  ? productData.earlyTerminationInterestRate
                  : '정보 없음'} */}
                {selectedProduct
                  ? `${selectedProduct.earlyInterestRate} %`
                  : '없음'}
              </div>
            </div>
            <div className='ml-12 text-left'>
              <span className='text-2xl text-gray-500'>이자 금액</span>
              <div className='mt-2 text-xl font-bold'>
                {interest.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>받을 금액</span>
          <div className='mt-2 text-xl font-bold'>
            {totalAmount.toLocaleString()}원
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
