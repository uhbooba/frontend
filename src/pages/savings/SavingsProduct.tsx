import Button from '@/components/common/buttons/Button';
import { useNavigate } from 'react-router';
import LevelBar from '@/components/common/LevelBar';
import BigModal from '@/components/modals/BigModal';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  maturityDateAtom,
  selectMoneyAtom,
  selectPeriodAtom,
  checkAtom,
  selectedSavingsProductAtom,
} from '@/atoms/savings/savingsDataAtoms';
import TopBar from '@/components/layouts/TopBar';
import { savingCalculateInterest } from '@/utils/savingCalculateInterest';
import MainWrapper from '@/components/layouts/MainWrapper';

const SavingsProduct = () => {
  const navigate = useNavigate();
  const [maturityDate] = useAtom(maturityDateAtom);
  const [selectMoney] = useAtom(selectMoneyAtom);
  const [selectPeriod] = useAtom(selectPeriodAtom);
  const [check] = useAtom(checkAtom);
  const [selectedProduct] = useAtom(selectedSavingsProductAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const { interest, totalAmount } = savingCalculateInterest(
    selectMoney,
    selectedProduct?.interestRate ?? 0,
    selectPeriod,
  );

  const GoBack = () => {
    navigate(-1);
  };

  const GoNext = () => {
    navigate('/savings/password');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <TopBar title='적금 가입' />
      <MainWrapper>
        <LevelBar currentLevel={4} totalLevel={5} />
        <div className='p-4'>
          <div className='text-3xl font-bold'>가입 상품 안내</div>

          <div className='border-b border-gray-300 py-4 text-2xl'>
            <span className='text-gray-500'>상품명</span>
            <div className='mt-2 flex items-center justify-between'>
              <span className='text-xl font-bold'>
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
                <span className='text-2xl text-gray-500'>월 납입액</span>
                <div className='mt-2 text-xl font-bold'>{selectMoney}원</div>
              </div>
              <div>
                <span className='text-2xl text-gray-500'>만기시 원금</span>
                <div className='mt-2 text-xl font-bold'>
                  {(
                    Number(selectPeriod.replace('개월', '')) *
                    Number(selectMoney.replace(/[^0-9]/g, ''))
                  ).toLocaleString()}{' '}
                  원
                </div>
              </div>
            </div>
          </div>

          <div className='border-b border-gray-300 py-4'>
            <div className='grid grid-cols-2 text-start'>
              <div>
                <span className='text-2xl text-gray-500'>이자율</span>
                <div className='mt-2 text-xl font-bold'>
                  {selectedProduct
                    ? `${selectedProduct.interestRate}%`
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
            <div className='grid grid-cols-2 text-start'>
              <div>
                <span className='text-2xl text-gray-500'>예상 금액</span>
                <div className='mt-2 text-xl font-bold'>
                  {totalAmount.toLocaleString()} 원
                </div>
              </div>
              <div>
                <span className='text-2xl text-gray-500'>자동이체 여부</span>
                <div className='mt-2 text-xl font-bold'>
                  {check === 'yes' ? '사용함' : '사용 안함'}
                </div>
              </div>
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

          <BigModal
            isOpen={isModalOpen}
            ModalClose={closeModal}
            GoNext={GoNext}
            title='가입 확인'
            description='정말로 상품에 가입하시겠습니까?'
            imageSrc='/assets/icons/warning.png'
          />
        </div>
      </MainWrapper>
    </div>
  );
};

export default SavingsProduct;
