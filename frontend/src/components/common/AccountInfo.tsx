import React from 'react'
import Button from './buttons/Button';
import { useNavigate } from 'react-router';

type AccountInfoProps = {
    accountType: string;
    acconutNumber: string;
    amount: number;
    buttonName: string;
    moveTo: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ accountType, acconutNumber, amount, buttonName, moveTo }) => {
    const navigate = useNavigate();

    return(
        <div className='w-[320px] h-[128px] bg-[#FFAF2A] rounded-xl mt-[20px]'>
                <div className='mt-[10px] mb-[5px] ml-[20px] font-bold'>
                    <div className='flex justify-between mr-2'>
                        <div className='text-[24px] text-[#5A6A59]'>{ accountType }</div>
                        <Button
                            className='w-[90px] h-10'
                            label={buttonName}
                            color='green'
                            size='medium'
                            onClick={() => navigate(moveTo)}
                        />
                    </div>
                    <div className='mb-[6px]  text-[16px]'>{ acconutNumber }</div>
                    <div className='text-[28px]'>잔액 { amount }원</div>
                </div>
        </div>
    );
};

export default AccountInfo