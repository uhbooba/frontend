import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import { BottomTab } from '@/components/layouts/BottomTab';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  maturityDateAtom,
  selectMoneyAtom,
  selectPeriodAtom,
} from '@/atoms/deposit/depositDataAtoms';
import TopBar from '@/components/layouts/TopBar';
import { getDepositProducts } from '@/services/deposit';
import { ProductData } from '@/types/deposit';
import { selectedDepositProductAtom } from '@/atoms/deposit/depositDataAtoms';
import { depositCalculateInterest } from '@/utils/depositCalculateInterest';

const DepositProduct = () => {
  const navigate = useNavigate();
  const [maturityDate] = useAtom(maturityDateAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [selectedProduct] = useAtom(selectedDepositProductAtom);

  useEffect(() => {
    setIsModalOpen(false);

    const fetchDepositProduct = async () => {
      try {
        const response = await getDepositProducts();
        const product = response?.data?.result[0];
        setProductData({
          accountName: product?.accountName,
          interestRate: product?.interestRate,
        });
      } catch (error) {
        console.log('예금상품 정보가져오는거 에러다.:', error);
      }
    };

    fetchDepositProduct();
  }, [setIsModalOpen]);

  // const calculateInterest = () => {
  //   if (selectedProduct && selectMoney) {
  //     const interestRate = selectedProduct.interestRate / 100;
  //     console.log('이자율', interestRate);
  //     console.log('선택가입금액', selectMoney);
  //     const selectMoneyNumber = Number(selectMoney.replace(/,/g, ''));
  //     console.log('가입금액', selectMoneyNumber);

  //     const interest = selectMoneyNumber * interestRate;
  //     console.log('이자', interest);

  //     const totalAmount = selectMoneyNumber + interest;

  //     return { interest, totalAmount };
  //   }
  //   return { interest: 0, totalAmount: 0 };
  // };

  const { interest, totalAmount } = depositCalculateInterest(
    selectMoney,
    selectedProduct?.interestRate,
  );

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/deposit/password');
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
        <TopBar title='예금 가입' />
      </div>

      <div className='mb-6 mt-20'>
        <LevelBar currentLevel={4} totalLevel={5} />
      </div>
      <div className='p-4'>
        <div className='text-3xl font-bold'>가입 상품 안내</div>

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
          <div className='grid grid-cols-2 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>약정 기간</span>
              <div className='mt-2 text-xl font-bold'>{selectPeriod}</div>
            </div>
            <div>
              <span className='text-2xl text-gray-500'>만기일</span>
              <div className='mt-2 text-xl font-bold'>{maturityDate}</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-2 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>최소 금액</span>
              <div className='mt-2 text-xl font-bold'>
                {selectedProduct ? selectedProduct.minimumAmount : '정보 없음'}{' '}
                원
              </div>
            </div>

            <div>
              <span className='text-2xl text-gray-500'>가입금액</span>
              <div className='mt-2 text-xl font-bold'>{selectMoney} 원</div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <div className='grid grid-cols-2 text-start'>
            <div>
              <span className='text-2xl text-gray-500'>연 이자율</span>
              <div className='mt-2 text-xl font-bold'>
                {/* {productData ? productData.interestRate : '이자 정보 없음'} */}
                {selectedProduct
                  ? `${selectedProduct.interestRate} %`
                  : '이자 정보 없음'}
              </div>
            </div>

            <div>
              <span className='text-2xl text-gray-500'>예상 이자</span>
              <div className='mt-2 text-xl font-bold'>
                {interest.toLocaleString()} 원
              </div>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-300 py-4'>
          <span className='text-2xl text-gray-500'>예상 금액</span>
          <div className='mt-2 text-xl font-bold'>
            {totalAmount.toLocaleString()} 원
          </div>
        </div>

        <div className='mb-2 flex w-full items-center justify-center p-4'>
          <Button
            label='이전'
            size='medium'
            color='orange'
            onClick={GoBack}
            className='mr-2'
          />
          <Button
            label='가입하기'
            size='medium'
            color='green'
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
          title='가입 확인'
          description='정말로 상품에 가입하시겠습니까?'
          imageSrc='/assets/icons/warning.png'
        />
      </div>
    </div>
  );
};

export default DepositProduct;
