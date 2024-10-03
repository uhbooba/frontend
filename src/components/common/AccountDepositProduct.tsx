import React from 'react';
import { useNavigate } from 'react-router';

type AccountDepositProductProps = {
  name: string;
  interestRate: number;
  minimumAmount: number;
  minimumPeriod: number;
  moveTo: string;
  selectedProduct: string;
  onClick: () => void;
};

const AccountDepositProduct: React.FC<AccountDepositProductProps> = ({
  name,
  interestRate,
  minimumAmount,
  minimumPeriod,
  moveTo,
  selectedProduct,
  onClick,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='mt-[20px] h-[148px] w-[360px] rounded-xl bg-[#FFD362] text-center'
      onClick={onClick}
    >
      <div className='m-6 flex justify-between'>
        <div className='mt-6 flex h-[104px] w-[104px] flex-col justify-center rounded-xl bg-[#FFAF2A] text-center text-2xl font-extrabold'>
          {name}
        </div>
        <div className='my-2 mt-8 flex flex-col justify-between font-extrabold'>
          {selectedProduct === '예금 상품' ? (
            <div>연 이자율</div>
          ) : (
            <div>이자율</div>
          )}
          <div>최소금액</div>
          <div>최소기간</div>
        </div>
        <div className='my-2 mt-8 flex flex-col justify-between'>
          <div>{interestRate}%</div>
          <div>{minimumAmount / 10000}만 원</div>
          <div>{minimumPeriod}개월</div>
        </div>
      </div>
      {/* <div className='mt-6 mb-[5px] font-bold'>
                <div className='text-[24px] text-[#5A6A59]'>t</div>
                <div className='mt-6 text-[18px]'>f</div>
            </div> */}
    </div>
  );
};

export default AccountDepositProduct;
