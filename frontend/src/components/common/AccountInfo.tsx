import React from 'react';
import Button from './buttons/Button';
import { useNavigate } from 'react-router';

type AccountInfoProps = {
  accountType: string;
  acconutNumber: string;
  amount: number;
  buttonName: string;
  moveTo: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({
  accountType,
  acconutNumber,
  amount,
  buttonName,
  moveTo,
}) => {
  const navigate = useNavigate();

  return (
    <div className='mt-[20px] h-[170px] w-[320px] rounded-xl bg-[#FFAF2A]'>
      <div className='mb-[5px] ml-[20px] mt-[10px] font-bold'>
        <div className='mr-2 flex justify-between'>
          <div className='text-[24px] text-[#5A6A59]'>{accountType}</div>
        </div>
        <div className='mb-[6px] text-[16px]'>{acconutNumber}</div>
        <div className='text-[28px]'>잔액 {amount.toLocaleString()}원</div>
        <div className='mr-4 flex justify-center'>
          <Button
            label={buttonName}
            color='lightOrange'
            size='medium'
            onClick={() => navigate(moveTo)}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
