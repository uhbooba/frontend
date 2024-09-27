import React from 'react';
import { useNavigate } from 'react-router';

type AccountProductProps = {
  name: string;
  description: string;
  moveTo: string;
};

const AccountProduct: React.FC<AccountProductProps> = ({
  name,
  description,
  moveTo,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='mt-[20px] h-[128px] w-[320px] rounded-xl bg-[#FFAF2A] text-center'
      onClick={() => navigate(moveTo)}
    >
      <div className='mb-[5px] mt-6 font-bold'>
        <div className='text-[24px] text-[#5A6A59]'>{name}</div>
        <div className='mt-6 text-[18px]'>{description}</div>
      </div>
    </div>
  );
};

export default AccountProduct;
