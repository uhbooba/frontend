import React from 'react'
import { useNavigate } from 'react-router';

type AccountDepositProductProps = {
    name: string;
    interestRate: number ;
    minimumAmount: number;
    minimumPeriod: number;
    moveTo: string;
    selectedProduct: string;
};

const AccountDepositProduct: React.FC<AccountDepositProductProps> = ({ name, interestRate, minimumAmount, minimumPeriod, moveTo, selectedProduct }) => {
    const navigate = useNavigate();

    return(
        <div 
            className='w-[360px] h-[148px] bg-[#FFD362] rounded-xl mt-[20px] text-center'
            onClick={() => navigate(moveTo)}
            >
            <div className='flex m-6 justify-between '>
                <div className='flex flex-col mt-6 w-[104px] h-[104px] bg-[#FFAF2A] rounded-xl text-center text-2xl font-extrabold justify-center'>
                    {name}
                </div>
                <div className='flex flex-col mt-8 my-2 justify-between font-extrabold'>
                    {selectedProduct === '예금 상품' ? (
                        <div>연 이자율</div>
                    ) : (
                        <div>이자율</div>
                    )}
                    <div>최소금액</div>
                    <div>최소기간</div>
                </div>
                <div className='flex flex-col mt-8 my-2 justify-between'>
                    <div>{ interestRate }%</div>
                    <div>{ minimumAmount/10000 }만 원</div>
                    <div>{ minimumPeriod }개월</div>
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